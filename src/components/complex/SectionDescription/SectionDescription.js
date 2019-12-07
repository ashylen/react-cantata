import React from 'react';

// Modules
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Utilities
import styles from './SectionDescription.module.scss';

const SectionDescription = ({ children, left }) => (
  <h2 className={classNames(styles.description, { [styles.left]: left })}>{children}</h2>
);

SectionDescription.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SectionDescription;
