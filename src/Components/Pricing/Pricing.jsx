
import { useState } from "react";
import bgBottom from "../../assets/bg-bottom.svg";
import bgTop from "../../assets/bg-top.svg";
import styles from "./styles.module.css";
import { Link } from 'react-router-dom';
function Pricing() {
  const [annually, setAnnually] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
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

          <article className={`${styles.pricingCard} ${isHovered === 0 ? styles.featured_free : ''}`}
            onMouseEnter={() => setIsHovered(0)}
            onMouseLeave={() => setIsHovered(null)}>
            <h2>Basic</h2>

            <h3>
              Free
            </h3>

          <button disabled className={styles.pricingCard_button_free}>Owned</button>
            <ul>
              <li>
                Quality upto 480p
              </li>
              <li>
                Add up to 10 favorites
              </li>
              <li>
                Make up to 1 watchlist
              </li>
              <li>
                Customizable user profile
              </li>
            </ul>
          </article>

          <article className={`${styles.pricingCard} ${isHovered === 1 ? styles.featured : ''}`}
            onMouseEnter={() => setIsHovered(1)}
            onMouseLeave={() => setIsHovered(null)}>
            <h2>Silver</h2>
            <h3>
              <span>$</span> 49.99
            </h3>
            <Link target="_blank" to="https://paisawala.lemonsqueezy.com/checkout/buy/d7accfc5-fe92-41d3-a155-82e72dfcfd90?embed=1"><button className={styles.pricingCard_button}>Purchase</button></Link>

            <ul>
              <li>
                Get access to Premium Movies
              </li>
              <li>
                Quality upto 720p
              </li>
              <li>
                Make up to 5 watchlists
              </li>
              <li>
                Unlimited favorites
              </li>
              <li>
                Continue Watching where you left off
              </li>
              <li>
                Picture in Picture mode
              </li>
            </ul>


          </article>

          <article className={`${styles.pricingCard} ${isHovered === 2 ? styles.featured : ''}`}
            onMouseEnter={() => setIsHovered(2)}
            onMouseLeave={() => setIsHovered(null)}>
            <h2>Gold</h2>
            <h3>
              <span>$</span> 99.99
            </h3>
            <Link target="_blank" to="https://paisawala.lemonsqueezy.com/checkout/buy/1840ab67-0984-4d07-98e3-7439cfa644d4?embed=1">
              <button className={styles.pricingCard_button}>Purchase</button>
            </Link>
            <ul>
              <li>
                Everything in the Silver tier
              </li>
              <li>
                Quality upto 1080p
              </li>
              <li>
                Voice Commands with Alan AI
              </li>
              <li>
                Unlimited watchlists
              </li>
              <li>
                Recommendation system
              </li>
            </ul>


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