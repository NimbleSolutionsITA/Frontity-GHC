import React, {useState} from 'react'
import {connect, decode, Global} from "frontity"
import {
    makeStyles,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button
} from "@material-ui/core"

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import { Pagination, Navigation } from 'swiper';
import swiperCss from 'swiper/swiper.min.css'
import swiperPaginationCss from 'swiper/modules/pagination/pagination.min.css'
import swiperEffectFadeCss from 'swiper/modules/effect-fade/effect-fade.min.css'
import swiperAutoplayCss from 'swiper/modules/autoplay/autoplay.min.css'
import swiperNavigationCss from 'swiper/modules/navigation/navigation.min.css'
import swiperVirtualCss from 'swiper/modules/virtual/virtual.min.css'

import {truncate} from "../../utils";
import translations from "../../translations";
import PrenotaOra from "../PrenotaOra";
import Loading from "../loading";



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        borderRadius: '8px',
        position: 'relative',
        height: '270px',
        marginBottom: '40px'
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


const Slide = ({info, state, actions}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent classes={{root: classes.content}}>
                <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                    <Typography component="h4" variant="h4" style={{fontWeight: 'bold'}}>
                        {truncate(decode(info.title.rendered))}
                    </Typography>
                    <div style={{flexGrow: 1, padding: '8px 0 16px'}}>
                        {/*<Html2React html={info.acf.excerpt} />*/}
                        {truncate(decode(info.acf.excerpt), 80)}
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
    )
}

const ArticlesSliderView = ({ state, libraries, actions, categorySlug }) => {
    const [articles, setArticles] = useState(null)

    const category = state.source.data['all-categories/'].items.find(c => c.slug === categorySlug)

    async function fetchFeaturedNews() {
        const response = await libraries.source.api.get({
            endpoint: "posts",
            params: { _embed: true, categories: category.id, per_page: 100 },
        });
        const res = await libraries.source.populate({ response, state })

        return res.map(({id}) => state.source.post[id])
    }

    React.useEffect(() => {
        fetchFeaturedNews().then(featuredPosts => setArticles(featuredPosts))
    }, []);


    return (
        <div>
            <Global styles={swiperCss} />
            <Global styles={swiperPaginationCss} />
            <Global styles={swiperEffectFadeCss} />
            <Global styles={swiperAutoplayCss} />
            <Global styles={swiperNavigationCss} />
            <Global styles={swiperVirtualCss} />
            <Typography align="center" variant="h1" style={{fontWeight: 'bold', margin: '32px 0'}}>
                {category.name}
            </Typography>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={2}
                spaceBetween={30}
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
            >
                {articles ? articles.map((article, index) => (
                    <SwiperSlide key={article.id} virtualIndex={index}>
                        <Slide
                            info={article}
                            state={state}
                            actions={actions}
                        />
                    </SwiperSlide>
                )) : <Loading />}
            </Swiper>
        </div>
    )
}

export default connect(ArticlesSliderView)