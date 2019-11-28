import React, { useState } from 'react';

// Modules
import { NavLink } from 'react-router-dom';
import IsScrolling from 'react-is-scrolling';

// Utilities
import HamburgerMenu from 'react-hamburger-menu';
import styles from './HeaderNavigation.module.scss';
import { width1024 } from '../../../constants/MediaQueries';
import { useWindowSize } from '../../../utilities/Functions/useWindowSize';
import { routes, routesNames } from '../../../routes';

// Components
import SideBarNavigation from './SideBarNavigation';

const HeaderNavigation = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(0);
  const isMobile = useWindowSize().width < width1024;
  const navClassName = window.pageYOffset > 0 ? styles.stickyFullfilled : styles.sticky;

  const navOnClick = async path => {
    if (path !== '') {
      const element = await document.getElementById(path);
      if (element) {
        await element.scrollIntoView({ behavior: 'smooth' });
      }

      if (isMobile) {
        await setIsSideBarOpen(false);
      }
    }
  };

  return (
    <nav className={navClassName}>
      {/* BURGER */}
      {isMobile && (
        <div className={styles.burger}>
          <HamburgerMenu
            width={25}
            height={20}
            strokeWidth={3}
            color="#a1a1a1"
            isOpen={isSideBarOpen}
            menuClicked={() => {
              setIsSideBarOpen(true);
            }}
          />
        </div>
      )}

      {/* Side bar on mobiles */}
      {isSideBarOpen && isMobile ? (
        <React.Fragment>
          <SideBarNavigation isSideBarOpen={isSideBarOpen} navOnClickFn={navOnClick} />
          <div
            onClick={() => {
              setIsSideBarOpen(false);
            }}
            className={styles.overlay}
          />
        </React.Fragment>
      ) : null}

      {/* Default nav on desktops */}
      {!isSideBarOpen && !isMobile && (
        <ul className={styles.wrapper}>
          {routes
            ? routes.map(route => (
                <li key={route} className={styles.navItem}>
                  <NavLink
                    exact
                    className={styles.navItemLink}
                    to={`/${route}`}
                    onClick={() => navOnClick(route)}
                  >
                    {routesNames[route]}
                  </NavLink>
                </li>
              ))
            : null}
        </ul>
      )}
    </nav>
  );
};

export default IsScrolling(HeaderNavigation);
