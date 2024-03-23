import React, { useState, useEffect } from 'react'
import styles from "./Card.module.css";
import { useNavigate } from "react-router-dom";
import instance from "../../axios.jsx";
import { useStateValue } from "../../MyContexts/StateProvider.jsx";


const TopCard = ({ movies, val, lenght }) => {
  const [{user, token},dispatch]=useStateValue();

    const [premium, setPremium] = useState(movies?.imdb.rating>=8);
    const [like, setlike] = useState(false);
    const [value, setvalue] = useState("-o");
    const openHeart = (event) => {
        if(like){
            setlike(false);
          }else{
            setlike(true);
          }
          event.stopPropagation();
          addFavouriteRequest();
    };
    const handlehover = (event) => {
        console.log(movies)
        const particularCard = document.getElementById(`${movies?._id}`);
        if (val === length - 1) {
            particularCard.style.transformOrigin = "right";
        }
        else {
            particularCard.style.transformOrigin = "left";
        }
    }

    const addFavouriteRequest = async(e)=>{
        try{
          const response=await instance.patch(`/add_favourite/${movies?._id}`,null, 
          {
            headers:{
              'Content-Type':'application/json',
              Authorization: `Bearer ${token}`
            }
          });
          if(!like){
            dispatch({type:"ADD_FAV", movie:movies});
          }else{
            dispatch({type:"REM_FAV", movie:movies});
          }
        }
        catch(err){
          console.log(err);
        }
      }
      
      useEffect(()=>{
        setlike(user?.fav.some(movie=>movie?._id===movies?._id));
      }, [movies, user])

    const navigate = useNavigate();
    return (
        <div className={styles.contain}>
            <div className={styles.number}>
                <h2>{val + 1}</h2>
            </div>
            <div onClick={() => navigate(`/movie/${movies?._id}`)} className={`${styles.cards} ${styles.skeleton__cards}`} id={`${movies?._id}`} onMouseOver={handlehover}>
                <div className={styles.cards__overlay}>
                    <div className={styles.card__title}>{movies?.title}</div>
                    <div className={styles.card__runtime}>
                        {movies?.year}
                        <span className={styles.card__rating}>{movies?.imdb.rating}</span>
                    </div>
                    <div className={styles.card__description}>{movies?.plot}</div>
                </div>
                <div>
                    <div className={styles.icon}>
                    {like?<i
              class={`fa fa-heart`}
              aria-hidden="true"
              onClick={openHeart}
            ></i>:<i
            class={`fa fa-heart-o`}
            aria-hidden="true"
            onClick={openHeart}
          ></i>}
                    </div>
                    <div className={styles.premium}>
            {movies && premium && <i
              class={`fa fa-star`}
              aria-hidden="true"
            ></i>}
          </div>
                    <img
                        src={`https://image.tmdb.org/t/p/w1280${movies?.poster_path}`}
                        className={styles.cards_img}
                        alt="Image Not Found"
                    />
                </div>
            </div>
        </div>
    )
}

export default TopCard