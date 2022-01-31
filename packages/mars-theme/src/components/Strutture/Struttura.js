import React, {useEffect, useState} from "react";
import { connect, styled, decode } from "frontity";
import GoogleMapReact from 'google-map-react';
import List from "../list";
import {Button, Container, makeStyles, Typography, useMediaQuery} from "@material-ui/core";
import MarkerIcon from "@material-ui/icons/Room";
import PhoneIcon from "@material-ui/icons/Phone";
import LinkIcon from "@material-ui/icons/Link";
import EmailIcon from "@material-ui/icons/Email";

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
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center'
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
    row: {
        fontWeight: 300,
        textTransform: 'none',
        alignItems:'center',
        display: 'flex',
        marginBottom: '4px',
        '& > svg': {
            fontSize: '16px',
            marginRight: '10px'
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    logo: {
        margin: '20px 0',
        '& img': {
            height: '100px',
            [theme.breakpoints.down('sm')]: {
                height: '60px',
            }
        },
        [theme.breakpoints.down('sm')]: {
            marginRight: '20px',
        }
    },
    marker: {
        position: 'relative',
        height: '100px',
        width: '100px',
        '& img': {
            position: 'absolute',
            top: '22px',
            left: '38px',
            height: '30px',
        }
    },
    markerPath1: {
        opacity: 0.3,
        color: '#000000',
        fill: '#ffffff',
        fillOpacity: 1,
        fillRule: 'nonzero',
        stroke: '#ffffff',
        strokeWidth: 2,
        strokeLinecap: 'butt',
        strokeLinejoin: 'round',
        strokeMiterlimit:4,
        strokeOpacity:1,
        strokeDasharray:'none',
        strokeDashoffset:0,
        marker:'none',
        visibility:'visible',
        display:'inline',
        overflow:'visible',
        enableBackground:'accumulate'
    },
    markerPath2: {
        color:'#000000',
        fill: theme.palette.primary.main,
        fillOpacity: 1,
        fillRule: 'nonzero',
        stroke:'none',
        strokeWidth: 2,
        marker:'none',
        visibility:'visible',
        display:'inline',
        overflow:'visible',
        enableBackground:'accumulate'
    },
    showMapButton: {
        padding: '9px',
        borderRadius: ({mapVisible}) => mapVisible ? 0 : '8px',
        minWidth: 0,
        position: 'absolute',
        top: '9px',
        color: ({mapVisible}) => mapVisible ? '#666' : theme.palette.primary.main,
        right: ({mapVisible}) => mapVisible ? '60px' : '10px',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    }
}));

const Contacts = ({post}) => {
    const classes = useStyles()
    const Row = ({Icon, value}) => <div className={classes.row}><Icon /> {value}</div>
    return (
        <div className={classes.textWrapper}>
            <div className={classes.logo}>
                <img src={post.acf.logo?.url} alt={post.acf.logo.filename} />
            </div>
            <Typography variant="h1">{decode(post.title.rendered)}</Typography>
            <div style={{marginTop: '20px'}}>
                <Row
                    Icon={MarkerIcon}
                    value={post.acf.indirizzo.street_name ?
                        `${post.acf.indirizzo.street_name} ${post.acf.indirizzo.street_number} - ${post.acf.indirizzo.post_code} ${post.acf.indirizzo.city} (${post.acf.indirizzo.state_short})` :
                        post.acf.indirizzo.address
                    }
                />
                <Row Icon={PhoneIcon} value={post.acf.phone} />
                <Row Icon={LinkIcon} value={<a href={post.acf.website} target="_blank">{post.acf.website}</a>} />
                <Row Icon={EmailIcon} value={post.acf.email} />
            </div>
        </div>
    )
}

const Marker = ({logo}) => {
    const classes = useStyles()
    return (
        <div className={classes.marker}>
            <svg
                width="100"
                height="100"
                viewBox="0 0 18 18"
            >
                <g
                    transform="translate(0,-1034.3622)"
                >
                    <g
                        transform="translate(48,-256)"
                        style={{display:'inline'}}
                    >
                        <path
                            className={classes.markerPath1}
                            d="m -38.5,1292.3622 c -2.33186,0 -4.5,2 -4.5,4.5 0,2.5278 3.41667,7.0556 4.5,8.5 1.08334,-1.4444 4.5,-5.9722 4.5,-8.5 0,-2.5 -2.16813,-4.5 -4.5,-4.5 z"
                        />
                        <path
                            d="m -38.5,1292.3622 c -2.33186,0 -4.5,2 -4.5,4.5 0,2.5278 3.41667,7.0556 4.5,8.5 1.08334,-1.4444 4.5,-5.9722 4.5,-8.5 0,-2.5 -2.16813,-4.5 -4.5,-4.5 z"
                            className={classes.markerPath2}
                        />
                    </g>
                </g>
            </svg>
            <img src={logo?.url} alt={logo.filename} />
        </div>
    )
}

const Map = ({post, lang}) => (
    <div style={{position: 'absolute', height: '100%', width: '100%'}}>
        <GoogleMapReact
            bootstrapURLKeys={{
                key: 'AIzaSyD-WRcZN-DxOGNpDKDbwdXZyKRszkPFHx8',
                libraries:['places', 'geometry', 'drawing', 'visualization']
            }}
            defaultCenter={{
                lat: post.acf.indirizzo.lat,
                lng: post.acf.indirizzo.lng
            }}
            defaultZoom={post.acf.indirizzo.zoom}
            language={lang}
            region={lang}
        >
            <Marker
                logo={post.acf.logo}
                lat={post.acf.indirizzo.lat}
                lng={post.acf.indirizzo.lng}
                text="My Marker"
            />
        </GoogleMapReact>
    </div>
)

const Struttura = ({ state, actions, libraries }) => {
    // Get information about the current URL.
    const data = state.source.get(state.router.link);
    // Get the data of the post.
    const post = state.source[data.type][data.id];
    // Get a human readable date.
    const date = new Date(post.date);

    const [mapVisible, setMapVisible] = useState(false)
    const classes = useStyles({accentColor: state.theme.options.slider.accentColor, mapVisible})
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
            {post.featured_media !== 0 ? (
                // <FeaturedMedia id={post.featured_media} />
                <div style={{
                    backgroundImage: `url(${state.source.attachment[post.featured_media].source_url})`,
                    backgroundSize: 'cover',
                    width: '100%',
                    paddingBottom: '35%',
                    position: 'relative'
                }}>
                    {mapVisible && <Map post={post} lang={state.theme.lang} /> }
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
                    <Button
                        variant="contained"
                        className={classes.showMapButton}
                        onClick={() => setMapVisible((mapVisible) => !mapVisible)}
                    >
                        <MarkerIcon />
                    </Button>
                    <Contacts post={post} />
                </div>
            ) : (
                <div style={{padding: '64px 0 16px'}}>
                    <Typography style={{fontWeight: 'bold'}} variant="h1">{decode(post.title.rendered)}</Typography>
                </div>
            )}

            {/* Render the content using the Html2React component so the HTML is processed
       by the processors we included in the libraries.html2react.processors array. */}
            <Content>
                <Html2React html={post.content.rendered} />
            </Content>
        </Container>
    ) : null;
};

export default connect(Struttura);

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
