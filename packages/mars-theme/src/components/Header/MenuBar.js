import {connect} from "frontity";
import {
    AppBar,
    Box,
    Button,
    Container,
    Hidden,
    IconButton,
    makeStyles,
    SwipeableDrawer,
    Toolbar
} from "@material-ui/core";
import {pagesMap} from "../../config";
import MenuIcon from "@material-ui/icons/Menu";
import logoSmall from "../../../assets/logo-small.png";
import {CloseIcon} from "../menu-icon";
import NavItem from "./NavItem";

const useStyles = makeStyles((theme) => ({
    appBarLogo: {
        width: '32px',
    },
    appBarLogoDrawer: {
        width: '32px',
        position: 'absolute',
        top: '24px',
        left: '36px',
    },
    drawer: {
        height: '100vh',
        padding: '64px 24px 24px'
    },
    closeIcon: {
        position: 'absolute',
        top: '20px',
        right: '20px',
    },
    hhLogo: {
        float: 'left',
        padding: 0,
        margin: '16px 0',
        width: '32px',
        height: '32px',
        minWidth: '32px',
        [theme.breakpoints.down('sm')]: {
            float: 'right',
        }
    },
}));

const MenuBar = ({isHomepage, isNavBarTop, actions, menu, closeMenu, setOpenMobileMenu, openMobileMenu, openMenu, lastItem, state}) => {
    const classes = useStyles()
    return (
        <AppBar color="default" position="sticky" elevation={0}>
            <Container>
                {(!isHomepage || isNavBarTop) &&  <Button className={classes.hhLogo} onClick={() => actions.router.set(pagesMap[0][state.theme.lang][1])}><img className={classes.appBarLogo} src={state.theme.options.logoHeadSmall.url} alt="Logo Istituto Raffaele Garofalo"/></Button>}
                <Hidden mdUp>
                    <Toolbar disableGutters>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                            <MenuIcon />
                        </IconButton>
                        <SwipeableDrawer classes={{paper: classes.drawer}} anchor="top" open={openMobileMenu} onOpen={openMenu} onClose={closeMenu} >
                            <img className={classes.appBarLogoDrawer} src={logoSmall} alt="Logo Istituto Raffaele Garofalo"/>
                            <IconButton color="inherit" onClick={closeMenu} className={classes.closeIcon}><CloseIcon size="16px" /></IconButton>
                            {menu.map(menuItem => <NavItem closeMenu={closeMenu} key={menuItem[1]} link={menuItem} />)}
                            <NavItem closeMenu={closeMenu} link={['Prenota', '/prenota']} />
                        </SwipeableDrawer>
                        <Box margin="0 auto" display="flex" justifyContent="space-evenly" width="100%">
                            <Button onClick={() => actions.router.set(lastItem[1])} variant={"contained"} color="primary" size="small" disableElevation>
                                {lastItem[0]}
                            </Button>
                        </Box>
                    </Toolbar>
                </Hidden>
                <Hidden smDown>
                    <Toolbar style={{justifyContent: 'flex-end'}} disableGutters>
                        {menu.map((menuItem, i) => <NavItem key={menuItem[1]} link={menuItem} />)}
                        {!isHomepage && (
                            <Hidden mdDown>
                                <Button onClick={() => actions.router.set(lastItem[1])} variant={"contained"} color="primary" disableElevation>
                                    {lastItem[0]}
                                </Button>
                            </Hidden>
                        )}
                    </Toolbar>
                </Hidden>
            </Container>
        </AppBar>
    )
}

export default connect(MenuBar)