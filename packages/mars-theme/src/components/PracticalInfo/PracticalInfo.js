import React, {useEffect, useState} from 'react'
import {
    Container,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails, makeStyles, useMediaQuery, Grid, TextField
} from "@material-ui/core";
import {connect} from "frontity";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {pagesMap} from "../../config";
import Loading from "../loading";
import PostHeader from "../PostHeader";
import translations from "../../translations";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '16px 0',
    },
    heading: {
        fontWeight: 'bold',
    },
    accordion: {
        margin: '16px 0',
        '&.Mui-expanded': {
            margin: '16px 0',
        }
    },
    accordionSummary: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        '&.Mui-expanded': {
            minHeight: 0,
        }
    },
    accordionSummaryContent: {
        '&.Mui-expanded': {
            margin: '12px 0',
        }
    }
}));

const PracticalInfo = ({state, libraries}) => {
    const classes = useStyles();
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))
    const data = state.source.get(pagesMap[8][state.theme.lang][1]);
    const post = state.source[data.type][data.id];
    const Html2React = libraries.html2react.Component;
    const isMainpage = state.router.link === pagesMap[8][state.theme.lang][1]
    const currentPage = () => {
        if (isMainpage)
            return false
        const currentData = state.source.get(state.router.link)
        return state.source[currentData.type][currentData.id]
    }
    const [practicalInfos, setPracticalInfos] = useState(null)
    const [searchWord, setSearchWord] = useState('')
    const [currentPracticalInfos, setCurrentPracticalInfos] = useState([])
    const [expanded, setExpanded] = React.useState(!isMainpage && currentPage().id);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleChangeWord = (event) => {
        setSearchWord(event.target.value)
        if (event.target.value.length > 0)
            setCurrentPracticalInfos(practicalInfos.filter(info => info.title.rendered.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1))
        else
            setCurrentPracticalInfos(practicalInfos)
    }

    useEffect(() => {
        async function fetchPracticalInfos() {
            const response = await libraries.source.api.get({ endpoint: "practical_info", params: {_embed: true, per_page: 50} })
            await libraries.source.populate({ response, state })

            return Object.values(state.source['practical_info']).filter(info => {
                if(state.theme.lang === 'en')
                    return info.link.startsWith('/en/')
                return !info.link.startsWith('/en/')
            })
        }
        fetchPracticalInfos().then(resInfos => {
            setPracticalInfos(resInfos)
            setCurrentPracticalInfos(resInfos)
        })
    }, [state.theme.lang]);

    return (
        <Container>
            <PostHeader
                featuredImage={state.source.attachment[post.featured_media]}
                isMobile={isMobile}
                postTitle={post.title.rendered}
                date={new Date(post.date)}
                accentColor={state.theme.options.slider.accentColor}
                lang={state.theme.lang}
            />
            <Html2React html={post.content.rendered}/>
            <Grid container justify="center" style={{marginTop: '16px'}}>
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <TextField
                        placeholder={translations(state.theme.lang, 'cercaUnaInformazione')}
                        type="search"
                        value={searchWord}
                        onChange={handleChangeWord}
                        variant="outlined"
                        fullWidth
                        style={{margin: '16px 0'}}
                    />
                </Grid>
            </Grid>
            <div style={{margin: '32px 0'}}>
                {currentPracticalInfos ? currentPracticalInfos.map(service => (
                    <Accordion key={service.id} square classes={{root: classes.accordion}} expanded={expanded === service.id} onChange={handleChange(service.id)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon color="secondary" />}
                            classes={{root: classes.accordionSummary, content: classes.accordionSummaryContent}}
                        >
                            <Typography variant="h4" className={classes.heading}>
                                <InfoOutlinedIcon style={{marginRight: '16px', marginBottom: '-6px'}} />
                                <Html2React html={service.title.rendered} />
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <Html2React html={service.content.rendered} />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                )) : <Loading />}
            </div>
        </Container>
    )
}

export default connect(PracticalInfo)