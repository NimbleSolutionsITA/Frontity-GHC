import {connect} from "frontity";
import {Button, Container, Grid, Hidden, makeStyles} from "@material-ui/core";
import Link from "../link";

const useStyles = makeStyles((theme) => ({
    rightLinks: {
        textAlign: 'right',
        padding: '8px 0',
        color: theme.palette.primary.main,
    },
    logoGhcTop: {
        padding: '10px 0'
    },
    logoHH: {
        textAlign: 'center',
        marginTop: '-32px',
        paddingBottom: '16px',
        '& img': {
            height: '98px',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '-8px',
        }
    },
}));

const TopBar = ({isHomepage, hasSlider, state}) => {
    const classes = useStyles()
    const topMenu = state.theme.menus.top
    return (
        <div style={{background: isHomepage ? 'linear-gradient(180deg, #F6F9FC -14.41%, #E1EEFE 54.12%)' : '#FFFFFF'}}>
            <Container>
                <Grid container>
                    <Grid item xs={3}>
                        {!hasSlider && (
                            <Hidden xsDown>
                                <a href="https://garofalohealthcare.com" target="_blank">
                                    <img className={classes.logoGhcTop} src={state.theme.options.logoGHC.url} style={{height: isHomepage ? '60px' : '30px'}} alt="Logo Garofalo Health Care"/>
                                </a>
                            </Hidden>
                        )}
                    </Grid>
                    <Grid item xs={9} className={classes.rightLinks}>
                        {topMenu.map(item => <Button key={item[1]} style={{fontWeight: 'normal'}} component={Link} link={item[1]}>{item[0]}</Button>)}

                        {/*<Button style={{fontWeight: 'normal'}} component={Link} link={pagesMap[14][language][1]}>{pagesMap[14][language][0]}</Button>
                              <Hidden smDown>
                                  <Button style={{fontWeight: 'normal'}} color="primary" onClick={actions.theme.toggleLanguage}>{state.theme.lang === 'it' ? 'English' : 'Italiano'}</Button>
                              </Hidden>
                              <Hidden mdUp>
                                  <Button style={{fontWeight: 'normal'}} color="primary" onClick={actions.theme.toggleLanguage}>{state.theme.lang === 'it' ? 'ENG' : 'ITA'}</Button>
                              </Hidden>*/}
                    </Grid>
                </Grid>
            </Container>
            {isHomepage && !hasSlider && <div className={classes.logoHH}><img src={state.theme.options.logoHead.url} alt="Logo Istituto Raffaele Garofalo"/></div>}
        </div>
    )
}

export default connect(TopBar)