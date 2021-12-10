import React, {useState} from 'react'
import { connect } from "frontity"
import {useSwipeable} from "react-swipeable"
import {
    makeStyles,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Container,
    Hidden,
    CardActionArea
} from "@material-ui/core"
import ArrowIcon from "../icons/Arrow";
import Loading from "../loading";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        borderRadius: '8px',
        height: '100%',
        maxHeight: '170px',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        padding: '32px 16px 32px 40px'
    },
    cover: {
        width: '100%',
        height: '100%'
    },
    wrapper: {
        backgroundColor: theme.palette.primary.main,
        padding: '32px 0',
        touchAction: 'pan-y'
    }
}));

const PracticalInfoSliderView = ({ state, actions, libraries }) => {
    const classes = useStyles();
    const [currentSlide, setCurrentSlide] = useState(0)
    const [slideChunks, setSlideChunks] = useState(null)
    const chunkSize = 6;

    React.useEffect(() => {
        async function fetchPracticalInfos() {
            const response = await libraries.source.api.get({ endpoint: "practical_info", params: {_embed: true, per_page: 50} })
            await libraries.source.populate({ response, state })

            return Object.values(state.source['practical_info']).filter(info => {
                if(state.theme.lang === 'en')
                    return info.polylang_current_lang === "en_GB"
                return info.polylang_current_lang === "it_IT"
            })
        }
        fetchPracticalInfos().then(practicalInfos => setSlideChunks(practicalInfos.map((e, i) => i % chunkSize === 0 ?
            practicalInfos.slice(i, i + chunkSize) :
            null
        ).filter(el => el)))
    }, [state.theme.lang]);

    const Html2React = libraries.html2react.Component;

    function handlePrevClick() {
        return currentSlide === 0 ?
            setCurrentSlide(slideChunks.length - 1) :
            setCurrentSlide(currentSlide - 1)
    }
    function handleNextClick() {
        return currentSlide === slideChunks.length - 1 ?
            setCurrentSlide(0) :
            setCurrentSlide(currentSlide + 1)
    }

    const swipeHandlers = useSwipeable({
        onSwipedLeft: handlePrevClick,
        onSwipedRight: handleNextClick,
    });

    return (
        <div {...swipeHandlers} className={classes.wrapper}>
            {slideChunks ? (
                <Container style={{position: 'relative'}}>
                    <Typography color="secondary" align="center" variant="h1" style={{fontWeight: 'bold', marginBottom: '32px'}}>Informazioni pratiche</Typography>
                    <Grid container spacing={4}>
                        {slideChunks[currentSlide].map(info => (
                            <Grid key={info.id} item xs={12} sm={6} md={4}>
                                <Card className={classes.root}>
                                    <CardActionArea style={{display: 'flex'}} onClick={() => actions.router.set(info.link)}>
                                        <div className={classes.details}>
                                            <CardContent className={classes.content}>
                                                <Typography component="h4" variant="h4" style={{fontWeight: 'bold'}}>
                                                    {info.title.rendered}
                                                </Typography>
                                                <Html2React html={info.excerpt.rendered} />
                                            </CardContent>
                                        </div>
                                        <CardMedia
                                            className={classes.cover}
                                            image={state.source.attachment[info["featured_media"]]['media_details']['sizes']['thumbnail']['source_url']}
                                        />
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Hidden mdDown>
                        <div style={{position: 'absolute', top: '50%', left: '-20px'}}>
                            <IconButton disabled={currentSlide === 0} onClick={handlePrevClick}><ArrowIcon back /></IconButton>
                        </div>
                        <div style={{position: 'absolute', top: '50%', right: '-20px'}}>
                            <IconButton disabled={currentSlide === slideChunks.length - 1} onClick={handleNextClick}><ArrowIcon /></IconButton>
                        </div>
                    </Hidden>
                </Container>
            ) : <Loading />}
        </div>
    )
}

export default connect(PracticalInfoSliderView)