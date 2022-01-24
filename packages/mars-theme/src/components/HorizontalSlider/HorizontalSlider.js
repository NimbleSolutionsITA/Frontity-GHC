import React from "react";
import {Global} from "frontity";
import swiperCss from "swiper/swiper.min.css";
import swiperPaginationCss from "swiper/modules/pagination/pagination.min.css";
import swiperEffectFadeCss from "swiper/modules/effect-fade/effect-fade.min.css";
import swiperAutoplayCss from "swiper/modules/autoplay/autoplay.min.css";
import swiperNavigationCss from "swiper/modules/navigation/navigation.min.css";
import swiperVirtualCss from "swiper/modules/virtual/virtual.min.css";
import {Swiper} from "swiper/react/swiper-react";
import {useMediaQuery} from "@material-ui/core";


const HorizontalSlider = ({children, xs=1, sm=2, md=3, lg=4, ...props}) => {
    const isXs = useMediaQuery(theme => theme.breakpoints.down('xs'))
    const isSm = useMediaQuery(theme => theme.breakpoints.down('sm'))
    const isMd = useMediaQuery(theme => theme.breakpoints.down('md'))

    const gridSize = () => {
        if (isXs)
            return xs
        else if (isSm)
            return sm
        else if (isMd)
            return md
        else return lg
    }
    return (
        <div>
            <Global styles={swiperCss} />
            <Global styles={swiperPaginationCss} />
            <Global styles={swiperEffectFadeCss} />
            <Global styles={swiperAutoplayCss} />
            <Global styles={swiperNavigationCss} />
            <Global styles={swiperVirtualCss} />
            <Swiper
                style={{paddingBottom: '32px'}}
                slidesPerView={gridSize()}
                spaceBetween={30}
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
                {...props}
            >
                {children}
            </Swiper>
        </div>
    )
}

export default HorizontalSlider