import React, {useRef, useState} from "react";
import { connect } from "frontity";
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import {
    Hidden,
} from "@material-ui/core";
import MenuBar from "./MenuBar";
import TopBar from "./TopBar";
import HomeSlider from "./HomeSlider";


const Header = ({ state }) => {
    const [isNavBarTop, setIsNavBarTop] = useState(false)
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    const appBarRef = useRef()

    useScrollPosition(
        ({ currPos }) => setIsNavBarTop(-currPos.y >= appBarRef.current.offsetHeight),
        [],
        appBarRef
    )

    const closeMenu = () => setOpenMobileMenu(false)
    const openMenu = () => setOpenMobileMenu(true)

    // const menu = state.theme.menus.main.slice(0, -1)
    // const lastItem = [...state.theme.menus.main].pop()

    return (
      <>
          <div ref={appBarRef}>
              <TopBar hasSlider={state.theme.options.hasSlider} isHomepage={state.theme.isHomepage} />
              {state.theme.isHomepage && (
                  <HomeSlider />
              )}
          </div>
          <MenuBar
              isHomepage={state.theme.isHomepage}
              isNavBarTop={isNavBarTop}
              menu={state.theme.menus.main}
              closeMenu={closeMenu}
              setOpenMobileMenu={setOpenMobileMenu}
              openMobileMenu={openMobileMenu}
              openMenu={openMenu}
              // lastItem={lastItem}
          />
      </>
    );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);