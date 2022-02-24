import { config } from "dotenv";

// Launch dot-env.
config();

const {
  NAME,
  TITLE,
  DESCRIPTION,
  URL,
  LANGUAGES
} = process.env

const languageMap = {
  it: {
    id: 'it',
    shortName: 'ITA',
    name: 'italiano'
  },
  en: {
    id: 'en',
    shortName: 'ENG',
    name: 'english'
  }
}

let otherLanguages = LANGUAGES.split(',')
const mainLanguage = otherLanguages.shift()

let hostname = /^(?:\w+\:\/\/)?([^\/]+)([^\?]*)\??(.*)$/.exec(URL)[1].split('.')
const regexHostname = hostname.join('\\.')
console.log(regexHostname)
const packages = (lang) => [
  {
    "name": "@frontity/mars-theme",
    "state": {
      "theme": {
        "featured": {
          "showOnList": false,
          "showOnPost": false
        },
        "menus": {
          top: [],
          main: [],
          footer: [],
        },
        mainUrl: URL,
        languages: LANGUAGES.split(',').map(l => languageMap[l]),
        mainLanguage,
      }
    }
  },
  {
    "name": "@frontity/wp-source",
    "state": {
      "source": {
        // "url": URL,
        "api": URL+(lang === mainLanguage ? "" : ("/"+lang))+"/wp-json",
        "homepage": "/home",
        // "postsPage": '/news/',
        "subdirectory": lang === mainLanguage ? "" : lang,
        "params": {
          lang
        },
        "postTypes": [
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
          {
            type: "strutture",
            endpoint: "strutture",
            archive: "/strutture",
          },
        ]
      },
    }
  },
  "@frontity/tiny-router",
  "@frontity/html2react",
  "@frontity/yoast",
]

const settings = [
  {
    "name": `${NAME}-${mainLanguage}`,
    "state": {
      "frontity": {
        url: URL,
        "title": TITLE,
        "description": DESCRIPTION
      },
      "theme": {
        "lang": mainLanguage
      }
    },
    packages: packages(mainLanguage),
  },
  ...otherLanguages.map(lang => (
      {
        "name": `${NAME}-${lang}`,
        "match": [`(ghc\\.nimble\\-lab\\.com|localhost:3000)\\/${lang}`],
        "state": {
          "frontity": {
            url: URL+'/'+lang,
            "title": TITLE,
            "description": DESCRIPTION
          },
          "theme": {
            lang
          }
        },
        packages: packages(lang),
      }
  ))
];

export default settings;