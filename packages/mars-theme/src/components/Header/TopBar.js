import {connect} from "frontity";
import {Button, Container, Grid, Hidden, makeStyles} from "@material-ui/core";
import Link from "../link";
import TranslateIcon from '@material-ui/icons/Translate';
import NewsBanner from "./NewsBanner";

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
        marginTop: '-50px',
        paddingBottom: '16px',
        '& img': {
            height: '100px',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '-8px',
        }
    },
}));

const TopBar = ({isHomepage, hasSlider, state, actions}) => {
    const classes = useStyles()
    const topMenu = state.theme.menus.top
    const setLanguage = (lang) => window.location.assign(window.location.origin+(lang === state.theme.mainLanguage ? '' : '/'+lang)+state.theme.baseLink)
    const flashNewsCategory = state.source.data['all-categories/'].items.find(c => c.slug === 'flash-news')?.id
    return (
        <div style={{background: isHomepage ? 'linear-gradient(180deg, #F6F9FC -14.41%, #E1EEFE 54.12%)' : '#FFFFFF'}}>
            <Container>
                <Grid container>
                    <Grid item sm={7} md={9} style={{position: 'relative'}}>
                        {!hasSlider && state.theme.options.logoGHC && (
                            <Hidden xsDown>
                                <a href="https://garofalohealthcare.com" target="_blank">
                                    <img className={classes.logoGhcTop} src={state.theme.options.logoGHC.url} style={{height: isHomepage ? '60px' : '30px'}} alt={state.theme.options.logoGHC.filename}/>
                                </a>
                            </Hidden>
                        )}
                        {hasSlider && flashNewsCategory && <NewsBanner categories={flashNewsCategory} />}
                    </Grid>
                    <Grid item xs={12} sm={5} md={3} className={classes.rightLinks}>
                        {topMenu.map(item => <Button key={item[1]} style={{fontWeight: 'normal', paddingTop: 0, paddingBottom: 0}} onClick={() => actions.router.set(state.theme.urlPrefix+item[1])} >{item[0]}</Button>)}
                        {state.theme.languages.filter(l => l.id !== state.theme.lang).map(lang =>  (
                            <div style={{borderLeft: '1px solid', display: 'inline-block'}}>
                                <Button startIcon={<TranslateIcon />} style={{fontWeight: 'normal', paddingTop: 0, paddingBottom: 0}} color="primary" onClick={() => setLanguage(lang.id)}>
                                    {lang.shortName}
                                </Button>
                            </div>
                        ))}
                    </Grid>
                </Grid>
            </Container>
            {isHomepage && !hasSlider && state.theme.options.logoHead && <div className={classes.logoHH}><img src={state.theme.options.logoHead.url} alt={state.theme.options.logoHead.filename} /></div>}
        </div>
    )
}

export default connect(TopBar)