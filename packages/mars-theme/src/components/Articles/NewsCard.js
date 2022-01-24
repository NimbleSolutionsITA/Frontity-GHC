import React from "react";
import {connect, decode} from "frontity";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core";
import StarsRoundedIcon from "@material-ui/icons/StarsRounded";
import {truncate} from "../../utils";

const NewsCard = ({article, state, actions, isFeatured}) => (
    <Card elevation={0}>
        <CardActionArea onClick={() => actions.router.set(article.link)}>
            <CardMedia
                image={state.source.attachment[article["featured_media"]] && state.source.attachment[article["featured_media"]]['media_details']['sizes']['full']['source_url']}
                style={{height: '300px'}}
            />
            <CardContent>
                <Typography variant="h4" style={{fontWeight: 'bold'}}>
                    {isFeatured && isFeatured(article) && <StarsRoundedIcon style={{marginBottom: '-4px', marginRight: '4px', fontSize: '22px', lineHeight: '22px'}} />}
                    {decode(article.title.rendered)}
                </Typography>
                <Typography style={{margin: '16px 0'}}>{truncate(decode(article.acf.excerpt), 150)}</Typography>
            </CardContent>
        </CardActionArea>
    </Card>
)

export default connect(NewsCard)