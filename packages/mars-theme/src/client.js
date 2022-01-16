import Theme from "./components";
import { pagesMap } from "./config";


export default {
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
      currentPage: ({ state }) => pagesMap.filter(page => page[state.theme.lang][1] === state.router.link)[0],
      isHomepage: ({ state }) => ['/', `/${state.theme.lang}/`].includes(state.router.link),
      autoPrefetch: "in-view",
      menus: {
        top: [],
        main: [],
        footer: [],
      },
      options: {},
      baseLink: ({state}) => state.theme.lang === state.theme.mainLanguage ? state.router.link : state.router.link.slice(3),
      urlPrefix: ({state}) => state.theme.lang === state.theme.mainLanguage ? '' : '/'+state.theme.lang
    },
  },

  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      toggleTuoTempo: ({state}) => params => {
        state.theme.tuoTempoParams = params
        state.theme.openTuoTempo = !state.theme.openTuoTempo
      }
    },
  },
};
