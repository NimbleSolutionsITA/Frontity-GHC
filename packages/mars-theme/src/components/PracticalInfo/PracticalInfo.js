import React, {useEffect, useState} from 'react'
import {
    Container,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails, makeStyles
} from "@material-ui/core";
import {connect} from "frontity";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {pagesMap} from "../../config";
import Loading from "../loading";

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
    const [expanded, setExpanded] = React.useState(!isMainpage && currentPage().id);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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
        fetchPracticalInfos().then(resInfos => setPracticalInfos(resInfos))
    }, [state.theme.lang]);

    return (
        <Container>
            <Typography style={{fontWeight: 'bold', textAlign: 'center', margin: '64px 0 32px'}} variant="h1">{post.title.rendered}</Typography>
            <Html2React html={post.content.rendered}/>
            <div style={{margin: '32px 0'}}>
                {practicalInfos ? practicalInfos.map(service => (
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
                            <Html2React html={service.content.rendered} />
                        </AccordionDetails>
                    </Accordion>
                )) : <Loading />}
            </div>
        </Container>
    )
}

export default connect(PracticalInfo)