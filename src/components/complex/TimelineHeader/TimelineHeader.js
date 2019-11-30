import React from 'react';

// Modules
import PropTypes from 'prop-types';

// Utilities
import styles from './TimelineHeader.module.scss';

const TimelineHeader = ({ title, children: subText, secondary }) => {
  const wrapperClass = secondary ? styles.secondaryWrapper : styles.wrapper;

  return (
    <React.Fragment>
      <div className={wrapperClass}>
        <div className={styles.title}>{title}</div>
        <hr className={styles.spacer} />
        <div className={styles.subText}>{subText}</div>
      </div>
    </React.Fragment>
  );
};

TimelineHeader.defaultProps = {
  secondary: false,
  title: '',
  children: '',
};

TimelineHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  secondary: PropTypes.bool,
};

export default TimelineHeader;
