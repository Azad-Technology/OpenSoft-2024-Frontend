import React, { useState } from 'react'
import styles from './MobileMenu.module.css';
import { useNavigate } from 'react-router-dom';
import menuoptions from './Menuoptions.jsx';
import GenreModal from '../GenreModal/GenreModal.jsx';

export const MobileMenu = ({setSelectedGenre,setSelectedID,setShowModal,setShowHamburgerMenu}) => {

    const navigate=useNavigate();

    const [showDropdown,setShowDropdown]=useState({
        "Genre":false,
        "Country":false,
        "Movies":false,
        "TV Shows":false,
        "Top IMDB":false
    });

  const handleToggleDropdown=(e)=>{
    const name=e.target.innerText;
    setShowDropdown(prevState=>({
        ...prevState,
        [name]:!prevState[name]
    }))
  }

    const handleGenreClick=(e,genreID)=>{
        e.preventDefault();
        setSelectedGenre(e.target.innerText);
        setSelectedID(genreID);
        setShowModal(true);
        setShowHamburgerMenu(false);
    }

  return (
    <div className={styles.mobileMenu}>
        <div className={styles.mobileMenu__links}>
            {menuoptions.map((menuoption,index)=>{
                return(
                    <>
                        <a onClick={handleToggleDropdown} className={styles.mobileMenu__link} key={index} href={menuoption.link}>{menuoption.name}</a>
                        <div className={styles.mobileMenu__dropdown}>
                            <div className={styles.mobileMenu__dropdown_column}>
                                {showDropdown[menuoption.name] && menuoption.dropdown?.slice(0,9).map((dropdown,index)=>{
                                    return(
                                        <a onClick={(e)=>handleGenreClick(e,dropdown?.genreID)} className={`${styles.mobileMenu__link} ${styles.dropdown}`} key={index} href={dropdown.link}>{dropdown.name}</a>
                                    )     
                                }
                                )}
                            </div>
                            <div className={styles.mobileMenu__dropdown_column}>
                                {showDropdown[menuoption.name] && menuoption.dropdown?.slice(9,18).map((dropdown,index)=>{
                                    return(
                                        <a onClick={(e)=>handleGenreClick(e,dropdown?.genreID)} className={`${styles.mobileMenu__link} ${styles.dropdown}`} key={index} href={dropdown.link}>{dropdown.name}</a>
                                    )     
                                }
                                )}
                            </div>
                            <div className={styles.mobileMenu__dropdown_column}>
                                {showDropdown[menuoption.name] && menuoption.dropdown?.slice(18).map((dropdown,index)=>{
                                    return(
                                        <a onClick={(e)=>handleGenreClick(e,dropdown?.genreID)} className={`${styles.mobileMenu__link} ${styles.dropdown}`} key={index} href={dropdown.link}>{dropdown.name}</a>
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
