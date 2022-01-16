import React from 'react';
import {Container} from "@material-ui/core";
import ArticlesSliderView from "./ArticlesSliderView";
import NewsVerticalList from "./NewsVerticalList";
import NewsGrid from "./NewsGrid";

const Articles = () => {

    return (
        <Container>
            <ArticlesSliderView categorySlug="featured" />
            <NewsVerticalList categorySlug="novita" />
            <NewsGrid categorySlug="news"/>
        </Container>
    )
}

export default Articles