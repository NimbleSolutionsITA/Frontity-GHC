import React, { useEffect } from "react";
import { connect, styled, decode } from "frontity";
import List from "./list";
import {Container, makeStyles, Typography, useMediaQuery} from "@material-ui/core";
import translations from "../translations";
import Documents from "./DocsTable";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        position: 'relative',
        width: '100%',
        paddingBottom: '42.25%',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
    },
    textWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        fontWeight: 'bold',
        padding: '0 40px',
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
        '& h1': {
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
            }
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

const Post = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];
  // Get a human readable date.
  const date = new Date(post.date);
  const classes = useStyles({accentColor: state.theme.options.slider.accentColor})
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

    console.log(post, state.source.attachment)
  return data.isReady ? (
    <Container>

      {/* Look at the settings to see if we should include the featured image */}
      {post.featured_media !== 0 ? (
        // <FeaturedMedia id={post.featured_media} />
        <div style={{
            backgroundImage: `url(${state.source.attachment[post.featured_media].source_url})`,
            backgroundSize: 'cover',
            width: '100%',
            paddingBottom: '35%',
            position: 'relative'
        }}>
            {isMobile ? (
                <svg
                    height="100%"
                    width="100%"
                    className={classes.mask}
                >
                    <rect width="100%" height="100%" />
                </svg>
            ) : (
                <svg
                    height="100%"
                    viewBox="0 0 689.4 400"
                    className={classes.mask}
                >
                    <path d="M489.4,200c0-110.5,89.5-200,200-200H0v400h689.4C578.9,400,489.4,310.5,489.4,200z"/>
                </svg>
            )}
            <div className={classes.textWrapper}>
                <Typography variant="h1">{decode(post.title.rendered)}</Typography>
                {/* Only display author and date on posts */}
                {data.isPost && (
                    <Typography>
                        {date.toLocaleDateString()}
                    </Typography>
                )}
            </div>
        </div>
      ) : (
          <div style={{padding: '64px 0 16px'}}>
              <Typography style={{fontWeight: 'bold'}} variant="h1">{decode(post.title.rendered)}</Typography>

              {/* Only display author and date on posts */}
              {data.isPost && (
                  <div>
                      <DateWrapper>
                          {" "}
                          {translations(state.theme.lang, 'pubblicatoIl')} <b>{date.toLocaleDateString()}</b>
                      </DateWrapper>
                  </div>
              )}
          </div>
      )}

      {/* Render the content using the Html2React component so the HTML is processed
       by the processors we included in the libraries.html2react.processors array. */}
      <Content>
          <Html2React html={post.content.rendered} />
          {post.acf.linkedDocs?.length > 0 && <Documents documents={post.acf.linkedDocs}/>}
      </Content>
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
  color: rgba(12, 17, 43, 0.8);
  word-break: break-word;
  margin-bottom: 64px;
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

  a {
    color: rgb(31, 56, 197);
    text-decoration: underline;
  }

  /* Input fields styles */

  input[type="text"],
  input[type="email"],
  input[type="url"],
  input[type="tel"],
  input[type="number"],
  input[type="date"],
  textarea,
  select {
    display: block;
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline-color: transparent;
    transition: outline-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin: 8px 0 4px 0;

    &:focus {
      outline-color: #1f38c5;
    }
  }

  input[type="submit"] {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid #1f38c5;
    padding: 12px 36px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    color: #fff;
    background-color: #1f38c5;
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
