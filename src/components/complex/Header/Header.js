import React from 'react';

// Modules
import HeaderNavigation from './HeaderNavigation';

// Utilities
import styles from './Header.module.scss';

// Components
import headerBg from '../../../assets/images/header-bg.png';
import logo from './header-logo.png';

const Header = () => {
  return (
    <header id="about" className={styles.wrapper}  style={{ backgroundImage: `url(${headerBg})` }}>
      <HeaderNavigation />
      <div className={styles.logoWrapper}>
        <img className={styles.logo} src={logo} alt="Logo" />
      </div>
    </header>
  );
};

export default Header;
