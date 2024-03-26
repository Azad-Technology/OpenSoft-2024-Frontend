import React, {useEffect, useState, useRef} from "react";
import {useStateValue} from "../../MyContexts/StateProvider.jsx";
import instance from "../../axios.jsx";
import bgBottom from "../../assets/bg-bottom.svg";
import bgTop from "../../assets/bg-top.svg";
import styles from "./styles.module.css";
import {Link} from "react-router-dom";
function Pricing() {
  const [annually, setAnnually] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  const [{token}, dispatch] = useStateValue();
  const [isGold,setIsGold]=useState(false);
  const [isSilver,setIsSilver]=useState(false);
  useEffect(() => {
    dispatch({
      type: "INITIALIZE_TOKEN",
    });
    if (token && token !== "null" && token !== "undefined") {
      const getUser = async () => {
        try {
          const user = await instance.get("/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch({
            type: "SET_USER",
            user: user.data,
          });
          //console.log(user.data.subtype);
          if(user.data.subtype=='Gold'){
            setIsGold(true);
          }
          if(user.data.subtype=='Silver'){
            setIsSilver(true);
          }
          //console.log(isGold,isSilver);
        } catch (err) {
          console.log(err);
        } 
      };
      getUser();
    }
  }, [token]);
  return (
    <div className={styles.container}>
      <div className={styles.bgTopImage}>
        <img src={bgTop} alt="" />
      </div>
      <section className={styles.section}>
        <h1 className={styles.heading}>Our Pricing</h1>
        <div className={styles.pricingCards}>
          <article
            className={`${styles.pricingCard} ${isHovered === 0 ? styles.featured_free : ""}`}
            onMouseEnter={() => setIsHovered(0)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <h2>Basic</h2>

            <h3>Free</h3>

            <button disabled className={styles.pricingCard_button_free}>
              Owned
            </button>
            <ul>
              <li>Quality upto 480p</li>
              <li>Add up to 10 favorites</li>
              <li>Make up to 1 watchlist</li>
              <li>Customizable user profile</li>
            </ul>
          </article>

          <article
            className={`${styles.pricingCard} ${isHovered === 1 ? styles.featured : ""}`}
            onMouseEnter={() => setIsHovered(1)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <h2>Silver</h2>
            <h3>
              <span>₹</span> 50
            </h3>
            {isSilver ? (
              <button className={styles.pricingCard_button_purchased}>
                <p>Your Current Plan</p>
              </button>
            ) : (
              <Link
                target="_blank"
                to="https://paisawala.lemonsqueezy.com/checkout/buy/1840ab67-0984-4d07-98e3-7439cfa644d4?embed=1"
              >
                <button className={styles.pricingCard_button}>
                  <p>Purchase</p>
                </button>
              </Link>
            )}

            <ul>
              <li>Get access to Premium Movies</li>
              <li>Quality upto 720p</li>
              <li>Make up to 5 watchlists</li>
              <li>Unlimited favorites</li>
              <li>Continue Watching where you left off</li>
              <li>Picture in Picture mode</li>
            </ul>
          </article>

          <article
            className={`${styles.pricingCard} ${isHovered === 2 ? styles.featured : ""}`}
            onMouseEnter={() => setIsHovered(2)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <h2>Gold</h2>
            <h3>
              <span>₹</span> 100
            </h3>
            {isGold ? (
              <button className={styles.pricingCard_button_purchased}>
                <p>Your Current Plan</p>
              </button>
            ) : (
              <Link
                target="_blank"
                to="https://paisawala.lemonsqueezy.com/checkout/buy/1840ab67-0984-4d07-98e3-7439cfa644d4?embed=1"
              >
                <button className={styles.pricingCard_button}>
                  <p>Purchase</p>
                </button>
              </Link>
            )}
            <ul>
              <li>Get access to Premium Movies</li>
              <li>Quality upto 1080p</li>
              <li>Unlimited watchlists</li>
              <li>Unlimited favorites</li>
              <li>Continue Watching where you left off</li>
              <li>Picture in Picture mode</li>
              <li>Voice Commands with Alan AI</li>
              <li>Personalized recommendation system</li>
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
