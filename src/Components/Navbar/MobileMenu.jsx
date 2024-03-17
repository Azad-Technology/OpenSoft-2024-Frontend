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
    }
  ]

  const handleToggleDropdown=(e)=>{
    const name=e.target.innerText;
    setShowDropdown(prevState=>({
        ...prevState,
        [name]:!prevState[name]
    }))
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
                                        index%2===0 && <a className={`${styles.mobileMenu__link} ${styles.dropdown}`} key={index} href={dropdown.link}>{dropdown.name}</a>
                                    )     
                                }
                                )}
                            </div>
                            <div className={styles.mobileMenu__dropdown_right}>
                                {showDropdown[menuoption.name] && menuoption.dropdown?.map((dropdown,index)=>{
                                    return(
                                        index%2!==0 && <a className={`${styles.mobileMenu__link} ${styles.dropdown}`} key={index} href={dropdown.link}>{dropdown.name}</a>
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
