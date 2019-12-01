import React from 'react';
import classNames from 'classnames';

import styles from './Preloader.module.scss';

const Preloader = props => {
  return (
    <div className={classNames(styles.preloaderContainer, { [styles.active]: props.active })}>
      <div className={styles.preloaderWrapper}>
        <div className={classNames(styles.preloader)}></div>
        <div className={classNames(styles.preloader, styles.preloader2)}></div>
        <div className={classNames(styles.preloader, styles.preloader3)}></div>
        <div className={classNames(styles.preloader, styles.preloader4)}></div>
        <div className={classNames(styles.preloader, styles.preloader5)}></div>
        <div className={classNames(styles.preloader, styles.preloader6)}></div>
        <div className={classNames(styles.preloader, styles.preloader7)}></div>
        <div className={classNames(styles.preloader, styles.preloader8)}></div>
        <div className={classNames(styles.preloader, styles.preloader9)}></div>
        <div className={classNames(styles.preloader, styles.preloader10)}></div>
        <div className={classNames(styles.preloader, styles.preloader11)}></div>
        <div className={classNames(styles.preloader, styles.preloader12)}></div>
      </div>
    </div>
  );
};

export default Preloader;
