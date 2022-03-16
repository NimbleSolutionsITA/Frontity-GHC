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
        '& h1': {
            fontSize: '32px',
            lineHeight: '40px',
            textTransform: 'uppercase',
        },
        '& strong': {
            color: ({accentColor}) => accentColor || theme.palette.primary.main
        }
    },
    textWrapperFull: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        color: 'white',
        paddingTop: '40px',
        paddingBottom: '40px',
        '& h1': {
            fontSize: '50px',
            lineHeight: '58px',
            textTransform: 'uppercase',
        },
        '& strong': {
            color: ({accentColor}) => accentColor || theme.palette.primary.main
        },
        '& > div': {
            fontSize: '24px',
            lineHeight: '28px'
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
    maskWhite: {
        fill: 'rgb(255 255 255 / 50%)'
    },
    logo: {
        width: 'auto',
        height: '120px'
    },
    textHideMobile: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
}));

const VideoPlayer = (props) => (
    <div style={{position: 'absolute', width: '100%', height: '100%'}}>
        <ReactPlayer width="100%" height="100%" loop muted playing {...props} />
    </div>
)

const HomeSlider = ({state, libraries}) => {
    const Html2React = libraries.html2react.Component;
    const classes = useStyles({accentColor: state.theme.options.slider.accentColor})

    const getStyle = (slide) => slide.video ? { paddingBottom: (slide.video.height/slide.video.width)*100+'%' } : { backgroundImage: `url(${slide.slideImage.url})` }

    const Wrapper = ({children}) => state.theme.options.slider.fullWidth ? <div>{children}</div> : <Container>{children}</Container>
    const Inner = ({children}) => (
        <div className={classes[state.theme.options.slider.fullWidth ? 'textWrapperFull' : 'textWrapper']}>
            {state.theme.options.slider.fullWidth ?
                <Container>{children}</Container> :
                children
            }
        </div>
    )

    return (
        <Box bgcolor="rgb(225 238 254)">
            <Global styles={swiperCss} />
            <Global styles={swiperPaginationCss} />
            <Global styles={swiperEffectFadeCss} />
            <Global styles={swiperAutoplayCss} />
            <Global styles={swiperNavigationCss} />
            <Global styles={swiperVirtualCss} />
            <Wrapper>
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
                        >
                            <div className={classes.slideWrapper} style={getStyle(slide)}>
                                {slide.video && <VideoPlayer url={slide.video.url} />}
                                <svg
                                    height="100%"
                                    className={`${classes.mask} ${slide.video ? classes.maskWhite : ''}`}
                                    {...(slide.video ? {width: '100%', fill: 'white'} : {viewBox: '0 0 689.4 400'})}
                                >
                                    <defs>
                                        <radialGradient id="RadialGradient" cx="0.1" cy="0.1" r="0.5">
                                            <stop offset="0%" stopColor="wheat"/>
                                            <stop offset="100%" stopColor="#004a8f33"/>
                                        </radialGradient>
                                    </defs>
                                    {slide.video ?
                                        <rect width="100%" height="100%" fill="url(#RadialGradient)"/> :
                                        <path d="M489.4,200c0-110.5,89.5-200,200-200H0v400h689.4C578.9,400,489.4,310.5,489.4,200z"/>
                                    }

                                </svg>
                                <Inner>
                                    {state.theme.options.slider.logo && <img className={classes.logo} src={state.theme.options.slider.logo.url} alt={state.theme.options.slider.logo.filename}/>}
                                    <Html2React html={slide.slideTitle} />
                                    <div className={classes.textHideMobile}>
                                        {slide.slideSubtitle}
                                    </div>
                                </Inner>
                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </Wrapper>
        </Box>
    )
}

export default connect(HomeSlider)