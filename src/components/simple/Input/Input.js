import React from 'react';

// Modules
import PropTypes from 'prop-types';
import styles from './Input.module.scss';

const Input = ({ tag: Tag, name, label, error, placeholder, ...props }) => {
  const formItemClass = error ? styles.formItemError : styles.formItem;
  return (
    <div className={formItemClass}>
      <Tag
        className={Tag === 'textarea' ? styles.textarea : styles.input}
        type="text"
        name={name}
        id={name}
        autoComplete="off"
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
  error: false,
  placeholder: ' ',
};

Input.propTypes = {
  tag: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({ error: PropTypes.string })]),
};

export default Input;
