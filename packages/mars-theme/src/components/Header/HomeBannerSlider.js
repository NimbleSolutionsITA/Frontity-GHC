import {connect, Global} from "frontity";
import {makeStyles} from "@material-ui/core";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import { Virtual, Autoplay, EffectFade } from 'swiper';
import swiperCss from 'swiper/swiper.min.css'
import swiperPaginationCss from 'swiper/modules/pagination/pagination.min.css'
import swiperEffectFadeCss from 'swiper/modules/effect-fade/effect-fade.min.css'
import swiperAutoplayCss from 'swiper/modules/autoplay/autoplay.min.css'
import swiperNavigationCss from 'swiper/modules/navigation/navigation.min.css'
import swiperVirtualCss from 'swiper/modules/virtual/virtual.min.css'


const useStyles = makeStyles((theme) => ({
    slideWrapper: {
        width: '110%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        marginRight: '-2%',
        borderRadius: '180px 0 0 180px',
    },
}));

const HomeSlider = ({state}) => {
    const classes = useStyles({accentColor: state.theme.options.slider.accentColor})

    return (
        <div style={{height: '100%'}}>
            <Global styles={swiperCss} />
            <Global styles={swiperPaginationCss} />
            <Global styles={swiperEffectFadeCss} />
            <Global styles={swiperAutoplayCss} />
            <Global styles={swiperNavigationCss} />
            <Global styles={swiperVirtualCss} />
            <Swiper
                fadeEffect={{
                    crossFade: true
                }}
                virtualTranslate={true}
                speed={2000}
                effect="fade"
                virtual={true}
                modules={[EffectFade, Virtual, Autoplay]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                slidesPerView={1}
                style={{height: '100%', overflow: 'visible'}}
            >
                {state.theme.options.banner.photo.map((slide, index) => (
                    <SwiperSlide key={slide.id} virtualIndex={index}>
                        <div className={classes.slideWrapper} style={{ backgroundImage: `url(${slide.url})` }} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default connect(HomeSlider)