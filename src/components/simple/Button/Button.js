import React from 'react';

// Modules
import PropTypes from 'prop-types';

// Utilities
import styles from './Button.module.scss';

const GetButtonClassName = inputClass => {
  switch (inputClass) {
    case 'secondary':
      return styles.secondary;
    case 'buttonFixed':
      return styles.buttonFixed;
    case 'absoluteTR':
      return styles.absoluteTopRight;
    default:
      return styles.button;
  }
};

const Button = ({
  children: content,
  href,
  cssClass,
  backgroundImage,
  invertTextColor,
  onClick,
  type,
  ...props
}) => {
  const buttonType = type || 'submit';
  const textClass = invertTextColor ? styles.invertText : styles.text;

  return (
    <React.Fragment>
      {href ? (
        <a
          href={href}
          target="_blank"
          className={GetButtonClassName(cssClass)}
          rel="noopener noreferrer"
        >
          {content}
        </a>
      ) : (
        <button
          onClick={onClick}
          type={buttonType}
          style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : null}
          className={GetButtonClassName(cssClass)}
          {...props}
        >
          <span className={textClass}>{content}</span>
        </button>
      )}
    </React.Fragment>
  );
};

Button.defaultProps = {
  children: '',
  href: '',
  cssClass: '',
  backgroundImage: '',
  invertTextColor: false,
  onClick: () => {},
  type: 'submit',
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  href: PropTypes.string,
  cssClass: PropTypes.string,
  backgroundImage: PropTypes.string,
  invertTextColor: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['submit', 'reset', 'button', '']),
};

export default Button;
