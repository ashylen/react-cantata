import React, { useState } from 'react';

// Modules
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Utils
import { routes } from '../../../routes';

// Components
import logo from '../../../assets/images/logo.png';
import styles from './Nav.module.scss';

const Nav = ({ isHomePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className={styles.navWrapper}>
      {!isHomePage ? (
        <div className={styles.brandWrapper}>
          <Link to={routes.home}>
            <img className={styles.logo} src={logo} alt="logo" />
            <span>Cantata Petram</span>
          </Link>
        </div>
      ) : null}
      <nav className={styles.nav}>
        <button
          className={styles.burgerButton}
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className={cx(styles.ham, styles.hamRotate, styles.ham4, {
              [styles.active]: isMenuOpen,
            })}
            viewBox="0 0 100 100"
            width="60"
          >
            <path
              className={cx(styles.line, styles.top, {
                [styles.active]: isMenuOpen,
              })}
              d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
            />
            <path className={cx(styles.line, styles.middle)} d="m 70,50 h -40" />
            <path
              className={cx(styles.line, styles.bottom, {
                [styles.active]: isMenuOpen,
              })}
              d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
            />
          </svg>
        </button>
        {isMenuOpen && (
          <div className={styles.overlay}>
            <div className={styles.item}>
              <Link to={routes.home}>Strona główna</Link>
            </div>
            <div className={styles.item}>
              <Link to={routes.articles}>Artykuły</Link>
            </div>
            <div className={styles.item}>
              <Link to={routes.home}>Wyjazdy</Link>
            </div>
            <div className={styles.item}>
              <Link to={routes.home}>Słownik</Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

Nav.propTypes = {
  siteTitle: PropTypes.string,
};

Nav.defaultProps = {
  siteTitle: ``,
};

export default Nav;
