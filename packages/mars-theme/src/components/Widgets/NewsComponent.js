import React from "react";
import ArticlesSliderView from "../Articles/ArticlesSliderView";
import NewsVerticalList from "../Articles/NewsVerticalList";
import NewsGrid from "../Articles/NewsGrid";
import {useMediaQuery} from "@material-ui/core";

const newsComponentMap = (categorySlug) => ({
    slider: <ArticlesSliderView categorySlug={categorySlug} />,
    verticalList: <NewsVerticalList categorySlug={categorySlug} />,
    horizontalList: <NewsGrid categorySlug={categorySlug} slideMode />,
    grid: <NewsGrid categorySlug={categorySlug} />,
    mixed: (
        <div>
            <ArticlesSliderView categorySlug={categorySlug} mixedMode />
            <NewsGrid categorySlug={categorySlug} mixedMode />
        </div>
    )
})

const NewsComponent = ({layout, categorySlug}) => {
    const isSm = useMediaQuery(theme => theme.breakpoints.down('sm'))
    const responsiveLayout = isSm && layout === 'mixed' ?
        'grid' :
        (isSm && layout ==='slider' ?
            'horizontalList' :
            layout
        )
    return newsComponentMap(categorySlug)[responsiveLayout]
}

export default NewsComponent