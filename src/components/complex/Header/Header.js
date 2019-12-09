import React from 'react';

import PropTypes from 'prop-types';

import Nav from '../Nav/Nav';

import styles from './Header.module.scss';
import logo from '../../../assets/images/logo.png';

const Header = ({ isHomePage, siteTitle }) => {
  const handleScrollToElement = element => {
    document.getElementById(element).scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const HomePageHeader = (
    <header className={styles.homePageHeader}>
      <Nav isHomePage={isHomePage} />
      <div className={styles.wrapper}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.secondLayer}>
          <div className={styles.text}>
            <h1>{siteTitle}</h1>
            <p>
              Jesteśmy młodymi pasjonatami, których połączyła wspólna miłość do geologii. Naszym
              celem jest rozpowszechnianie i ukazywanie innym jej piękna. Wyjeżdżamy w teren,
              prowadzimy stoiska naukowe, dobrze się bawimy i wciąż się rozwijamy! Jeśli nie boicie
              się solidnej dawki geologicznej indoktrynacji to zapraszamy do wspólnego odkrywania
              tajemnic zaklętych w skałach! Młotki w dłoń!
            </p>
            <button
              className={styles.callToAction}
              onClick={() => handleScrollToElement('contact')}
              type="button"
            >
              Skontaktuj się z nami
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  const Header = (
    <header className={styles.mainHeader}>
      <Nav />
    </header>
  );

  return <>{isHomePage ? HomePageHeader : Header}</>;
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
