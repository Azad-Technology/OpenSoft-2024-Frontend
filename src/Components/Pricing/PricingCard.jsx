import React from "react";
import styles from "./styles.module.css";

export const PricingCard = ({plan}) => {
  return (
    <div className={`${styles.pricing__card}`}>
      <h2>{plan.name}</h2>
      <h3>${plan.price}</h3>
      <ul>
        {plan.features.map((feature, index) => {
          return <li key={index}>{feature}</li>;
        })}
      </ul>
      <button className={`${styles.button}`}>Get Started</button>
    </div>
  );
};
