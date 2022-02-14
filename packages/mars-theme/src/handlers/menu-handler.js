const menuHandler = {
    name: "menus",
    priority: 10,
    pattern: "menu/:slug",
    func: async ({ link, params, state, libraries }) => {
        const { slug } = params;

        // Fetch the menu data from the endpoint
        const response = await libraries.source.api.get({
            endpoint: `/menus/v1/menus/${slug}`,
            params: {
                lang: state.theme.lang
            }
        });

        // Parse the JSON to get the object
        const {items} = await response.json();

        // GET MENUS
        const getLinks = (itm) => itm.child_items ?
            itm.child_items.map(subItm => [subItm.title, getLinks(subItm)]) :
            itm.url.replace(state.theme.mainUrl+state.theme.urlPrefix, '')

        state.theme.menus[slug] = items.map(itm => [itm.title, getLinks(itm)])
    },
};

export default menuHandler;