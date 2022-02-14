import { config } from "dotenv";
import { ServerStyleSheets } from '@material-ui/core/styles';
import { renderToString } from "react-dom/server";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import link from "@frontity/html2react/processors/link";
import packageClient from "./client";
import menuHandler from "./handlers/menu-handler";
import categoriesHandler from "./handlers/categories-handler";
import tagsHandler from "./handlers/tags-handler";
import struttureHandler from "./handlers/strutture-handler";

// Launch dotenv.
config();

export default {
  ...packageClient,
  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      ...packageClient.actions.theme,
      beforeSSR: async ({ actions, state, libraries }) => {
        // GET OPTIONS FROM ACF PRO
        const optionResponse = await libraries.source.api.get({
          endpoint: `/acf/v3/options/options`
        });
        const options = await optionResponse.json();

        state.theme.options = options.acf

        // GET CATEGORIES & TAGS
        await actions.source.fetch("all-categories");
        await actions.source.fetch("all-tags");

        // GET MENUS
        await actions.source.fetch(`menu/top`)
        await actions.source.fetch(`menu/main`)
        await actions.source.fetch(`menu/footer`)


        await actions.source.fetch(`strutture`)

        libraries.frontity.render = ({ App }) => {
          const sheets = new ServerStyleSheets();

          const html = renderToString(sheets.collect(<App />));

          // Return the `html` and the `css` collected.
          return {
            html,
            css: sheets.toString()
          };
        };

        const template = libraries.frontity.template;
        libraries.frontity.template = ({ head, result, ...rest }) => {
          const { html, css } = result;

          // Push the `css` in the head tags
          head.push(`<style id="jss-server-side">${css}</style>`);

          return template({
            ...rest,
            head,
            html
          });
        };
      },
    },
  },
  libraries: {
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * and internal link inside the content HTML.
       * You can add your own processors too.
       */
      processors: [image, iframe, link],
    },
    source: {
      handlers: [menuHandler, categoriesHandler, tagsHandler, struttureHandler],
    },
  },
};
