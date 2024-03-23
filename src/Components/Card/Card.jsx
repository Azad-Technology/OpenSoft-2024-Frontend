import { useEffect, useState } from "react";
import styles from "./Card.module.css";
import imdbIcon from '../../assets/imdb-icon.svg';
import { useNavigate } from "react-router-dom";
import Loader from '../Loader/Loader.jsx'
import { useStateValue } from "../../MyContexts/StateProvider.jsx";
import instance from "../../axios.jsx";
import { faL } from "@fortawesome/free-solid-svg-icons";

const Card = ({ movies,val,length }) => {

  const [{user, token},dispatch]=useStateValue();

  // for dummy purpose we take movies?.like=false;
  const [like,setlike] = useState(false);

  const [premium, setPremium] = useState(movies?.imdb.rating>=8);
  const openHeart = (event) => {
    if(like){
      setlike(false);
    }else{
      setlike(true);
    }
    event.stopPropagation();
    addFavouriteRequest();
  };


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


  const handlehover = (event) => {
    // console.log(movies)
    const particularCard = document.getElementById(`${movies._id}`);
    if (val === length - 1) {
        particularCard.style.transformOrigin = "right";
    }
    else if(val===0) {
        particularCard.style.transformOrigin = "left";
    }
    else {
      particularCard.style.transformOrigin = "center";
    }
}
  const navigate = useNavigate();

  useEffect(()=>{
    setlike(user?.fav.some(movie=>movie?._id===movies?._id));
  }, [movies, user])

  return (
    <>
      {/* <div className={`${styles.cards} ${styles.skeleton__cards}`}></div> */}
      <div onClick={()=>navigate(`/movie/${movies?._id}`)} className={`${styles.cards} ${styles.skeleton__cards}`} id={movies?movies._id:''} onMouseOver={handlehover}>
        {movies && <div className={styles.cards__overlay}>
          <div className={styles.card__title}>{movies?.title}</div>
          <div className={styles.card__runtime}>
            {movies?.year}
            <span className={styles.card__rating}>IMDB: {movies?.imdb.rating}</span>
          </div>
          <div className={styles.card__description}>{movies?.plot}</div>
        </div>}
        <div className={styles.icons}>
          {movies && <div className={styles.icon} id="heartIcon">
            {like?<i
              class={`fa fa-heart`}
              aria-hidden="true"
              onClick={openHeart}
            ></i>:<i
            class={`fa fa-heart-o`}
            aria-hidden="true"
            onClick={openHeart}
          ></i>}
            
<<<<<<< HEAD
          </div>}
          
=======
          </div>
>>>>>>> d683555c26fa5288450600c31f052410fa53bbe1
          <div className={styles.premium}>
            {movies && premium && <i
              class={`fa fa-star`}
              aria-hidden="true"
            ></i>}
          </div>
          {movies && <img loading="lazy"
            src={`https://image.tmdb.org/t/p/w500${movies?.poster_path}`}
            className={styles.cards_img}
          />}
        </div>
      </div>
    </>
  );
};
export default Card;
