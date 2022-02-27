import {connect} from "frontity";
import {
    AppBar,
    Button,
    Container,
    Hidden,
    IconButton,
    makeStyles,
    Drawer,
    Toolbar
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {CloseIcon} from "../menu-icon";
import NavItem from "./NavItem";

const useStyles = makeStyles((theme) => ({
    appBarLogo: {
        height: '44px',
    },
    appBarLogoDrawer: {
        height: '32px',
        position: 'absolute',
        top: '24px',
        left: '36px',
    },
    drawer: {
        height: 'calc(100vh - 88px)',
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
        margin: '10px 0',
        width: 'auto',
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
                {(!isHomepage || isNavBarTop) && state.theme.options.logoHeadSmall && (
                    <Button className={classes.hhLogo} onClick={() => actions.router.set(state.theme.urlPrefix+'/')}>
                        <img className={classes.appBarLogo} src={state.theme.options.logoHeadSmall.url} alt="Logo Istituto Raffaele Garofalo"/>
                    </Button>
                )}
                <Hidden mdUp>
                    <Toolbar disableGutters>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer classes={{paper: classes.drawer}} anchor="top" open={openMobileMenu} onOpen={openMenu} onClose={closeMenu} >
                            <img className={classes.appBarLogoDrawer} src={state.theme.options.logoHeadSmall.url} alt="Logo Istituto Raffaele Garofalo"/>
                            <IconButton color="inherit" onClick={closeMenu} className={classes.closeIcon}><CloseIcon size="16px" /></IconButton>
                            {menu.map(menuItem => <NavItem closeMenu={closeMenu} key={menuItem[1]} link={menuItem} />)}
                        </Drawer>
                        {/*{lastItem && (
                            <Box margin="0 auto" display="flex" justifyContent="space-evenly" width="100%">
                                <Button onClick={() => actions.router.set(lastItem[1])} variant={"contained"}
                                        color="primary" size="small" disableElevation>
                                    {lastItem[0]}
                                </Button>
                            </Box>
                        )}*/}
                    </Toolbar>
                </Hidden>
                <Hidden smDown>
                    <Toolbar style={{justifyContent: 'flex-end'}} disableGutters>
                        {menu.map((menuItem, i) => <NavItem key={menuItem[1]} link={menuItem} />)}
                        {!isHomepage && lastItem && (
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