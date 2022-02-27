import React, {useState, useEffect, useRef} from 'react'
import {
    Card, CardActionArea, CardContent, CardMedia,
    Chip,
    Grid, makeStyles,
    Typography,
} from "@material-ui/core";
import {connect, decode} from "frontity";
import Loading from "../loading";
import ItalyMap from "./ItalyMap";
import {Navigation, Pagination} from "swiper";
import {SwiperSlide} from "swiper/react/swiper-react";
import HorizontalSlider from "../HorizontalSlider/HorizontalSlider";
import MarkerIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
import LinkIcon from '@material-ui/icons/Link';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
    cardOverlay: {
        width: '100%',
        height: '100%',
        // borderRadius: '0 100% 100% 0',
        backgroundColor: theme.palette.primary.main,
        opacity: '.75',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
        '& img': {
            padding: '20px',
            maxWidth: 'calc(100% - 40px)',
            maxHeight: 'calc(100% - 40px)'
        }
    },
    content: {
        textAlign: 'justify',
        [theme.breakpoints.up('lg')]: {
            paddingRight: '64px',
        },
        [theme.breakpoints.up('md')]: {
            paddingRight: '32px',
        }
    },

    row: {
        alignItems:'center',
        display: 'flex',
        marginBottom: '4px',
        '& > svg': {
            fontSize: '16px',
            marginRight: '10px'
        }
    }
}))

const StrutturaCard = connect(({regione, actions, state}) => {
    const classes = useStyles()
    const Row = ({Icon, value}) => <div className={classes.row}><Icon color="primary" /> {value}</div>
    return (
        <Card elevation={0}>
            <CardActionArea onClick={() => actions.router.set(regione.link)}>
                <CardMedia
                    image={state.source.attachment[regione["featured_media"]] && state.source.attachment[regione["featured_media"]]['media_details']['sizes']['full']['source_url']}
                    style={{height: '100px'}}
                >
                    <div className={classes.cardOverlay}>
                        <img src={regione.acf.logo?.url} alt={regione.acf.logo.filename} />
                    </div>
                </CardMedia>
                <CardContent>
                    <Typography variant="h4" style={{fontWeight: 'bold', marginBottom: '10px'}}>
                        {decode(regione.title.rendered)}
                    </Typography>
                    <div>
                        <Row
                            Icon={MarkerIcon}
                            value={regione.acf.indirizzo.street_name ?
                                `${regione.acf.indirizzo.street_name} ${regione.acf.indirizzo.street_number} - ${regione.acf.indirizzo.post_code} ${regione.acf.indirizzo.city} (${regione.acf.indirizzo.state_short})` :
                                regione.acf.indirizzo.address
                            }
                        />
                        <Row Icon={PhoneIcon} value={regione.acf.phone} />
                        <Row Icon={LinkIcon} value={regione.acf.website} />
                        <Row Icon={EmailIcon} value={regione.acf.email} />
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    )
})

const Strutture = ({ state, libraries }) => {
    const classes = useStyles()
    const Html2React = libraries.html2react.Component;
    const strutture = Object.keys(state.source.strutture).map(id => state.source.strutture[id])
    const getRegioni = () => {
        let regions = {}
        for (const r of strutture.map(st => st.acf.indirizzo.state)) {
            regions[r] = regions[r] ? regions[r] + 1 : 1;
        }
        return regions
    }
    const regioni = {'Tutte': strutture.length, ...getRegioni()}
    const [currentRegione, setCurrentRegione] = useState('Tutte')

    const scrollToTop = useRef(null)

    const handleChangeRegione = (regione) => {
        if (scrollToTop.current)
            scrollToTop.current()
        setCurrentRegione(regione)
    }

    return (
        <div>
            <Typography style={{fontWeight: 'bold', textAlign: 'center', margin: '32px 0'}} variant="h1">
                {state.theme.options.interactiveMap.struttureTitle}
            </Typography>
            {strutture ? (
                <Grid container spacing={5}>
                    <Grid item md={7} lg={8}>
                        <div className={classes.content}>
                            <Html2React html={state.theme.options.interactiveMap.struttureBodyTop} />
                            {Object.keys(regioni).map(reg => (
                                <Chip
                                    key={reg}
                                    label={`${reg} (${['Tutte', 'Liguria'].includes(reg) ? regioni[reg] + 10 : regioni[reg]})`}
                                    onClick={() => handleChangeRegione(reg)}
                                    style={{
                                        margin: '8px',
                                        backgroundColor: ['Tutte', reg].includes(currentRegione) ? 'rgba(31, 64, 125, 0.2)' : 'rgba(31, 64, 125, 0.05)'
                                    }}
                                />
                            ))}
                            <Html2React html={state.theme.options.interactiveMap.struttureBodyBottom} />
                        </div>
                    </Grid>
                    <Grid item md={5} lg={4}>
                        <ItalyMap regioni={regioni} currentRegione={currentRegione} setCurrentRegione={handleChangeRegione}/>
                    </Grid>
                    <Grid item xs={12}>
                        <HorizontalSlider scrollTo={scrollToTop} lang={state.theme.lang} modules={[Navigation, Pagination]}>
                            {strutture.filter(st => currentRegione === 'Tutte' || st.acf.indirizzo.state === currentRegione).map((regione, index) => (
                                <SwiperSlide key={regione.id} virtualIndex={index}>
                                    <StrutturaCard regione={regione} />
                                </SwiperSlide>
                            ))}
                        </HorizontalSlider>
                    </Grid>
                </Grid>
            ) : <Loading />}
        </div>
    )
}

export default connect(Strutture)