import {connect, Global} from "frontity";
import {Box, Container, makeStyles} from "@material-ui/core";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Virtual, Pagination, Autoplay, EffectFade, Navigation } from 'swiper';
import ReactPlayer from 'react-player';
import swiperCss from 'swiper/swiper.min.css';
import swiperPaginationCss from 'swiper/modules/pagination/pagination.min.css';
import swiperEffectFadeCss from 'swiper/modules/effect-fade/effect-fade.min.css';
import swiperAutoplayCss from 'swiper/modules/autoplay/autoplay.min.css';
import swiperNavigationCss from 'swiper/modules/navigation/navigation.min.css';
import swiperVirtualCss from 'swiper/modules/virtual/virtual.min.css';


const useStyles = makeStyles((theme) => ({
    slideWrapper: {
        position: 'relative',
        width: '100%',
        paddingBottom: '42.25%',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
    },
    textWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '40px',
        width: '45%',
        color: 'white',
        [theme.breakpoints.down('sm')]: {
            padding: '30px',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '20px',
        },
        '& h1': {
            fontSize: '32px',
            lineHeight: '40px',
            textTransform: 'uppercase',
            [theme.breakpoints.down('sm')]: {
                fontSize: '20px',
                lineHeight: '24px',
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: '12px',
                lineHeight: '16px',
            }
        },
        '& strong': {
            color: ({accentColor}) => accentColor || theme.palette.primary.main
        }
    },
    mask: {
        opacity: '.5',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'visible',
        enableBackground: 'new 0 0 689.4 400',
        fill: theme.palette.primary.main
    },
    logo: {
        width: '60%'
    },
    textHideMobile: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
}));

const VideoPlayer = ({url}) => (
    <div style={{position: 'absolute', width: '100%', height: '100%'}}>
        <ReactPlayer width="100%" height="100%" loop playing url={url} />
    </div>
)

const HomeSlider = ({state, libraries}) => {
    const Html2React = libraries.html2react.Component;
    const classes = useStyles({accentColor: state.theme.options.slider.accentColor})

    const getStyle = (slide) => slide.video ? { paddingBottom: (slide.video.height/slide.video.width)*100+'%' } : { backgroundImage: `url(${slide.slideImage.url})` }

    return (
        <Box bgcolor="rgb(225 238 254)">
            <Global styles={swiperCss} />
            <Global styles={swiperPaginationCss} />
            <Global styles={swiperEffectFadeCss} />
            <Global styles={swiperAutoplayCss} />
            <Global styles={swiperNavigationCss} />
            <Global styles={swiperVirtualCss} />
            <Container>
                <Swiper
                    fadeEffect={{
                        crossFade: true
                    }}
                    virtualTranslate={true}
                    speed={2000}
                    effect="fade"
                    virtual={true}
                    modules={[EffectFade, Pagination, Virtual, Autoplay, Navigation]}
                    pagination={{
                        dynamicBullets: true,
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={1}
                >
                    {state.theme.options.slider.slides.map((slide, index) => (
                        <SwiperSlide
                            key={slide.slideTitle}
                            virtualIndex={index}
                            onSlideChange={() => console.log('slide change')}
                        >
                            {({ isActive }) => (
                                <div className={classes.slideWrapper} style={getStyle(slide)}>
                                    {slide.video && isActive && <VideoPlayer url={slide.video.url}/>}
                                    <svg
                                        height="100%"
                                        className={classes.mask}
                                        {...(slide.video ? {width: '100%'} : {viewBox: '0 0 689.4 400'})}
                                    >
                                        {slide.video ?
                                            <rect width="100%" height="100%" /> :
                                            <path d="M489.4,200c0-110.5,89.5-200,200-200H0v400h689.4C578.9,400,489.4,310.5,489.4,200z"/>
                                        }

                                    </svg>
                                    <div className={classes.textWrapper}>
                                        {state.theme.options.slider.logo && <img className={classes.logo} src={state.theme.options.slider.logo.url} alt={state.theme.options.slider.logo.filename}/>}
                                        <Html2React html={slide.slideTitle} />
                                        <div className={classes.textHideMobile}>
                                            {slide.slideSubtitle}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </Box>
    )
}

export default connect(HomeSlider)