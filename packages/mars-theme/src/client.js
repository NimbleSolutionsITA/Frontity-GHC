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
};
