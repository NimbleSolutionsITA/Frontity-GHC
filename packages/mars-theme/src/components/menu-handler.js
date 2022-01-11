const menuHandler = {
    name: "menus",
    priority: 10,
    pattern: "/menu/:slug",
    func: async ({ link, params, state, libraries }) => {
        const { slug } = params;

        // Fetch the menu data from the endpoint
        const response = await libraries.source.api.get({
            endpoint: `/menus/v1/menus/${slug}`,
        });

        // Parse the JSON to get the object
        const menuData = await response.json();

        // Add the menu items to source.data
        const menu = state.source.data[link];
        Object.assign(menu, {
            items: menuData.items,
            isMenu: true,
        });

        // GET MENUS
        const getLinks = (itm) => itm.child_items ?
            itm.child_items.map(subItm => [subItm.title, getLinks(subItm)]) :
            `/${itm.slug}/`
        state.theme.menus[slug] = menu.items.map(itm => [itm.title, getLinks(itm)])
    },
};

export default menuHandler;