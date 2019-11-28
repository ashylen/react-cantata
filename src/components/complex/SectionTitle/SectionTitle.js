import React from 'react';

// Modules
import PropTypes from 'prop-types';

// Utilities
import styles from './SectionTitle.module.scss';

const SectionTitle = ({ children, textCustomize }) => {
  let customClassName;

  if (textCustomize !== 'gradient') {
    customClassName = styles.clippingMask;
  } else {
    customClassName = styles.gradient;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={customClassName}>{children}</h1>
    </div>
  );
};

SectionTitle.propTypes = {
  children: PropTypes.string.isRequired,
  textCustomize: PropTypes.string.isRequired,
};

export default SectionTitle;
