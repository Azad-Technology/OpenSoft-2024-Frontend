import React, { useState } from 'react'
import styles from './MobileMenu.module.css';

export const MobileMenu = () => {

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
    setShowDropdown(prevState=>({
        ...prevState,
        [name]:!prevState[name]
    }))
  }

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

  return (
    <div className={styles.mobileMenu}>
        <div className={styles.mobileMenu__links}>
            {menuoptions.map((menuoption,index)=>{
                return(
                    <>
                        <a onClick={handleToggleDropdown} className={styles.mobileMenu__link} key={index} href={menuoption.link}>{menuoption.name}</a>
                        <div className={styles.mobileMenu__dropdown}>
                            <div className={styles.mobileMenu__dropdown_left}>
                                {showDropdown[menuoption.name] && menuoption.dropdown?.map((dropdown,index)=>{
                                    return(
                                        index%2===0 && <a onClick={(e)=>handleGenreClick(e,dropdown?.genreID)} className={`${styles.mobileMenu__link} ${styles.dropdown}`} key={index} href={dropdown.link}>{dropdown.name}</a>
                                    )     
                                }
                                )}
                            </div>
                            <div className={styles.mobileMenu__dropdown_right}>
                                {showDropdown[menuoption.name] && menuoption.dropdown?.map((dropdown,index)=>{
                                    return(
                                        index%2!==0 && <a onClick={(e)=>handleGenreClick(e,dropdown?.genreID)} className={`${styles.mobileMenu__link} ${styles.dropdown}`} key={index} href={dropdown.link}>{dropdown.name}</a>
                                    )     
                                }
                                )}
                            </div>
                        </div>
                    </>
                )
        })}
          </div>
    </div>
  )
}
