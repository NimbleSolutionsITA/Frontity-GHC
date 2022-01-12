import { config } from "dotenv";

// Launch dot-env.
config();

const settings = {
  name: process.env.NAME,
  state: {
    frontity: {
      url: process.env.URL,
      title: process.env.TITLE,
      description: process.env.DESCRIPTION
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
          url: process.env.URL,
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