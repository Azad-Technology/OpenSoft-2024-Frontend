import React, { useState,useEffect } from 'react'
import styles from './Navbar.module.css';
import { Search } from './Search';

const menuoptions = [
    {
        name:"Genre",
        link:"#"
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
//Gernre,country,movies,TV shows,topimdb
export const Navbar = ({movies}) => {

  const [show,setShow]=useState(false);

    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            window.scrollY>75?setShow(true):setShow(false);
        });
    },[])

  return (
    <div className={`${styles.navbar} ${show && styles.navBlack}`}>
        <div className={styles.navbar__left}>
            <i className={`fa fa-2x fa-bars ${styles.hamburger}`}></i>
            <img className={styles.navbar__logo} src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="Netflix Logo" />
            <div className={styles.navbar__links}>
                {menuoptions.map((menuoption,index)=>(
                    <a className={styles.navbar__link} key={index} href={menuoption.link}>{menuoption.name}</a>
                ))}
            </div>
            {/* <div className={styles.navbar__mobileMenu}>
                {menuoptions.map((menuoption,index)=>(
                    <a className={styles.mobileMenu__link} key={index} href={menuoption.link}>{menuoption.name}</a>
                ))}
            </div> */}
        </div>
        <div className={styles.navbar__right}>
            <Search movies={movies}/>
        </div>
    </div>
  )
}
