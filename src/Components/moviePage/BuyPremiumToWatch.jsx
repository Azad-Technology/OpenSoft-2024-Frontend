import React from "react";
import Pricing from "../Pricing/Pricing";
import styles from "./BuyPremiumToWatch.module.css";

export default function BuyPremiumToWatch() {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        Movie you are looking for is available only for premium users. Choose one of the plans to continue watching.
      </div>
      <Pricing />
    </div>
  );
}
