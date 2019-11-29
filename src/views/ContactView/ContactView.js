import React from 'react';

import PropTypes from 'prop-types';

import PhoneSVG from '../../assets/images/phone.svg';
import FacebookSVG from '../../assets/images/facebook.svg';
import EmailSVG from '../../assets/images/envelope.svg';
import styles from './ContactView.module.scss';

const ContactView = () => (
  <section id="contact" className={styles.section}>
    <div className={styles.firstSide}>
      <h1>KONTAKT</h1>
    </div>
    <div className={styles.secondSide}>
      <div className={styles.contactInfoWrapper}>
        <div className={styles.contactInfo}>
          <a href="mailto:cantatapetram@gmail.com">
            {' '}
            <img src={EmailSVG} alt="email" />
            cantatapetram@gmail.com
          </a>
        </div>
        <div className={styles.contactInfo}>
          <a href="https://facebook.com/cantatapetram">
            <img src={FacebookSVG} alt="facebook" />
            facebook.com/cantatapetram
          </a>
        </div>
        <div className={styles.contactInfo}>
          <a href="tel:48660510561">
            <img src={PhoneSVG} alt="telefon" />
            +48 660 510 561
          </a>
        </div>
      </div>
    </div>
  </section>
);

ContactView.propTypes = {
  siteTitle: PropTypes.string,
};

ContactView.defaultProps = {
  siteTitle: ``,
};

export default ContactView;
