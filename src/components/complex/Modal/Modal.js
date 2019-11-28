import React from 'react';

// Modules
import PropTypes from 'prop-types';

// Utilities
import styles from './Modal.module.scss';

// Components
import WizardForm from '../WizardForm/WizardForm';

const Modal = ({ closeModalFn }) => {
  return (
    <div className={styles.wrapperOuter}>
      <div className={styles.wrapper}>
        <button className={styles.closeButton} onClick={closeModalFn} />
        <WizardForm closeModalFn={closeModalFn} />
      </div>
      <div onClick={closeModalFn} className={styles.overlay} />
    </div>
  );
};

Modal.propTypes = {
  closeModalFn: PropTypes.func.isRequired,
};

export default Modal;
