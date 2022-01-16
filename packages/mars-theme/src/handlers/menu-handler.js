const menuHandler = {
    name: "menus",
    priority: 10,
    pattern: "menu/:slug",
    func: async ({ link, params, state, libraries }) => {
        console.log('menuHandler')
        const { slug } = params;

        // Fetch the menu data from the endpoint
        const response = await libraries.source.api.get({
            endpoint: `/menus/v1/menus/${slug}`,
            params: {
                lang: state.theme.lang
            }
        });

        // Parse the JSON to get the object
        const menuData = await response.json();

        // GET MENUS
        const getLinks = (itm) => itm.child_items ?
            itm.child_items.map(subItm => [subItm.title, getLinks(subItm)]) :
            `/${itm.slug}/`
        state.theme.menus[slug] = menuData.items.map(itm => [itm.title, getLinks(itm)])
    },
};

export default menuHandler;