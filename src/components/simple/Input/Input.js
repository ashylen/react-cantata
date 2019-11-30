import React from 'react';

// Modules
import PropTypes from 'prop-types';
import styles from './Input.module.scss';

const Input = ({ tag: Tag, name, label, maxLength, error, placeholder, ...props }) => {
  const formItemClass = error ? styles.formItemError : styles.formItem;
  return (
    <div className={formItemClass}>
      <Tag
        className={Tag === 'textarea' ? styles.textarea : styles.input}
        type="text"
        name={name}
        id={name}
        autoComplete="off"
        maxLength={maxLength}
        placeholder={placeholder}
        {...props}
      />
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div className={styles.formItemBar} />
      {error ? <div className={styles.errorContainer}>{error.error}</div> : null}
    </div>
  );
};

Input.defaultProps = {
  tag: '',
  maxLength: '200',
  error: false,
  placeholder: ' ',
};

Input.propTypes = {
  tag: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({ error: PropTypes.string })]),
};

export default Input;
