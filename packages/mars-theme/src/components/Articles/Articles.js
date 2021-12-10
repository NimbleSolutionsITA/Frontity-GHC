import React from 'react';
import {Container} from "@material-ui/core";
import FeaturedSliderView from "./Featured";
import NewsList from "./News";
import AllTheNews from "./AllTheNews";

const Articles = () => {

    return (
        <Container>
            <FeaturedSliderView />
            <NewsList />
            <AllTheNews />
        </Container>
    )
}

export default Articles