
import { useState } from "react";
import bgBottom from "../../assets/bg-bottom.svg";
import bgTop from "../../assets/bg-top.svg";
import styles from "./styles.module.css";
import { Link } from 'react-router-dom';
function Pricing() {
  const [annually, setAnnually] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.bgTopImage}>
        <img src={bgTop} alt="" />
      </div>
      <section className={styles.section}>
        <h1 className={styles.heading}>
          Our Pricing
        </h1>
        <div className={styles.pricingCards}>

          <article className={styles.pricingCard}>
            <h2>Basic</h2>

            <h3>
              <span>$</span> 19.99
            </h3>

            <ul>
              <li>
                500 Searches every Month
              </li>
              <li>
                2 Users Allowed
              </li>
              <li>
                Send up to 3 GB
              </li>
            </ul>
            <Link target="_blank" to="paisawala.lemonsqueezy.com"><button className={styles.pricingCard_button}>Purchase</button></Link>
          </article>

          <article className={`${styles.pricingCard} ${styles.featured}`}>
            <h2>Standard</h2>
            <h3>
              <span>$</span> 24.99
            </h3>

            <ul>
              <li>
                1 TB Storage
              </li>
              <li>
                5 Users Allowed
              </li>
              <li>
                Send up to 10 GB
              </li>
            </ul>

            <Link target="_blank" to="https://paisawala.lemonsqueezy.com/checkout/buy/d7accfc5-fe92-41d3-a155-82e72dfcfd90?embed=1"><button className={styles.pricingCard_button}>Purchase</button></Link>

          </article>

          <article className={`${styles.pricingCard} ${styles.lastCard}`}>
            <h2>Premium</h2>
            <h3>
              <span>$</span> 39.99
            </h3>
            <ul>
              <li>
                500 GB Storage
              </li>
              <li>
                2 Users Allowed
              </li>
              <li>
                Send up to 3 GB
              </li>
            </ul>

            <Link target="_blank" to="https://paisawala.lemonsqueezy.com/checkout/buy/1840ab67-0984-4d07-98e3-7439cfa644d4?embed=1">
              <button className={styles.pricingCard_button}>Purchase</button>
            </Link>

          </article>
        </div>

      </section>


      <div className={styles.bgBottomImage}>
        <img src={bgBottom} alt="" />
      </div>
    </div>
  );
}
export default Pricing;