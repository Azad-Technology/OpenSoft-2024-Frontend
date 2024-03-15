import React, { useState,useEffect } from 'react'
import styles from './Navbar.module.css';
import { Search } from './Search';
import { MobileMenu } from './MobileMenu.jsx';

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

export const Navbar = ({movies}) => {

  const [show,setShow]=useState(false);
  const [showSearchBar,setShowSearchBar]=useState(false);
  const [showHamburgerMenu,setShowHamburgerMenu]=useState(false);

    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            window.scrollY>75?setShow(true):setShow(false);
        });
    },[])

    if(window.innerWidth>600){
        return (
            <div className={styles.DesktopMenu}>
                <div className={`${styles.navbar} ${show && styles.navBlack}`}>
                    <div className={styles.navbar__left}>
                        <i onClick={()=>setShowHamburgerMenu(!showHamburgerMenu)} className={`fa fa-2x fa-bars ${styles.hamburger}`}></i>
                        <img className={styles.navbar__logo} src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="Netflix Logo" />
                        <div className={styles.navbar__links}>
                            {menuoptions.map((menuoption,index)=>(
                                <a className={styles.navbar__link} key={index} href={menuoption.link}>{menuoption.name}</a>
                            ))}
                        </div>
                    </div>
                    <div className={styles.navbar__right}>
                        <Search movies={movies}/>
                    </div>
                </div>
                {showHamburgerMenu && <MobileMenu />}
            </div>
        )
    }
    else{
        return(
            <div className={styles.navbar__mobile}>
                <div className={`${styles.navbar} ${show && styles.navBlack}`}>
                    <div className={styles.navbar__left}>
                        <i onClick={()=>setShowHamburgerMenu(!showHamburgerMenu)} className={`fa fa-2x fa-bars ${styles.hamburger}`}></i>
                        <img className={styles.navbar__logo} src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="Netflix Logo" />
                    </div>
                    <div className={styles.navbar__right}>
                        <i onClick={()=>setShowSearchBar(!showSearchBar)} className={`fa fa-2x fa-search ${styles.searchIcon}`}></i>
                    </div>
                </div>
                {showSearchBar && <Search movies={movies}/>}
                {showHamburgerMenu && <MobileMenu />}
            </div>
        )
    }
}
