import React, {useState, useEffect, useRef} from "react";
import {css, Global} from "frontity";
import swiperCss from "swiper/swiper.min.css";
import swiperPaginationCss from "swiper/modules/pagination/pagination.min.css";
import swiperEffectFadeCss from "swiper/modules/effect-fade/effect-fade.min.css";
import swiperAutoplayCss from "swiper/modules/autoplay/autoplay.min.css";
import swiperNavigationCss from "swiper/modules/navigation/navigation.min.css";
import swiperVirtualCss from "swiper/modules/virtual/virtual.min.css";
import {Swiper} from "swiper/react/swiper-react";
import {Box, Button, useMediaQuery} from "@material-ui/core";
import translations from "../../translations";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const customStyles = css`
  .swiper-horizontal>.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {
    bottom: 20px;
}
`

const HorizontalSlider = ({children, xs=1, sm=2, md=3, lg=4, navigation, lang, ...props}) => {
    const [prevEl, setPrevEl] = useState(null)
    const [nextEl, setNextEl] = useState(null)
    const swiperRef = useRef(null)

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

    const navigationConfig = navigation ? { prevEl, nextEl } : false

    const scrollToTop = () => window.scrollTo({
        top: swiperRef.current.offsetTop - 100,
        left: 0,
        behavior: 'smooth'
    })


    return (
        <div ref={swiperRef}>
            <Global styles={swiperCss} />
            <Global styles={swiperPaginationCss} />
            <Global styles={swiperEffectFadeCss} />
            <Global styles={swiperAutoplayCss} />
            <Global styles={swiperNavigationCss} />
            <Global styles={swiperVirtualCss} />
            <Global styles={customStyles} />
            <Swiper
                style={{paddingBottom: '60px'}}
                slidesPerView={gridSize()}
                spaceBetween={30}
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
                navigation={navigationConfig}
                {...props}
            >
                {children}
                {navigation && (
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                        position="absolute"
                        bottom="5px"
                    >
                        <Button
                            onClick={scrollToTop}
                            variant="contained"
                            ref={(node) => setPrevEl(node)}
                            startIcon={<NavigateBeforeIcon />}
                        >
                            {translations(lang, 'prev')}
                        </Button>
                        <Button
                            onClick={scrollToTop}
                            variant="contained"
                            ref={(node) => setNextEl(node)}
                            endIcon={<NavigateNextIcon />}
                        >
                            {translations(lang, 'next')}
                        </Button>
                    </Box>
                )}
            </Swiper>
        </div>
    )
}

export default HorizontalSlider