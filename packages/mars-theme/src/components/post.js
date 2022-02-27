import React, { useEffect } from "react";
import { connect, styled, decode } from "frontity";
import List from "./list";
import {Container, Divider, makeStyles, Typography, useMediaQuery, useTheme} from "@material-ui/core";
import Dialog from "./Widgets/Dialog";
import translations from "../translations";
import Documents from "./Widgets/Documents/DocsTable";
import Subsidiaries from "./Widgets/Subsidiaries";
import TradingViewGHC from "./Widgets/TradingView";
import Event from "./Widgets/Event";
import Staff from "./Widgets/Staff";
import NewsComponent from "./Widgets/NewsComponent";

const useStyles = makeStyles((theme) => ({
    textWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        fontWeight: 'bold',
        padding: '0 2%',
        width: '39%',
        color: 'white',
        textTransform: 'uppercase',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
        },
        '& strong': {
            color: ({accentColor}) => accentColor || theme.palette.primary.main
        },
        '& p': {
            color: ({accentColor}) => accentColor || theme.palette.primary.main,
            fontWeight: 'bold',
            fontSize: '16px',
            fontStyle: 'italic',
            textTransform: 'none',
            [theme.breakpoints.down('sm')]: {
                fontSize: '12px',
            }
        }
    },
    h1: {
        fontWeight: 'bold',
        fontSize: '40px',
        lineHeight: '50px',
        [theme.breakpoints.down('md')]: {
            fontSize: '30px',
            lineHeight: '38px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '24px',
            lineHeight: '30px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '18px',
            lineHeight: '22px',
        }
    },
    h1Long: {
        fontWeight: 'bold',
        fontSize: '30px',
        lineHeight: '35px',
        [theme.breakpoints.down('md')]: {
            fontSize: '20px',
            lineHeight: '25px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '24px',
            lineHeight: '30px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '14px',
            lineHeight: '18px',
        }
    },
    mask: {
        opacity: '.5',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'visible',
        enableBackground: 'new 0 0 689.4 400',
        fill: theme.palette.primary.main
    },
}));

const ImageHeader = ({featuredImage, isPost, postTitle, isMobile, date, accentColor}) => {
    const classes = useStyles({accentColor})
    const {width, height} = featuredImage['media_details']
    const isPortrait = height > (width * .75)
    const maskProps = isMobile ? { width: '100%' } : { viewBox: '0 0 689.4 400'}
    const theme = useTheme()
    const textWidth = isPortrait ? {width: `${96 - ((width / height) * 35)}%`} : {}
    return (
        <div style={{
            backgroundImage: `url(${featuredImage.source_url})`,
            backgroundSize: isPortrait ? 'contain' : 'cover',
            width: '100%',
            paddingBottom: '35%',
            position: 'relative',
            backgroundPosition: isPortrait ? 'right' : 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: isPortrait && theme.palette.primary.main
        }}>
            {!isPortrait && (
                <svg
                    height="100%"
                    className={classes.mask}
                    {...maskProps}
                >
                    {isMobile ?
                        <rect width="100%" height="100%" /> :
                        <path d="M489.4,200c0-110.5,89.5-200,200-200H0v400h689.4C578.9,400,489.4,310.5,489.4,200z" />
                    }
                </svg>
            )}
            <div style={textWidth} className={classes.textWrapper}>
                <Typography classes={{root: classes[decode(postTitle).length > 150 ? 'h1Long' : 'h1']}} variant="h1">{decode(postTitle)}</Typography>
                {/* Only display author and date on posts */}
                {isPost && (
                    <Typography>
                        {date.toLocaleDateString()}
                    </Typography>
                )}
            </div>
        </div>
    )
}

const PostHeader = ({accentColor, featuredImage, isMobile, isPost, date, postTitle, lang}) => featuredImage ? (
    <ImageHeader
        featuredImage={featuredImage}
        isMobile={isMobile}
        isPost={isPost}
        postTitle={postTitle}
        date={date}
        accentColor={accentColor}
    />
) : (
    <div style={{padding: '64px 0 16px'}}>
        <Typography style={{fontWeight: 'bold'}} variant="h1">{decode(postTitle)}</Typography>

        {/* Only display author and date on posts */}
        {isPost && (
            <div>
                <DateWrapper>
                    {" "}
                    {translations(lang, 'pubblicatoIl')} <b>{date.toLocaleDateString()}</b>
                </DateWrapper>
            </div>
        )}
    </div>
)

const Post = ({ state, actions, libraries }) => {
    // Get information about the current URL.
    const data = state.source.get(state.router.link);
    // Get the data of the post.
    const post = state.source[data.type][data.id];
    // Get a human readable date.
    const date = new Date(post.date);
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))
    // Get the html2react component.
    const Html2React = libraries.html2react.Component;

    /**
     * Once the post has loaded in the DOM, prefetch both the
     * home posts and the list component so if the user visits
     * the home page, everything is ready and it loads instantly.
     */
    useEffect(() => {
        actions.source.fetch("/");
        List.preload();
    }, []);

    // Load the post, but only if the data is ready.

    return data.isReady ? (
        <Container>

            {/* Look at the settings to see if we should include the featured image */}
            <PostHeader
                featuredImage={state.source.attachment[post.featured_media]}
                isMobile={isMobile}
                isPost={data.isPost}
                postTitle={post.title.rendered}
                date={date}
                accentColor={state.theme.options.slider.accentColor}
                lang={state.theme.lang}
            />

            {/* Render the content using the Html2React component so the HTML is processed
       by the processors we included in the libraries.html2react.processors array. */}
            <Content>
                <Html2React html={post.content.rendered} />
            </Content>
            {post.acf.newsCategory && <NewsComponent layout={post.acf.newsLayout} categorySlug={post.acf.newsCategory.slug} />}
            {post.acf.subsidiaries?.length > 0 && <Subsidiaries subsidiaries={post.acf.subsidiaries}/>}
            {post.acf.staff?.length > 0 && <Staff staff={post.acf.staff} bottomText={post.acf.bottomText && <Html2React html={post.acf.bottomText} />}/>}
            {state.theme.options.tradingViewRelationsPages?.find(id => id === data.id) && <TradingViewGHC />}
            {post.acf.eventi?.length > 0 && <Event lang={state.theme.lang} events={post.acf.eventi} />}
            {post.acf.linkedDocs?.length > 0 && <Documents documentTypes={post.acf.linkedDocs} hideBody={post.acf.hideBody}/>}
            {post.acf.ipoPopup && <Dialog message={post.acf.ipoPopup} />}
            {state.theme.options.footerInvestorRelationsPages?.find(pg => pg.ID === data.id) && (
                <>
                    <Divider />
                    <Html2React html={state.theme.options.footerInvestorRelations} />
                </>
            )}
        </Container>
    ) : null;
};

export default connect(Post);

const DateWrapper = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

/**
 * This component is the parent of the `content.rendered` HTML. We can use nested
 * selectors to style that HTML.
 */
const Content = styled.div`
  word-break: break-word;
  margin: 32px 0;
  * {
    max-width: 100%;
  }

  p {
    line-height: 1.6em;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  figure {
    margin: 24px auto;
    /* next line overrides an inline style of the figure element. */
    width: 100% !important;

    figcaption {
      font-size: 0.7em;
    }
  }

  iframe {
    display: block;
    margin: auto;
  }

  blockquote {
    margin: 16px 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgba(12, 17, 43);
    padding: 4px 16px;
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
`;
