import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import List from "./list";
import {Container, Divider} from "@material-ui/core";
import Dialog from "./Widgets/Dialog";
import PostHeader from "./PostHeader";
import Documents from "./Widgets/Documents/DocsTable";
import Subsidiaries from "./Widgets/Subsidiaries";
import TradingViewGHC from "./Widgets/TradingView";
import Event from "./Widgets/Event";
import Staff from "./Widgets/Staff";
import NewsComponent from "./Widgets/NewsComponent";

const Post = ({ state, actions, libraries }) => {
    // Get information about the current URL.
    const data = state.source.get(state.router.link);
    // Get the data of the post.
    const post = state.source[data.type][data.id];
    // Get a human readable date.
    const date = new Date(post.date);
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
    max-width: 100%;
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
