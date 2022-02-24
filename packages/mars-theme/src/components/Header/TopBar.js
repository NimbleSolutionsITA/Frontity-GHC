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
        marginTop: '-32px',
        paddingBottom: '16px',
        '& img': {
            height: '75px',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '-8px',
        }
    },
}));

const TopBar = ({isHomepage, hasSlider, state}) => {
    const classes = useStyles()
    const topMenu = state.theme.menus.top
    const setLanguage = (lang) => window.location.assign(window.location.origin+(lang === state.theme.mainLanguage ? '' : '/'+lang)+state.theme.baseLink)
    return (
        <div style={{background: isHomepage ? 'linear-gradient(180deg, #F6F9FC -14.41%, #E1EEFE 54.12%)' : '#FFFFFF'}}>
            <Container>
                <Grid container>
                    <Grid item xs={0} sm={9} style={{position: 'relative'}}>
                        <NewsBanner />
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.rightLinks}>
                        {topMenu.map(item => <Button key={item[1]} style={{fontWeight: 'normal', paddingTop: 0, paddingBottom: 0}} component={Link} link={item[1]}>{item[0]}</Button>)}
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