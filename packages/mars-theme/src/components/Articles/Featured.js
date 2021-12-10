import React, {useState} from 'react'
import { connect, decode } from "frontity"
import {useSwipeable} from "react-swipeable"
import {
    makeStyles,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Hidden,
    Button
} from "@material-ui/core"
import ArrowIcon from "../icons/Arrow";
import translations from "../../translations";
import PrenotaOra from "../PrenotaOra";
import Loading from "../loading";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        borderRadius: '8px',
        position: 'relative',
        height: '270px',
    },
    content: {
        width: '60%',
        padding: '32px 0 32px 40px'
    },
    cover: {
        width: '40%',
        clipPath: 'circle(60% at 70% 50%)',
        [theme.breakpoints.down('md')]: {

            clipPath: 'circle(60% at 80% 50%)',
        }
    },
    wrapper: {
        position: 'relative',
        padding: '32px 0',
        touchAction: 'pan-y'
    },
    actionButtons: {
        display: 'inline-block',
        '& button': {
            padding: '14px 24px',
            marginRight: '16px',
        },
        '&button:last-child': {
            marginRight: 0,
        }
    }
}));

const FeaturedSliderView = ({ state, libraries, actions }) => {
    const classes = useStyles();
    const [currentSlide, setCurrentSlide] = useState(0)
    const [slideChunks, setSlideChunks] = useState(null)

    const chunkSize = 2;

    React.useEffect(() => {
        async function fetchFeaturedNews() {
            const response = await libraries.source.api.get({
                endpoint: "posts",
                params: { _embed: true, categories: state.theme.lang === 'it' ? "27" : "29", per_page: 10 },
            });
            const res = await libraries.source.populate({ response, state })

            return res.map(({id}) => state.source.post[id])
        }
        fetchFeaturedNews().then(featuredPosts => {
            setSlideChunks(featuredPosts.map((e, i) => i % chunkSize === 0 ?
                featuredPosts.slice(i, i + chunkSize) :
                null
            ).filter(el => el))
        })
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

    return slideChunks && slideChunks.length > 0 ? (
        <div {...swipeHandlers} className={classes.wrapper}>
            <Typography align="center" variant="h1" style={{fontWeight: 'bold', marginBottom: '32px'}}>{translations(state.theme.lang, 'inPrimoPiano')}</Typography>
            <Grid container spacing={4}>
                {slideChunks[currentSlide].map(info => (
                    <Grid key={info.id} item xs={12} md={6}>
                        <Card className={classes.root}>
                            <CardContent classes={{root: classes.content}}>
                                <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                                    <Typography component="h4" variant="h4" style={{fontWeight: 'bold'}}>
                                        {decode(info.title.rendered)}
                                    </Typography>
                                    <div style={{flexGrow: 1, padding: '16px 0'}}>
                                        <Html2React html={info.acf.excerpt} />
                                    </div>
                                    <div className={classes.actionButtons}>
                                        <Button onClick={() => actions.router.set(info.link)} size="small" variant="contained">{translations(state.theme.lang, 'scopriDiPiu')}</Button>
                                        {info.acf.prenotaOra && <PrenotaOra size="small"/>}
                                    </div>
                                </div>
                            </CardContent>
                            <CardMedia
                                className={classes.cover}
                                image={state.source.attachment[info["featured_media"]]['media_details']['sizes']['full']['source_url']}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Hidden mdDown>
                <div style={{position: 'absolute', top: '50%', left: '-44px'}}>
                    <IconButton disabled={currentSlide === 0} onClick={handlePrevClick}><ArrowIcon color="#000000" back /></IconButton>
                </div>
                <div style={{position: 'absolute', top: '50%', right: '-44px'}}>
                    <IconButton disabled={currentSlide === slideChunks.length - 1} onClick={handleNextClick}><ArrowIcon color="#000000" /></IconButton>
                </div>
            </Hidden>
        </div>
    ) : <Loading />
}

export default connect(FeaturedSliderView)