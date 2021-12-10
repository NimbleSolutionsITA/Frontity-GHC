import React from 'react'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {pagesMap} from "../../config";
import PrestazioneContent from "./PrestazioneContent";

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

const PrestazioniTabs = ({type, services, expanded, setExpanded, Html2React}) => {
    const classes = useStyles();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            {services.map(service => (
                <Accordion key={service.id} square classes={{root: classes.accordion}} expanded={expanded === service.id} onChange={handleChange(service.id)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon color="secondary" />}
                        classes={{root: classes.accordionSummary, content: classes.accordionSummaryContent}}
                    >
                        <Typography variant="h4" className={classes.heading}><Html2React html={service.title.rendered} /></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <PrestazioneContent type={type} service={service} />
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}

export default PrestazioniTabs