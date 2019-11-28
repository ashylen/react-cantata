import React from "react";

// Modules
import PropTypes from 'prop-types';

// Utilities
import styles from "./SectionDescription.module.scss";

const SectionDescription = ({ children }) => (
  <h2 className={styles.description}>{children}</h2>
);

SectionDescription.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SectionDescription;
