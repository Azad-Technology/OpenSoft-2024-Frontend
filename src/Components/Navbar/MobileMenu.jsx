import React, { useState } from 'react'
import styles from './MobileMenu.module.css';
import { useNavigate } from 'react-router-dom';

export const MobileMenu = () => {

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
                },
                {
                    name:"Sci-Fi",
                    link:"#",
                    genreID:"scifi"
                }
                ,
                {
                    name:"Drama",
                    link:"#",
                    genreID:"drama"
                },
                {
                    name:"Mystery",
                    link:"#",
                    genreID:"mystery"
                },
                {
                    name:"Crime",
                    link:"#",
                    genreID:"crime"
                },
                {
                    name:"Animation",
                    link:"#",
                    genreID:"animation"
                },
                {
                    name:"Adventure",
                    link:"#",
                    genreID:"adventure"
                },
                {
                    name:"Fantasy",
                    link:"#",
                    genreID:"fantasy"
                },
                {
                    name:"Family",
                    link:"#",
                    genreID:"family"
                },
                {
                    name:"Biography",
                    link:"#",
                    genreID:"biography"
                },
                {
                    name:"History",
                    link:"#",
                    genreID:"history"
                },
                {
                    name:"War",
                    link:"#",
                    genreID:"war"
                },
                {
                    name:"Documentary",
                    link:"#",
                    genreID:"documentary"
                },
                {
                    name:"Music",
                    link:"#",
                    genreID:"music"
                },
                {
                    name:"Sport",
                    link:"#",
                    genreID:"sport"
                },
                {
                    name:"Western",
                    link:"#",
                    genreID:"western"
                },
                {
                    name:"Short",
                    link:"#",
                    genreID:"short"
                },
                {
                    name:"Film-Noir",
                    link:"#",
                    genreID:"filmnoir"
                },
                {
                    name:"Talk-Show",
                    link:"#",
                    genreID:"talkshow"
                },
                {
                    name:"News",
                    link:"#",
                    genreID:"news"
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
                },
            ]
        },
        {
            name:"TV Shows",
            link:"#",
            genreID:"tvshows"
        },
        {
            name:"Top IMDB",
            link:"#",
            genreID:"topimdb"
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
    navigate('/');
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
                                {showDropdown[menuoption.name] && menuoption.dropdown?.slice(0,9).map((dropdown,index)=>{
                                    return(
                                        <a onClick={(e)=>handleGenreClick(e,dropdown?.genreID)} className={`${styles.mobileMenu__link} ${styles.dropdown}`} key={index} href={dropdown.link}>{dropdown.name}</a>
                                    )     
                                }
                                )}
                            </div>
                            <div className={styles.mobileMenu__dropdown_left}>
                                {showDropdown[menuoption.name] && menuoption.dropdown?.slice(9,18).map((dropdown,index)=>{
                                    return(
                                        index%4===0 && <a onClick={(e)=>handleGenreClick(e,dropdown?.genreID)} className={`${styles.mobileMenu__link} ${styles.dropdown}`} key={index} href={dropdown.link}>{dropdown.name}</a>
                                    )     
                                }
                                )}
                            </div>
                            <div className={styles.mobileMenu__dropdown_left}>
                                {showDropdown[menuoption.name] && menuoption.dropdown?.slice(18).map((dropdown,index)=>{
                                    return(
                                        index%2!==0 && <a onClick={(e)=>handleGenreClick(e,dropdown?.genreID)} className={`${styles.mobileMenu__link} ${styles.dropdown}`} key={index} href={dropdown.link}>{dropdown.name}</a>
                                    )     
                                }
                                )}
                            </div>
                            {/* <div className={styles.mobileMenu__dropdown_left}>
                                {showDropdown[menuoption.name] && menuoption.dropdown?.slice(12,16).map((dropdown,index)=>{
                                    return(
                                        index%2!==0 && <a onClick={(e)=>handleGenreClick(e,dropdown?.genreID)} className={`${styles.mobileMenu__link} ${styles.dropdown}`} key={index} href={dropdown.link}>{dropdown.name}</a>
                                    )     
                                }
                                )}
                            </div> */}
                        </div>
                    </>
                )
        })}
          </div>
    </div>
  )
}
