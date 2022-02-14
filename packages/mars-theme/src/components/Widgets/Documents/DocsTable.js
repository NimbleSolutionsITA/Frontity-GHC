import React, {useState, useEffect} from "react";
import {connect, decode} from "frontity";
import {Container, Box, Tabs, makeStyles, Tab} from "@material-ui/core";
import Filters from "./Filters";
import DocumentTable from "./DocumentTable";

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    tabsRoot: {
        justifyContent: 'center'
    },
    tabs: {
        flex: '0 1 auto'
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const Documents = ({ documentTypes, state, libraries, hideBody }) => {
    const [documents, setDocuments] = useState(null)
    const [contents, setContents] = useState(null)
    const [filteredDocuments, setFilteredDocuments] = useState({})
    const [value, setValue] = React.useState(documentTypes[0].post_name);
    const classes = useStyles();
    const Html2React = libraries.html2react.Component;

    const handleChange = (event, newValue) => setValue(newValue);;

    async function fetchDocs(id) {
        const response = await libraries.source.api.get({
            endpoint: "documents",
            params: {
                include: id,
                _embed: true,
            }
        })
        await libraries.source.populate({ response, state })
    }

    useEffect(() => {
        const queryDoc = new URLSearchParams(window.location.search).get('doc')
        if(queryDoc)
            setValue(queryDoc)
    }, [])

    useEffect(() => {
        for (let doc of documentTypes) {
            if(!documents || !documents[doc.ID])
                fetchDocs(doc.ID).then(() => {
                    const newDoc = {
                        [doc.ID]: state.source.documents[doc.ID].acf.documents.map(d => ({
                            ...d,
                            date: new Date(d.date)
                        })).sort((a, b) => b.date - a.date)
                    }
                    setDocuments(d => ({...d, ...newDoc}))
                    setFilteredDocuments(d => ({...d, ...newDoc}))
                    const newContent = {[doc.ID]: state.source.documents[doc.ID].content.rendered}
                    setContents(c => ({...c, ...newContent}))
                })
        }
        setValue(documentTypes[0].post_name)
    }, [state.router.link]);

    return documents && (
        <Container maxWidth="md" className={classes.root}>
            {documentTypes.length > 1 && (
                <Tabs
                    classes={{root: classes.tabsRoot, scroller: classes.tabs}}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {documentTypes.map((doc, index) => (
                        <Tab label={decode(doc.post_title)} value={doc.post_name} {...a11yProps(index)} />
                    ))}
                </Tabs>
            )}
            {documentTypes.map((doc) => (
                <TabPanel key={doc.ID} value={value} index={doc.post_name}>
                    {!hideBody && contents[doc.ID] && <Html2React html={contents[doc.ID]}/>}
                    {documents[doc.ID] && documents[doc.ID].length > 10 && (
                        <Filters
                            lang={state.theme.lang}
                            documents={documents}
                            setFilteredDocuments={setFilteredDocuments}
                            id={doc.ID}
                            routerLink={state.router.link}
                        />
                    )}
                    <DocumentTable
                        id={doc.ID}
                        documents={filteredDocuments[doc.ID] || []}
                        lang={state.theme.lang}
                    />
                </TabPanel>
            ))}
        </Container>
    )
}

export default connect(Documents)