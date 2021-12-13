export const pagesMap = [
    { //0
        it: ["Inizio", "/"],
        en: ["Start", "/en/start/"],
    },
    { //1
        it: ["Prestazioni (U.O.)", "/prestazioni/"],
        en: ["Services", "/en/services/"],
    },
    { //2
        it: ["Prestazioni con ricovero (U.O.)", "/prestazioni-con-ricovero/"],
        en: ["Hospitalisation", "/en/hospitalisation/"],
    },
    { //3
        it: ["Laboratorio analisi", "/laboratorio-analisi/"],
        en: ["Laboratorio analisi", "/en/laboratorio-analisi-en/"],
    },
    { //4
        it: ["Servizi diagnostici", "/services/diagnostica-per-immagini/"],
        en: ["Servizi diagnostici", "/en/services/image-diagnostics-service/"],
    },
    { //5
        it: ["News", "/tutte-le-notizie/"],
        en: ["News", "/en/all-the-news/"],
    },
    { //6
        it: ["Medici", "/i-nostri-medici/"],
        en: ["Doctors", "/en/our-doctors/"],
    },
    { //7
        it: ["Convenzioni", "/convenzioni/"],
        en: ["Insurance agreements", "/en/insurance-agreements/"],
    },
    { //8
        it: ["Informazioni utili", "/info-pratiche/"],
        en: ["Practical infos", "/en/practical-infos/"],
    },
    { //9
        it: ["Amministrazione trasparente", "/amministrazione-trasparente/"],
        en: ["Transparent administration", "/en/transparent-administration/"],
    },
    { //10
        it: ["Il Gruppo Garofalo Health Care", "/il-gruppo-garofalo-health-care/"],
        en: ["The Garofalo Health Care Group", "/en/the-garofalo-health-care-group/"],
    },
    { //11
        it: ["Privacy Policy & Cookies", "/privacy-policy-cookies/"],
        en: ["Privacy Policy & Cookies", "/en/privacy-policy-cookies-en/"],
    },
    { //12
        it: ["Presentazione", "/presentazione/"],
        en: ["About us", "/en/about-us/"],
    },
    { //13
        it: ["Struttura Organizzativa", "/struttura-organizzativa/"],
        en: ["Structure", "/en/structure/"],
    },
    { //14
        it: ["Lavora con noi", "/lavora-con-noi/"],
        en: ["Work with us", "/en/work-with-us/"],
    },
    { //15
        it: ["Mission Aziendale", "/la-mission/"],
        en: ["Mission", "/en/mission/"],
    },
    { //16
        it: ["Standard di Qualità", "/standard-di-qualita/"],
        en: ["Quality & Commitments", "/en/quality-commitments/"],
    },
    { //17
        it: ["Hesperia Carpi", "/hesperia-carpi/"],
        en: ["Hesperia Carpi", "/en/hesperia-carpi-en/"],
    },
    { //18
        it: ["Progetti di ricerca", "/progetti-di-ricerca/"],
        en: ["Research", "/en/research/"],
    },
    { //19
        it: ["Gestione Rischio infettivo", "/gestione-rischio-infettivo/"],
        en: ["CIO-HIC", "/en/cio-hic/"],
    },
    { //20
        it: ["Contatti", "/contatti-it/"],
        en: ["Contacts", "/en/contacts/"],
    },
    { //20
        it: ["Hesperia Bimbi", "/hesperia-bimbi/"],
        en: ["Hesperia Bimbi", "/en/hesperia-bimbi-en/"],
    },
]

export const mainMenu = (lang) => [
    [lang === 'it' ? "Chi Siamo" : "About Us", [
        pagesMap[15][lang],
        pagesMap[12][lang],
        pagesMap[13][lang],
    ]],
    pagesMap[1][lang],
    pagesMap[6][lang],
    pagesMap[8][lang],
    pagesMap[5][lang],
]

export const footerLinks = [
    [10, 12],
    [15, 16],
    [5, 11]
]

export const categories = (lang) => {
    switch (lang) {
        case 'en':
            return {
                7: "all-the-news",
                29: "featured",
                22: "news",
                39: "outpatient-services",
                37: "hospitalisation",
                70: "medical-surgical-and-thoracic-vascular-cardiology",
                80: "support-and-integrative-services"
            }
        case 'it':
            return {
                1: "tutte-le-notizie",
                27: "in-primo-piano",
                20: "novita",
                33: "prestazioni-ambulatoriali",
                35: "prestazioni-con-ricovero",
                68: "cardiologia-medico-chirurgica-e-toraco-vascolare",
                78: "servizi-di-supporto-ed-integrativi"
            }
        default:
            return {
                ...categories('it'),
                ...categories('en')
            }
    }
}

export const newsCategories = (lang) => {
    switch (lang) {
        case 'en':
            return [7, 29, 22]
        case 'it':
            return [1, 20, 27]
        default:
            return [
                ...newsCategories('it'),
                ...newsCategories('en')
            ]
    }
}

export const departments = (lang) => {
    switch (lang) {
        case 'en':
            return [
                [70, 'Riabilitazione di 1° & 2° Livello'],
                [76, 'Diagnostica per Immagini'],
                // [80, 'Support and integrative services']
            ]
        case 'it':
            return [
                [68, 'Riabilitazione di 1° & 2° Livello'],
                [74, 'Diagnostica per Immagini'],
                // [78, 'Servizi di supporto ed integrativi']
            ]
        default:
            return {
                ...departments('it'),
                ...departments('en')
            }
    }
}
