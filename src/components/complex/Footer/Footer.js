import React from 'react';

// Modules
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

// Utils
import { routes } from '../../../routes';
import styles from './Footer.module.scss';
import { logout } from '../../../actions/usersActions';

import gamepad from '../../../assets/images/gamepad.svg';
import logoPtig from '../../../assets/images/logo-ptig.png';
import facebook from '../../../assets/images/facebook.svg';
import yt from '../../../assets/images/yt.svg';
import google from '../../../assets/images/google.svg';

// Components
import Button from '../../simple/Button/Button';

const Footer = ({ siteTitle }) => {
  const { user } = useSelector(state => ({ user: state.users.user }));
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.generalInfo}>
        <section className={styles.section}>
          Witryna stworzona przez:
          <h3 className={styles.heading}>Polskie Towarzystwo Informatyków i Grafików</h3>
          <div>
            <a
              className={styles.moreInfo}
              href="https://ptig.pl"
              rel="noopener noreferrer"
              target="_blank"
            >
              Dowiedz się więcej
            </a>
          </div>
        </section>
        <section className={styles.section}>
          <h3 className={styles.heading}>Kontakt</h3>
          <div>
            <p>Telefon</p>
            <p>
              <a href="tel:+48730369902">+48 730 369 902</a>
            </p>
            <p>Email</p>
            <p>
              <a href="mailto:ptigbiuro@gmail.com">ptigbiuro@gmail.com</a>
            </p>
          </div>
          <ul className={styles.brands}>
            <li className={styles.brand}>
              <a href="https://www.facebook.com/ptigpl/" rel="noopener noreferrer" target="_blank">
                <img src={facebook} alt="PtigFacebook" />
              </a>
            </li>
            <li className={styles.brand}>
              <a
                href="https://www.youtube.com/channel/UC2NDhkD7CAMXYtFSeTr5BVg"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src={yt} alt="PtigFacebook" />
              </a>
            </li>
            <li className={styles.brand}>
              <a href="https://g.page/ptigbc/review" rel="noopener noreferrer" target="_blank">
                <img src={google} alt="PtigGoogle" />
              </a>
            </li>
            <li className={styles.brand}>
              <a href="http://gaming.ptig.pl" rel="noopener noreferrer" target="_blank">
                <img src={gamepad} alt="PtigGaming" />
              </a>
            </li>
          </ul>
        </section>
      </div>
      <div className={styles.copy}>
        <span>&copy; 2019 Polskie Towarzystwo Informatyków i Grafików</span>
        <p className={styles.logo}>
          <a href="https://ptig.pl" target="_blank" rel="noopener noreferrer">
            <img src={logoPtig} alt="PTIG-LOGO" />
          </a>
        </p>
      </div>
      <div className={styles.loginButton}>
        <Link to={routes.login}>Admin</Link>
      </div>
      {!!user && user.username === 'admin' && (
        <div className={styles.logoutButton}>
          <Button onClick={() => handleLogout()}>Wyloguj</Button>
        </div>
      )}
    </footer>
  );
};

Footer.propTypes = {
  siteTitle: PropTypes.string,
};

Footer.defaultProps = {
  siteTitle: ``,
};

export default Footer;
