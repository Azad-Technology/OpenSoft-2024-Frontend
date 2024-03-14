import React from 'react'
import styles from './MobileMenu.module.css';

export const MobileMenu = () => {
  return (
    <div className={styles.mobileMenu}>
        <div className={styles.mobileMenu__links}>
            <a className={styles.mobileMenu__link} href="#">Genre</a>
            <a className={styles.mobileMenu__link} href="#">Country</a>
            <a className={styles.mobileMenu__link} href="#">Movies</a>
            <a className={styles.mobileMenu__link} href="#">TV Shows</a>
            <a className={styles.mobileMenu__link} href="#">Top IMDB</a>
        </div>
    </div>
  )
}
