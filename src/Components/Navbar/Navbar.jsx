import React, { useState,useEffect, useRef } from 'react'
import styles from './Navbar.module.css';
import { Search } from './Search';
import { MobileMenu } from './MobileMenu.jsx';
import { useNavigate } from 'react-router-dom';


export const Navbar = ({movies}) => {

    const navigate=useNavigate();
    
    const [showDropdown,setShowDropdown]=useState({
        "Genre":false,
        "Country":false,
        "Movies":false,
        "TV Shows":false,
        "Top IMDB":false
    });
    
    const menuoptions = [
        {
            name:"Genre",
            link:"#",
            dropdown:[
                {
                    name:"Action",
                    link:"#",
                    genreID:"action"
                },
                {
                    name:"Comedy",
                    link:"#",
                    genreID:"comedy"
                },
                {
                    name:"Horror",
                    link:"#",
                    genreID:"horror"
                },
                {
                    name:"Romance",
                    link:"#",
                    genreID:"romance"
                },
                {
                    name:"Thriller",
                    link:"#",
                    genreID:"thriller"
                }
            ]
        },
        {
            name:"Country",
            link:"#",
            dropdown:[
                {
                    name:"India",
                    link:"#"
                },
                {
                    name:"USA",
                    link:"#"
                },
                {
                    name:"UK",
                    link:"#"
                },
                {
                    name:"Australia",
                    link:"#"
                },
                {
                    name:"China",
                    link:"#"
                }
            ]
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
        }, 
        {
            name:"Pricing",
            link:"/pricing"
        }
    ]

    const handleToggleDropdown=(e)=>{
        const name=e.target.innerText;
        setShowDropdown(false,false,false,false,false,false);
        setShowDropdown(prevState=>({
            ...prevState,
            [name]:!prevState[name]
        }))
    }


  const [show,setShow]=useState(false);
  const [showSearchBar,setShowSearchBar]=useState(false);
  const [showHamburgerMenu,setShowHamburgerMenu]=useState(false);
  const mobileMenuRef = useRef(null);
  const searchRef=useRef(null);
  const dropdownRef=useRef(null);
  const searchBarRef=useRef(null);

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

    useEffect(()=>{
        function handleClickOutside3(event){
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
                setShowDropdown(prevState=>({
                    ...prevState,
                    "Genre":false,
                    "Country":false
                }))
            }
        }
        document.addEventListener("mousedown",handleClickOutside3);
        return ()=>{
            document.removeEventListener("mousedown",handleClickOutside3);
        }
    },[])

    useEffect(()=>{
        if(showSearchBar){
            searchBarRef.current.focus();
        }
    },[showSearchBar])

    const handleGenreClick=(e,genreID)=>{
        e.preventDefault();
        const genreSection=document.getElementById(genreID);
        if(genreSection){
            const windowHeight = window.innerHeight;
            const genreSectionHeight = genreSection.offsetHeight;
            const offsetTop = genreSection.offsetTop;
            const middleOfViewport = offsetTop - (windowHeight / 2) + (genreSectionHeight / 2);
            window.scrollTo({
                top: middleOfViewport,
                behavior: "smooth"
            });
        }
    }

    if(window.innerWidth>600){
        return (
            <div className={styles.DesktopMenu}>
                <div className={`${styles.navbar} ${show && styles.navBlack}`}>
                    <div className={styles.navbar__left}>
                        <i onClick={()=>setShowHamburgerMenu(!showHamburgerMenu)} className={`fa fa-2x fa-bars ${styles.hamburger}`}></i>
                        <img onClick={()=>navigate('/')} className={styles.navbar__logo} src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="Netflix Logo" />
                        <div className={styles.navbar__links}>
                            {menuoptions.map((menuoption,index)=>(
                                <div className={styles.desktopLinks} key={index}>
                                    <a onMouseOver={handleToggleDropdown} className={styles.navbar__link} key={index} href={menuoption.link}>{menuoption.name}</a>
                                    {showDropdown[menuoption.name] && menuoption.dropdown && <div ref={dropdownRef} className={styles.dropdown}>
                                        {menuoption.dropdown?.map((dropdown,index)=>(
                                            <a onClick={(e)=>handleGenreClick(e,dropdown?.genreID)} className={styles.navbar__link_dropdown} key={index} href={dropdown.link}>{dropdown.name}</a>
                                        ))}
                                    </div>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.navbar__right}>
                        <Search movies={movies}/>
                        <i className={`fa fa-2x fa-user ${styles.desktop_login}`}></i>
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
                <div className={`${styles.navbar} ${styles.navBlack}`}>
                    <div className={styles.navbar__left}>
                        <i onClick={()=>setShowHamburgerMenu(!showHamburgerMenu)} className={`fa fa-2x fa-bars ${styles.hamburger}`}></i>
                        <img onClick={()=>navigate('/')} className={styles.navbar__logo} src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="Netflix Logo" />
                    </div>
                    <div className={styles.navbar__right}>
                        <i onClick={()=>setShowSearchBar(true)} className={`fa fa-2x fa-search ${styles.searchIcon}`}></i>
                        <i className={`fa fa-2x fa-user`}></i>
                    </div>
                </div>
                {showSearchBar && <div ref={searchRef}><Search movies={movies} searchBarRef={searchBarRef}/></div>}
                {showHamburgerMenu && <div className={styles.backdrop}></div>}
                {showHamburgerMenu && <div ref={mobileMenuRef}><MobileMenu /></div>}
            </div>
        )
    }
}
