import React from "react";
import {makeStyles, Typography, useMediaQuery, useTheme} from "@material-ui/core";
import {decode, styled} from "frontity";
import translations from "../translations";

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

const ImageHeader = ({featuredImage, isPost, postTitle, date, accentColor}) => {
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))
    const classes = useStyles({accentColor})
    const {width, height} = featuredImage['media_details']
    const isPortrait = height > (width * .75)
    const theme = useTheme()
    const textWidth = isPortrait ? {width: `${96 - ((width / height) * 36)}%`} : {}
    return (
        <div style={{
            backgroundImage: `url(${featuredImage.source_url})`,
            backgroundSize: isPortrait ? 'contain' : 'cover',
            width: '100%',
            paddingBottom: isPortrait ? '35%' : (height/width)*100+'%',
            position: 'relative',
            backgroundPosition: isPortrait ? 'right' : 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: isPortrait && theme.palette.primary.main
        }}>
            {!isPortrait && (
                <svg
                    height="100%"
                    width="100%"
                    className={classes.mask}
                    viewBox={`0 0 ${width} ${height}`}
                >
                    <defs>
                        <mask id="cut-off-bottom">
                            <rect width={isMobile ? '100%' : '75%'} height="100%" mask="url(#cut-off-bottom)" fill="white" />
                            {!isMobile && <circle cx="75%" cy="50%" r={height / 2} fill="black"/>}
                        </mask>
                    </defs>
                    <rect width="100%" height="100%" mask="url(#cut-off-bottom)" />
                    {/*{isMobile ?
                        <rect width="100%" height="100%" /> :
                        <path d="M489.4,200c0-110.5,89.5-200,200-200H0v400h689.4C578.9,400,489.4,310.5,489.4,200z" />
                    }*/}
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

const DateWrapper = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

export default PostHeader