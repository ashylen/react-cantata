import React from "react";

import styles from "./SocialBoxItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialBoxItem = ({ count, icon }) => (
  <React.Fragment>
    <div className={styles.wrapper}>
      <FontAwesomeIcon icon={icon} color="#abacac" size="1x" />
      <span className={styles.text}>{count}</span>
    </div>
  </React.Fragment>
);

export default SocialBoxItem;
