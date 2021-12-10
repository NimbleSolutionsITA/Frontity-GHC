import Theme from "./components";
import { ServerStyleSheets } from '@material-ui/core/styles';
import { renderToString } from "react-dom/server";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import link from "@frontity/html2react/processors/link";
import { mainMenu, pagesMap, categories } from "./config";

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
      lang: ({ state }) => state.router.link.split('/')[1] === 'en' ? 'en' : 'it',
      currentPage: ({ state }) => pagesMap.filter(page => page[state.theme.lang][1] === state.router.link)[0],
      autoPrefetch: "in-view",
      menu: ({ state }) => mainMenu(state.theme.lang),
      //openTuoTempo: false,
      //tuoTempoParams: '',
      featured: {
        showOnList: false,
        showOnPost: false,
      },
    },
  },

  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      beforeSSR: async ({ actions, state, libraries }) => {
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
  },
};

export default marsTheme;
