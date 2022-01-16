import React, {useEffect, useState} from 'react';
import {connect, Global} from "frontity";
import Loading from "../loading";
import swiperCss from "swiper/swiper.min.css";
import swiperPaginationCss from "swiper/modules/pagination/pagination.min.css";
import swiperEffectFadeCss from "swiper/modules/effect-fade/effect-fade.min.css";
import swiperAutoplayCss from "swiper/modules/autoplay/autoplay.min.css";
import swiperNavigationCss from "swiper/modules/navigation/navigation.min.css";
import swiperVirtualCss from "swiper/modules/virtual/virtual.min.css";
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import {Navigation, Pagination} from "swiper";
import NewsCard from "./NewsCard";
import {Typography, useMediaQuery} from "@material-ui/core";


const NewsHorizontalList = ({
                      state,
                      libraries,
                      categorySlug,
                  }) => {
    const [allNews, setAllNews] = useState(null)
    const category = state.source.data['all-categories/'].items.find(c => c.slug === categorySlug)
    const featured = state.source.data['all-categories/'].items.find(c => c.slug === 'featured')
    const isFeatured = (post) => post.categories.includes(featured.id)
    const isXs = useMediaQuery(theme => theme.breakpoints.down('xs'))
    const isSm = useMediaQuery(theme => theme.breakpoints.down('sm'))
    const isMd = useMediaQuery(theme => theme.breakpoints.down('md'))

    const gridSize = () => {
        if (isXs)
            return 1
        else if (isSm)
            return 2
        else if (isMd)
            return 3
        else return 4
    }

    useEffect(() => {
        async function fetchAllNews() {
            const response = await libraries.source.api.get({
                endpoint: "posts",
                params: { _embed: true, categories: category.id, per_page: 20 },
            });
            const res = await libraries.source.populate({ response, state })
            return res.map(({id}) => state.source.post[id])
        }
        fetchAllNews().then(cNews => setAllNews(cNews))
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
                slidesPerView={gridSize()}
                spaceBetween={30}
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
            >
                {allNews ? allNews.map((article, index) => (
                    <SwiperSlide key={article.id} virtualIndex={index}>
                        <NewsCard article={article} isFeatured={isFeatured}/>
                    </SwiperSlide>
                )) : <Loading />}
            </Swiper>
        </div>
    )
}

export default connect(NewsHorizontalList)