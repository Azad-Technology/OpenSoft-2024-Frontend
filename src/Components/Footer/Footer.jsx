import React from 'react';
import styles from './Footer.module.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className={styles.wrapper}>
            <footer className={styles.footer}>
                <div className={styles.footer__addr}>
                    {/* <h1 className={styles.footer__log}>Something</h1> */}
                    <img src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="" />
                </div>

                <ul className={styles.footer__nav}>
                    <div className={styles.nav__item}>
                        <h2 className={styles.nav__title}>Navigation</h2>

                        <ul className={styles.nav__ul}>
                            <li>
                                <a href="#">Movies</a>
                            </li>

                            <li>
                                <a href="#">TV Shows</a>
                            </li>

                            <li>
                                <a href="#">Pricing</a>
                            </li>
                        </ul>
                    </div>

                    <div className={`${styles.nav__item} ${styles['nav__item--extra']}`}>
                        <h2 className={styles.nav__title}>Top</h2>

                        <ul className={`${styles.nav__ul} ${styles['nav__ul--extra']}`}>
                            <li>
                                <Link href="#">IMDB</Link>
                            </li>

                            <li>
                                <Link href="#">10 Movies</Link>
                            </li>

                            <li>
                                <Link href="#">10 TV Shows</Link>
                            </li>
                            {/* 
                            <li>
                                <Link href="#">Automation</Link>
                            </li>

                            <li>
                                <a href="#">Artificial Intelligence</a>
                            </li>

                            <li>
                                <a href="#">IoT</a>
                            </li> */}
                        </ul>
                    </div>

                    <div className={styles.nav__item}>
                        <h2 className={styles.nav__title}>Legal</h2>

                        <ul className={styles.nav__ul}>
                            <li>
                                <Link href="#">Privacy Policy</Link>
                            </li>

                            <li>
                                <Link href="#">Terms of Use</Link>
                            </li>
                        </ul>
                    </div>
                </ul>

                <div className={styles.legal}>
                    <p>&copy; 2019 Something. All rights reserved.</p>


                </div>
            </footer>
        </div>
    );
}
export default Footer;