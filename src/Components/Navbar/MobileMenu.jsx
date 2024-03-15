import React from 'react'
import styles from './MobileMenu.module.css';

export const MobileMenu = () => {
  return (
    <div className={styles.mobileMenu}>
        {/* <button className={styles.mobileMenu__close}>
          <i className={`fa fa-times ${styles.mobileMenu__closeIcon}`}></i>
          Close
        </button> */}
        <div className={styles.mobileMenu__links}>
            <a className={styles.mobileMenu__link} href="#">
              Genre
            </a>
            <a className={styles.mobileMenu__link} href="#">Country</a>
            <a className={styles.mobileMenu__link} href="#">Movies</a>
            <a className={styles.mobileMenu__link} href="#">TV Shows</a>
            <a className={styles.mobileMenu__link} href="#">Top IMDB</a>
        </div>
    </div>
  )
}
