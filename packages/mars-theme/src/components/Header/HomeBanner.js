import {connect} from "frontity";
import {Button, Container, Grid, makeStyles, Typography} from "@material-ui/core";
import PhoneIcon from "../icons/Phone";

const useStyles = makeStyles((theme) => ({
    homeBannerWrapper: {
        overflow: 'hidden',
        backgroundColor: theme.palette.primary.main,
        color: '#FFFFFF',
    },
    homeBannerDescription: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: '19px',
        lineHeight: '26px',
        padding: '36px 0 16px'
    },
    homeBannerPhone: {
        backgroundColor: '#FFF',
        color: theme.palette.primary.main,
        padding: '2px 3px',
        borderRadius: '50%',
        marginRight: '16px'
    },
    homeBannerBox: {
        zIndex: 1,
        textAlign: 'center',
        padding: '28px 0 48px',
    },
    homeBannerPhoneText: {
        fontWeight: 'bold',
        margin: '16px 0',
    },
    bannerHomeImage: {
        position: 'absolute',
        height: '100%',
        width: '110%',
        left: '-2%',
        borderRadius: '180px 0 0 180px',
        backgroundSize: 'cover',
    },
}));

const HomeBanner = ({libraries, actions, lastItem, state}) => {
    const Html2React = libraries.html2react.Component;
    const classes = useStyles()
    return (
        <div className={classes.homeBannerWrapper}>
            {state.theme.options.banner && (
                <Container>
                    <Grid container>
                        <Grid item xs={5} className={classes.homeBannerBox}>
                            <Typography color="secondary" className={classes.homeBannerDescription}>
                                {state.theme.options.banner.description}
                            </Typography>
                            {/*<Button onClick={() => window.open('https://wp.hesperia.it/wp-content/uploads/2021/03/modalita%CC%80-prenotazione.pdf','_blank')} variant="contained" color="secondary" disableElevation>
                                          {translations(state.theme.lang, 'prenotareUnaVisita')}
                                      </Button>*/}
                            <Grid container justifyContent="center">
                                <Grid item xs={12} sm={6}>
                                    <Button onClick={() => actions.router.set(lastItem[1])} variant="contained" color="secondary" disableElevation>
                                        {lastItem[0]}
                                    </Button>
                                </Grid>
                                {/*<Grid item xs={12} sm={6}>
                                              <Button onClick={() => actions.router.set('/prenota', {state: {params: '#login'}})} variant="outlined" color="secondary" disableElevation>
                                                  {translations(state.theme.lang, 'refertiOnline')}
                                              </Button>
                                          </Grid>*/}
                            </Grid>
                            <Typography variant="h3"  className={classes.homeBannerPhoneText}>
                                        <span className={classes.homeBannerPhone}>
                                            <PhoneIcon style={{height: '18px'}} />
                                        </span>
                                {state.theme.options.banner.phone}
                            </Typography>
                            <Typography color="secondary">
                                <Html2React html={state.theme.options.banner.opening} />
                            </Typography>
                        </Grid>
                        <Grid item xs={7} style={{position: 'relative'}}>
                            <div
                                className={classes.bannerHomeImage}
                                style={{backgroundImage: `url(${state.theme.options.banner.photo.url})`}}
                            />
                        </Grid>
                    </Grid>
                </Container>
            )}
        </div>
    )
}

export default connect(HomeBanner)