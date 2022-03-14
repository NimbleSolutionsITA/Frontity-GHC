import React, {useState, useEffect, useRef} from "react";
import {connect, css, decode, Global} from "frontity";
import Link from "../link";
import {Button} from "@material-ui/core";

const NewsBanner = ({state, libraries, limit = 5, categories}) => {
    const [allNews, setAllNews] = useState([{title: {rendered: ''}, link: ''}])
    const [index, setIndex] = useState(0)
    const animationRef = useRef(null);

    const updateIndex = (length) => setIndex(i => (i + 1) % length)

    useEffect(() => {
        let length
        async function fetchAllNews() {
            const response = await libraries.source.api.get({
                endpoint: "posts",
                params: { _embed: true, categories, per_page: limit },
            });
            const res = await libraries.source.populate({ response, state })
            return res.map(({id}) => state.source.post[id])
        }
        fetchAllNews().then(cNews => {
            setAllNews(cNews)
            length = cNews.length
        })

        if (animationRef && length && animationRef.current) {
            animationRef.current.addEventListener("animationiteration", () => updateIndex(length))
            return animationRef.current.removeEventListener("animationiteration", () => updateIndex(length))
        }
    }, []);

    return (
        <div id="breaking-news-container">
            <Global styles={bannerStyles} />
            {allNews.length && (
                <div ref={animationRef} className="breaking-news-headline fadein marquee">
                    <Button component={Link} link={allNews[index].link}>
                        {decode(allNews[index].title.rendered)}
                    </Button>
                </div>
            )}
        </div>
    )
}

const bannerStyles = css`
  #breaking-news-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
  }
  .breaking-news-headline {
    display: block;
    position: absolute;
  }
  
  .breaking-news-headline .MuiButton-root{
    font-size: 14px;
    font-weight: normal;
    padding: 8px 0;
  }

  .fadein {
    -webkit-animation-name: fadein;
    -moz-animation-name: fadein;
    -o-animation-name: fadein;
    animation-name: fadein;
  }

  @-webkit-keyframes fadein {
    from { margin-left: 1000px }
    to { }
  }
  @-moz-keyframes fadein {
    from { margin-left: 1000px }
    to { }
  }
  @keyframes fadein {
    from { margin-left: 1000px }
    to { }
  }

  @-webkit-keyframes marquee {
    0% { left: 0; }
    20% { left: 0; }
    100% { left: -100%; }
  }
  @-moz-keyframes marquee {
    0% { left: 0; }
    20% { left: 0; }
    100% { left: -100%; }
  }
  @keyframes marquee {
    0% { left: 0; }
    20% { left: 0; }
    100% { left: -100%; }
  }

  .marquee {
    animation: marquee 10s linear infinite;
    -webkit-animation: marquee 10s linear infinite;
    -moz-animation: marquee 10s linear infinite;
    
    animation-duration: 10s;
    -webkit-animation-duration: 10s;
    -moz-animation-duration: 10s;

    -moz-animation-delay: 0.5s;
    -webkit-animation-delay: 0.5s;
    animation-delay: 3s;
  }
`

export default connect(NewsBanner)