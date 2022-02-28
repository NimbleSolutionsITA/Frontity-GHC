import React, {useEffect, useState} from 'react';
import {connect, decode} from "frontity";
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
// import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import Loading from "../loading";
import {truncate} from "../../utils";
import {Navigation, Pagination} from "swiper";
import {SwiperSlide} from "swiper/react/swiper-react";
import NewsCard from "./NewsCard";
import HorizontalSlider from "../HorizontalSlider/HorizontalSlider";

const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );

const GridSlide = connect(({chunk, actions, state, libraries}) => {
    console.log(chunk)
    const Html2React = libraries.html2react.Component;
    return (
        <Grid container spacing={4}>
            {chunk.map(article => (
                <Grid key={article.id} item xs={12} sm={6} md={4} lg={3}>
                    <Card elevation={0}>
                        <CardActionArea onClick={() => actions.router.set(article.link)}>
                            <CardMedia
                                image={state.source.attachment[article["featured_media"]] && state.source.attachment[article["featured_media"]]['media_details']['sizes']['full']['source_url']}
                                style={{height: '300px'}}
                            />
                            <CardContent>
                                <Typography variant="h4" style={{fontWeight: 'bold'}}>
                                    {/*isFeatured(article) && <StarsRoundedIcon style={{marginBottom: '-4px', marginRight: '4px', fontSize: '22px', lineHeight: '22px'}} />*/}
                                    <Html2React html={article.title.rendered} />
                                </Typography>
                                <Typography style={{margin: '16px 0'}}>{truncate(decode(article.acf.excerpt), 150)}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
})

const NewsGrid = ({
    state,
    libraries,
    categorySlug,
    slideMode,
    mixedMode,
    showTitle,
    gridSize = 8
}) => {
    const [allNews, setAllNews] = useState(null)
    const category = state.source.data['all-categories/'].items.find(c => c.slug === categorySlug)
    // const featured = state.source.data['all-categories/'].items.find(c => c.slug === 'featured')
    // const isFeatured = (post) => post.categories.includes(featured.id)

    useEffect(() => {
        async function fetchAllNews() {
            const response = await libraries.source.api.get({
                endpoint: "posts",
                params: { _embed: true, categories: category.id, per_page: 20 },
            });
            const res = await libraries.source.populate({ response, state })
            return res.map(({id}) => state.source.post[id])
        }
        fetchAllNews().then(cNews => setAllNews(mixedMode ? cNews.slice(2) : cNews))
    }, []);

    const sliderProps = slideMode ? {} : {xs: 1, sm: 1, md: 1, lg: 1}

    return (
        <div style={{padding: '32px 0'}}>
            {showTitle && (
                <Typography align="center" variant="h1" style={{fontWeight: 'bold', marginTop: '32px', marginBottom: '32px'}}>{category.name}</Typography>
            )}

            {allNews && allNews.length > 0 ? (
                <HorizontalSlider lang={state.theme.lang} modules={[Navigation, Pagination]} navigation={!slideMode && allNews.length > gridSize} {...sliderProps} autoHeight={true}>
                    {slideMode ? allNews.map((article, index) => (
                        <SwiperSlide key={article.id} virtualIndex={index}>
                            <NewsCard article={article} /*isFeatured={isFeatured}*/ />
                        </SwiperSlide>
                    )) : chunk(allNews, gridSize).map((chunk, index) => (
                        <SwiperSlide key={chunk[0].id} virtualIndex={index}>
                            <GridSlide chunk={chunk} />
                        </SwiperSlide>
                    ))}
                </HorizontalSlider>
            ) : <Loading />}

        </div>
    )
}

export default connect(NewsGrid)