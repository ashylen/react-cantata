import React from 'react';

// Modules
import PropTypes from 'prop-types';

// Utilities
import styles from './Modal.module.scss';

const Modal = ({ closeModalFn, children }) => {
  return (
    <div className={styles.wrapperOuter}>
      <div className={styles.wrapper}>
        <button className={styles.closeButton} onClick={closeModalFn} />
        {children}
      </div>
      <div onClick={closeModalFn} className={styles.overlay} />
    </div>
  );
};

Modal.propTypes = {
  closeModalFn: PropTypes.func.isRequired,
};

export default Modal;
