const struttureHandler = {
    name: "strutture",
    priority: 10,
    pattern: "strutture",
    func: async ({ state, libraries }) => {
        const response = await libraries.source.api.get({
            endpoint: "strutture",
            params: {per_page: 100, _embed: true,},
        });
        const pages = libraries.source.getTotalPages(response);
        const res = await libraries.source.populate({ response, state })
        const requests = [];
        for (let page = 2; page <= pages; page++) {
            requests.push(
                libraries.source.api.get({
                    endpoint: "strutture",
                    params: {
                        per_page: 100,
                        _embed: true,
                        page
                    }
                })
            );
        }

        const responses = await Promise.all(requests);

        await Promise.all(responses.map(response =>
            libraries.source.populate({ state, response })
        ));
    }
};

export default struttureHandler