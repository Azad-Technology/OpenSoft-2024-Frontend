import React, {useEffect, useState, useRef} from "react";
import {useStateValue} from "../../MyContexts/StateProvider.jsx";
import instance from "../../axios.jsx";
import bgBottom from "../../assets/bg-bottom.svg";
import bgTop from "../../assets/bg-top.svg";
import styles from "./styles.module.css";
import {Link} from "react-router-dom";
import {useSearchParams,useNavigate} from "react-router-dom";

function Pricing() {
  const [annually, setAnnually] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  const [{token, user}, dispatch] = useStateValue();
  const [isGold, setIsGold] = useState(false);
  const [isSilver, setIsSilver] = useState(false);
  const [showEditPrompt, setShowEditPrompt] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate=useNavigate();

  useEffect(() => {
    const shouldShowPrompt = searchParams.get("editProfile") === "true";
    setShowEditPrompt(shouldShowPrompt);
  }, [searchParams]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  useEffect(() => {
    if (token && token !== "null" && token !== "undefined") {
      const getUser = async () => {
        //console.log(user.data.subtype);
        if (user?.subtype == "Gold") {
          setIsGold(true);
        }
        if (user?.subtype == "Silver") {
          setIsSilver(true);
        }
        //console.log(isGold,isSilver);
      };
      getUser();
    }
  }, [user]);
  return (
    <div className={styles.container}>
      <div className={styles.bgTopImage}>
        <img src={bgTop} alt="" />
      </div>
      <section className={styles.section}>
        <h1 className={styles.heading}>Our Pricing</h1>
        {showEditPrompt && (
          <div>
            <p className={styles.editprofile}>
              You are currently on the Basic plan. To edit your profile, please upgrade to a higher tier.
            </p>
          </div>
        )}
        <div className={styles.pricingCards}>
          <article
            className={`${styles.pricingCard} ${isHovered === 0 ? styles.featured_free : ""}`}
            onMouseEnter={() => setIsHovered(0)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <h2>Basic</h2>

            <h3>Free</h3>
            {token===null || token===undefined || token==="" || token==='undefined' || token==='null'?(
              <button onClick={()=>navigate('/login')} className={styles.pricingCard_button_free}>Purchase</button>
            )
            :(isGold || isSilver)?
              <button disabled className={styles.pricingCard_button_purchased}>
                <p>Owned</p>
              </button>
              :
              <button disabled className={styles.pricingCard_button_free}>
              Owned
            </button>
            }
            <ul>
              <li>Quality upto 480p</li>
              <li>Add up to 10 favorites</li>
              <li>Make up to 1 watchlist</li>
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
                to={token && token !=='null' && token!==undefined && token!=='undefined'?`https://popkorn.lemonsqueezy.com/checkout/buy/70ffa82f-2efe-4185-8b04-60280b14b262?checkout[email]=${user?.email}&checkout[name]=${user?.name}`:"/login"}
              >
                
                {isGold?
                  <button disabled className={styles.pricingCard_button_purchased}> 
                  <p>Owned</p>
                </button>
                :
                <button className={styles.pricingCard_button}>
                  <p>Purchase</p>
                </button>   
              }
              </Link>
            )}

            <ul>
              <li>Get access to Premium Movies</li>
              <li>Quality upto 720p</li>
              <li>Make up to 5 watchlists</li>
              <li>Unlimited favorites</li>
              <li>Continue Watching where you left off</li>
              <li>Picture in Picture mode</li>
              <li>Customizable user profile</li>
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
                to={token && token !=='null' && token!==undefined && token!=='undefined'?`https://popkorn.lemonsqueezy.com/checkout/buy/a5268a32-b1cb-4d35-952d-7766e242a76a?checkout[email]=${user?.email}&checkout[name]=${user?.name}`:"/login"}
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
              <li>Voice Commands with Korn AI</li>
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
