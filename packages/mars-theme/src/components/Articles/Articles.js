import React from 'react';
import {Container} from "@material-ui/core";
import ArticlesSliderView from "./ArticlesSliderView";
import NewsVerticalList from "./NewsVerticalList";
import NewsGrid from "./NewsGrid";

const Articles = () => {

    return (
        <Container>
            <ArticlesSliderView showTitle categorySlug="featured" />
            <NewsVerticalList showTitle categorySlug="novita" />
            <NewsGrid showTitle categorySlug="news"/>
        </Container>
    )
}

export default Articles