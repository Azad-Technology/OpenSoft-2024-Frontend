import { useState } from "react";
import bgBottom from "../../assets/bg-bottom.svg";
import bgTop from "../../assets/bg-bottom.svg";
import styles from "./styles.module.css";

function Pricing() {
  const [annually, setAnnually] = useState(false);

  return (
    <>
      <div className={styles.bgTopImage}>
        <img src={bgTop} alt="" />
      </div>

      <section className={styles.section}>
        <h1 className="text-center text-slate-700 mb-8 text-4xl">
          Our Pricing
        </h1>
        <div className={styles.toggle}>
          <label className={styles.name}>Annually</label>
          <input
            type="checkbox"
            className={styles.checkbox}
            id="checkbox"
            checked={annually}
            onChange={() => setAnnually(!annually)}
          />
          <label htmlFor="checkbox" className={styles.label}>
            <div className={styles.ball}></div>
          </label>
          <label className={styles.name}>Monthly</label>
        </div>

        <div className={styles.pricingCards}>
          {/* Pricing cards */}
        </div>

        <div className={styles.attribution}>
          {/* Attribution */}
        </div>
      </section>

      <div className={styles.bgBottomImage}>
        <img src={bgBottom} alt="" />
      </div>
    </>
  );
}

export default Pricing;