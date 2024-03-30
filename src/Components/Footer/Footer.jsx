import React, {useState} from "react";
import styles from "./Footer.module.css"; // Import the CSS file
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GenreModal from "../GenreModal/GenreModal.jsx";
import {faMapMarkerAlt, faPhone, faEnvelopeOpen} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import popKornLogo from "../../assets/PopKorn_logoText.svg";

function Footer({setShowLikePopup}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const handleClick = genre => {
    setSelectedGenre(genre);
    setShowModal(true);
  };
  const navigate = useNavigate();
  return (
    <div className={styles.wrapperWrapper}>
      <div className={styles.wrapper}>
        <footer className={styles.footer}>
          <div className={styles.footer__addr}>
            {/* <h1 className={styles.footer__log}>Something</h1> */}
            <img src={popKornLogo} alt="PopKorn Logo" />
          </div>

          <ul className={styles.footer__nav}>
            <div className={styles.nav__item}>
              <h2 className={styles.nav__title}>Navigation</h2>

              <ul className={styles.nav__ul}>
                <li>
                  <a onClick={() => handleClick("Recent")}>Recent</a>
                </li>

                <li>
                  <a onClick={() => handleClick("TV Shows")}>TV Shows</a>
                </li>

                <li>
                  <a onClick={() => navigate("/pricing")}>Pricing</a>
                </li>
              </ul>
            </div>

            <div className={`${styles.nav__item} ${styles["nav__item--extra"]}`}>
              <h2 className={styles.nav__title}>Top</h2>

              <ul className={`${styles.nav__ul} ${styles["nav__ul--extra"]}`}>
                <li>
                  <a onClick={() => handleClick("Top IMDB")}>IMDB</a>
                </li>

                <li>
                  <a onClick={() => handleClick("Top Movies")}>Movies</a>
                </li>

                <li>
                  <a onClick={() => handleClick("Top Series")}>Series</a>
                </li>
                {/* 
                            <li>
                                <a onClick={handleClick("Top IMDB")}>Automation</a>
                            </li>

                            <li>
                                <a href="#">Artificial Intelligence</a>
                            </li>

                            <li>
                                <a href="#">IoT</a>
                            </li> */}
              </ul>
            </div>
          </ul>

          {/* <div className={styles.legal}>
                    <p>&copy; 2019 Something. All rights reserved.</p>


                </div> */}
        </footer>
        {showModal && <GenreModal setShowLikePopup={setShowLikePopup} genre={selectedGenre} id={"1"} onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
}
export default Footer;
