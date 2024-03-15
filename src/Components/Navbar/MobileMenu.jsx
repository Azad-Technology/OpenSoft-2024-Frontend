import React from 'react'
import styles from './MobileMenu.module.css';

export const MobileMenu = () => {

  const menuoptions = [
    {
        name:"Genre",
        link:"#",
        dropdown:[
            {
                name:"Action",
                link:"#"
            },
            {
                name:"Comedy",
                link:"#"
            },
            {
                name:"Horror",
                link:"#"
            },
            {
                name:"Romance",
                link:"#"
            },
            {
                name:"Thriller",
                link:"#"
            }
        ]
    },
    {
        name:"Country",
        link:"#"
    },
    {
        name:"Movies",
        link:"#"
    },
    {
        name:"TV Shows",
        link:"#"
    },
    {
        name:"Top IMDB",
        link:"#"
    }
  ]

  return (
    <div className={styles.mobileMenu}>
        {/* <button className={styles.mobileMenu__close}>
          <i className={`fa fa-times ${styles.mobileMenu__closeIcon}`}></i>
          Close
        </button> */}
        {/* <div className={styles.mobileMenu__links}>
            <a className={styles.mobileMenu__link} href="#">
              Genre
            </a>
            <a className={styles.mobileMenu__link} href="#">Country</a>
            <a className={styles.mobileMenu__link} href="#">Movies</a>
            <a className={styles.mobileMenu__link} href="#">TV Shows</a>
            <a className={styles.mobileMenu__link} href="#">Top IMDB</a>
        </div> */}
        <div className={styles.mobileMenu__links}>
            {menuoptions.map((menuoption,index)=>(
                <a className={styles.mobileMenu__link} key={index} href={menuoption.link}>{menuoption.name}</a>
            ))}
          </div>
    </div>
  )
}
