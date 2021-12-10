import React, {useState} from 'react'
import { connect, decode } from "frontity"
import Loading from "../loading";
import {
    makeStyles,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
} from "@material-ui/core"
import PrenotaOra from "../PrenotaOra";
import translations from "../../translations";

const useStyles = makeStyles( {
    root: {
        display: 'flex',
        borderRadius: '8px',
        height: '100%',
        position: 'relative'
    },
    content: {
        padding: '32px 20px 32px 40px',
        flexGrow: 1,
    },
    cover: {
        width: '40%',
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
});

const NewsList = ({ state, libraries, actions, size = 3 }) => {
    const classes = useStyles();
    const [slideChunks, setSlideChunks] = useState(null)

    const chunkSize = size;

    React.useEffect(() => {
        async function fetchFeaturedNews() {
            const response = await libraries.source.api.get({
                endpoint: "posts",
                params: { _embed: true, categories: state.theme.lang === 'it' ? "20" : "22", per_page: 20 },
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

    return (
        <div className={classes.wrapper}>
            <Typography align="center" variant="h1" style={{fontWeight: 'bold', marginBottom: '32px'}}>{translations(state.theme.lang, 'novita')}</Typography>
            <Grid container spacing={4}>
                {slideChunks && slideChunks.length > 0 ? slideChunks[0].map((info, index) => (
                    <Grid key={info.id} item xs={12}>
                        <Card className={classes.root} style={{backgroundColor: index % 2 !== 0 && '#F6F9FC', flexDirection: index % 2 !== 0 && 'row-reverse'}}>
                            <CardContent classes={{root: classes.content}}>
                                <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                                    <Typography component="h4" variant="h4" style={{fontWeight: 'bold'}}>
                                        {decode(info.title.rendered)}
                                    </Typography>
                                    <div style={{flexGrow: 1, marginBottom: '16px'}}>
                                        <Html2React html={info.acf.excerpt} />
                                    </div>
                                    <div className={classes.actionButtons}>
                                        <Button size="small" variant="contained" onClick={() => actions.router.set(info.link)}>{translations(state.theme.lang, 'scopriDiPiu')}</Button>
                                        {info.acf.prenotaOra && <PrenotaOra size="small" />}
                                    </div>
                                </div>
                            </CardContent>
                            {state.source.attachment[info["featured_media"]] && (
                                <CardMedia
                                    className={classes.cover}
                                    image={state.source.attachment[info["featured_media"]]['media_details']['sizes']['full']['source_url']}
                                />
                            )}
                        </Card>
                    </Grid>
                )) : <Loading />}
            </Grid>
        </div>
    )
}

export default connect(NewsList)