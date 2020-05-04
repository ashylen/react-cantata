import React from 'react';

// Modules
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

// Utils
import { routes } from '../../../routes';
import styles from './Footer.module.scss';
import { logout } from '../../../actions/usersActions';

import facebook from '../../../assets/images/facebook.svg';
import yt from '../../../assets/images/yt.svg';
import linkedin from '../../../assets/images/linkedin.svg';
import ig from '../../../assets/images/ig.svg';

// Components
import Button from '../../simple/Button/Button';

const Footer = ({ siteTitle }) => {
  const { user } = useSelector((state) => ({ user: state.users.user }));
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.copy}>
        <span>
          Copyright &copy; 2019 - {new Date().getFullYear()} Wszystkie prawa zastrzeżone | Witryna
          stworzona przez{' '}
          <a href="https://pingwinit.com/" rel="noopener noreferrer" target="_blank">
            PingWin IT
          </a>
        </span>
        <ul className={styles.brands}>
          <li className={styles.brand}>
            <a
              href="https://www.facebook.com/pingwinitcom/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={facebook} alt="PingWinIT - Facebook" />
            </a>
          </li>
          <li className={styles.brand}>
            <a
              href="https://www.instagram.com/pingwinit/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={ig} alt="PingWinIT - Instagram" />
            </a>
          </li>
          <li className={styles.brand}>
            <a
              href="https://www.youtube.com/channel/UCldURYQPvMglq7bp-AUGd9w"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={yt} alt="PingWinIT - Youtube" />
            </a>
          </li>
          <li className={styles.brand}>
            <a
              href="https://www.linkedin.com/company/pingwinit/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={linkedin} alt="PingWinIT -LinkedIn" />
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.loginButton}>
        <Link to={routes.login}>Admin</Link>
      </div>
      {!!user &&
        user.role &&
        (user.role.name === 'Administrator' || user.role.name === 'Authenticated') && (
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
