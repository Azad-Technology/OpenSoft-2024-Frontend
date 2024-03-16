import React, { useState,useEffect, useRef } from 'react'
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
  const mobileMenuRef = useRef(null);
  const searchRef=useRef(null);

    useEffect(()=>{
        function handleClickOutside(event){
            if(mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)){
                setShowHamburgerMenu(false);
            }
        }

        document.addEventListener("mousedown",handleClickOutside);
        return ()=>{
            document.removeEventListener("mousedown",handleClickOutside);
        }
    },[])

    useEffect(()=>{
        function handleClickOutside2(event){
        if(searchRef.current && !searchRef.current.contains(event.target)){
            setShowSearchBar(false);
        }
        }
        document.addEventListener("mousedown",handleClickOutside2);
        return ()=>{
        document.removeEventListener("mousedown",handleClickOutside2);
        }
    },[])

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
                {showHamburgerMenu && <div className={styles.backdrop}></div>}
                {showHamburgerMenu && <div ref={mobileMenuRef}><MobileMenu /></div>}
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
                {showSearchBar && <div ref={searchRef}><Search movies={movies}/></div>}
                {showHamburgerMenu && <div className={styles.backdrop}></div>}
                {showHamburgerMenu && <div ref={mobileMenuRef}><MobileMenu /></div>}
            </div>
        )
    }
}
