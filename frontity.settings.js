const settings = {
  name: "HH",
  state: {
    frontity: {
      url: "https://hesperia.it",
      title: "Garofalo Health Care",
      description: "WordPress installation for Frontity development"
    }
  },
  packages: [
    {
      name: "@frontity/mars-theme",
      state: {
        theme: {
          featured: {
            showOnList: false,
            showOnPost: false
          }
        }
      }
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "https://hesperia.it",
          homepage: "/inizio",
          postTypes: [
            {
              type: "practical_info",
              endpoint: "practical_info",
              archive: "/practical_info",
            },
            {
              type: "doctors",
              endpoint: "doctors",
              archive: "/doctors",
            },
            {
              type: "services",
              endpoint: "services",
              archive: "/services",
            },
            {
              type: "documents",
              endpoint: "documents",
              archive: "/documents",
            },
          ]
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    "@frontity/yoast",
  ]
};

export default settings;