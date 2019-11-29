import React from 'react';

// Modules
import PropTypes from 'prop-types';

// Utilities
import styles from './Box.module.scss';

const Box = ({ title, description }) => (
  <React.Fragment>
    <div className={styles.wrapper}>
      <div className={styles.header}>{title}</div>
      <div className={styles.text}>{description}</div>
    </div>
  </React.Fragment>
);

Box.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Box;
