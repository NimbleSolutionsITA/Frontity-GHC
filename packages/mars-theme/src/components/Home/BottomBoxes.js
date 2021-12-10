import React from 'react'
import {connect} from "frontity";
import {
    makeStyles,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
} from "@material-ui/core"
import {pagesMap} from "../../config";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        borderRadius: '8px',
        height: '100%',
        position: 'relative',
        backgroundColor: '#F6F9FC',
        flexDirection: 'row-reverse'
    },
    root2: {
        display: 'flex',
        borderRadius: '8px',
        height: '100%',
        position: 'relative',
        color: '#ffffff',
        backgroundColor: '#1F407D',
        flexDirection: 'row-reverse'
    },
    content: {
        padding: '32px 40px',
        width: '60%',
    },
    cover: {
        width: '40%',
        backgroundSize: 'contain'
    },
    wrapper: {
        position: 'relative',
        padding: '32px 0',
        touchAction: 'pan-y'
    },
    actionButtons: {
        display: 'inline-block',
        '& button': {
            padding: '14px 24px',
            marginRight: '16px',
        },
        '&button:last-child': {
            marginRight: 0,
        }
    },
    contentBox: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    contentBody: {
        flexGrow: 1,
        marginBottom: '32px'
    }
});

const BottomBoxes = ({
     isBox1,
     titleBox1,
     bodyBox1,
     imageBox1,
     ctaBox1,
     isBox2,
     titleBox2,
     bodyBox2,
     imageBox2,
     ctaBox2,
     actions,
     state,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Grid container spacing={4} justify="center">
                {isBox1 && (
                    <Grid item xs={10}>
                        <Card className={classes.root}>
                            <CardContent classes={{root: classes.content}}>
                                <div className={classes.contentBox}>
                                    <Typography component="h4" variant="h4" style={{fontWeight: 'bold'}}>
                                        {titleBox1}
                                    </Typography>
                                    <div className={classes.contentBody}>
                                        {bodyBox1}
                                    </div>
                                    <div className={classes.actionButtons}>
                                        <Button onClick={() => actions.router.set('/prenota/')} size="small" variant="contained" color="primary">{ctaBox1}</Button>
                                    </div>
                                </div>
                            </CardContent>
                            <CardMedia
                                className={classes.cover}
                                image={imageBox1}
                            />
                        </Card>
                    </Grid>
                )}
                {isBox2 && (
                    <Grid item xs={10}>
                        <Card className={classes.root2}>
                            <CardContent classes={{root: classes.content}}>
                                <div className={classes.contentBox}>
                                    <Typography component="h4" variant="h4" style={{fontWeight: 'bold'}}>
                                        {titleBox2}
                                    </Typography>
                                    <div className={classes.contentBody}>
                                        {bodyBox2}
                                    </div>
                                    <div className={classes.actionButtons}>
                                        <Button onClick={() => actions.router.set(pagesMap[14][state.theme.lang][1])} size="small" variant="contained">{ctaBox2}</Button>
                                    </div>
                                </div>
                            </CardContent>
                            <CardMedia
                                className={classes.cover}
                                image={imageBox2}
                            />
                        </Card>
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default connect(BottomBoxes)