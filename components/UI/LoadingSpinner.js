import React from "react";

import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  return (
    <div className={`${props.asOverlay && styles.loading_spinner__overlay}`}>
      <div className={styles.lds_dual_ring}></div>
    </div>
  );
};

export default LoadingSpinner;
