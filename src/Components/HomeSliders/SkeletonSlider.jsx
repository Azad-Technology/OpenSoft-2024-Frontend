import React from "react";
import styles from "./SkeletonSlider.module.css";

export const SkeletonSlider = () => {
  return (
    <div className={styles.skeletonSlider}>
      <div className={styles.skeletonSlider__header}></div>
      <div className={styles.skeletonSlider__body}></div>
    </div>
  );
};
