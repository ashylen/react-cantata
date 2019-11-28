import React from 'react';

// Modules
import PropTypes from 'prop-types';

// Components
import Button from '../../simple/Button/Button';
import SocialBox from '../SocialBox/SocialBox';

// Utilities
import styles from './Box.module.scss';

const Box = ({
  header,
  text,
  buttonText,
  buttonBgImage,
  buttonClass,
  buttonHref,
  buttonType,
  invertTextColor,
  socialBoxContent,
}) => (
  <React.Fragment>
    <div className={styles.wrapper}>
      <div className={styles.header}>{header}</div>
      <div className={styles.text}>{text}</div>
      <div className={styles.additionalContent}>
        <Button
          href={buttonHref}
          cssClass={buttonClass}
          backgroundImage={buttonBgImage}
          type={buttonType}
          invertTextColor={invertTextColor}
        >
          {buttonText}
        </Button>
        {socialBoxContent && <SocialBox socialBoxContent={socialBoxContent} />}
      </div>
    </div>
  </React.Fragment>
);

Box.defaultProps = {
  buttonBgImage: '',
  buttonClass: '',
  buttonHref: '',
  buttonType: '',
  invertTextColor: false,
  socialBoxContent: undefined
};

Box.propTypes = {
  header: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonBgImage: PropTypes.string,
  buttonClass: PropTypes.string,
  buttonHref: PropTypes.string,
  buttonType: PropTypes.string,
  invertTextColor: PropTypes.bool,
  socialBoxContent: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    youTubeUrl: PropTypes.string.isRequired,
    subText: PropTypes.string.isRequired,
  }),
};

export default Box;
