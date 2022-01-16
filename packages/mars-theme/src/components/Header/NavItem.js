import React from "react";
import { connect, decode } from "frontity";
import { Button, Menu, MenuItem, Hidden, makeStyles } from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
    ItemWrapper: {
        display: 'flex',
        margin: '0 16px',
        [theme.breakpoints.down('sm')]: {
            margin: '8px 0'
        }
    },
}))

/**
 * Navigation Component
 *
 * It renders the navigation links
 */
const NavItem = ({ state, actions, link, closeMenu }) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isCurrentPage = (url) => state.theme.baseLink === url;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickSubItem = (ln) => {
        setAnchorEl(null);
        actions.router.set(state.theme.urlPrefix+ln);
    }

    const handleClickSubItemMobile = (ln) => {
        closeMenu()
        actions.router.set(state.theme.urlPrefix+ln);
    }

    return Array.isArray(link[1]) ? (
        <>
            <div className={classes.ItemWrapper}>
                <Hidden smDown>
                    <Button aria-haspopup="true" onClick={handleClick} endIcon={<ArrowDropDownIcon />}>
                        {decode(link[0])}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {link[1].map(item =>
                            <MenuItem key={item[1]} color={isCurrentPage(item[1]) ? 'primary' : 'default'} onClick={() => handleClickSubItem(item[1])}>
                                {decode(item[0])}
                            </MenuItem>
                        )}
                    </Menu>
                </Hidden>
                <Hidden mdUp>
                    <Button disabled style={{color: '#000000'}} aria-haspopup="true">
                        {decode(link[0])}
                    </Button>
                </Hidden>
            </div>
            <Hidden mdUp>
                {link[1].map(item =>
                    <div className={classes.ItemWrapper} key={item[1]} style={{marginLeft: '40px'}}>
                        <Button aria-haspopup="true" color={isCurrentPage(item[1]) ? 'primary' : 'default'} onClick={() => handleClickSubItemMobile(item[1])}>
                            {decode(item[0])}
                        </Button>
                    </div>
                )}
            </Hidden>
        </>
    ) : (
        <div className={classes.ItemWrapper}>
            <Hidden smDown>
                <Button onClick={() => handleClickSubItem(link[1])} color={isCurrentPage(link[1]) ? 'primary' : 'default'}>
                    {decode(link[0])}
                </Button>
            </Hidden>
            <Hidden mdUp>
                <Button onClick={() => handleClickSubItemMobile(link[1])} color={isCurrentPage(link[1]) ? 'primary' : 'default'}>
                    {decode(link[0])}
                </Button>
            </Hidden>
        </div>
    )
};

export default connect(NavItem);