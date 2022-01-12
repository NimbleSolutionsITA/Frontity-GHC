import Theme from "./components";
import { ServerStyleSheets } from '@material-ui/core/styles';
import { renderToString } from "react-dom/server";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import link from "@frontity/html2react/processors/link";
import { pagesMap } from "./config";
import menuHandler from "./handlers/menu-handler";
import categoriesHandler from "./handlers/categories-handler";
import tagsHandler from "./handlers/tags-handler";


const marsTheme = {
  name: "@frontity/mars-theme",
  roots: {
    /**
     * In Frontity, any package can add React components to the site.
     * We use roots for that, scoped to the `theme` namespace.
     */
    theme: Theme,
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      lang: 'it', // ({ state }) => state.router.link.split('/')[1] === 'en' ? 'en' : 'it',
      currentPage: ({ state }) => pagesMap.filter(page => page[state.theme.lang][1] === state.router.link)[0],
      autoPrefetch: "in-view",
      menus: {},
      // menu: ({ state }) => mainMenu(state.theme.lang),
      //openTuoTempo: false,
      //tuoTempoParams: '',
      featured: {
        showOnList: false,
        showOnPost: false,
      },
      options: {},
    },
  },

  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
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
        await actions.source.fetch(`/menu/main`)
        await actions.source.fetch(`/menu/footer`)

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
      toggleLanguage: ({ state, actions }) => {
        const otherPage = state.theme.currentPage ?
            state.theme.currentPage[state.theme.lang === 'it' ? 'en' : 'it'][1] :
            state.theme.lang === 'it' ? '/en/start' : '/';
        actions.router.set(otherPage)
      },
      toggleTuoTempo: ({state}) => params => {
        state.theme.tuoTempoParams = params
        state.theme.openTuoTempo = !state.theme.openTuoTempo
      }
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
      handlers: [menuHandler, categoriesHandler, tagsHandler],
    },
  },
};

export default marsTheme;
