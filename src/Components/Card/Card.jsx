import { useEffect, useState } from "react";
import styles from "./Card.module.css";
import imdbIcon from '../../assets/imdb-icon.svg';
import { useNavigate } from "react-router-dom";
import Loader from '../Loader/Loader.jsx'

const Card = ({ movies,val,length }) => {
  // for dummy purpose we take movies?.like=false;
  const [like,setlike] = useState(false);
  const [value, setvalue] = useState("-o");

  //manually marking movie premium
  const [premium, setPremium] = useState(movies?.imdb.rating>=8);

  const openHeart = (event) => {
    event.stopPropagation();
    const heart = document.getElementById("heartIcon");
    if (value === "" && like) {
      setvalue("-o");setlike(false);
    } else {
      setvalue("");setlike(true);
    }
  };
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

  return (
    <>
      {/* <div className={`${styles.cards} ${styles.skeleton__cards}`}></div> */}
      <div onClick={()=>navigate(`/movie/${movies?._id}`)} className={`${styles.cards} ${styles.skeleton__cards}`} id={movies?movies._id:''} onMouseOver={handlehover}>
        <div className={styles.cards__overlay}>
          <div className={styles.card__title}>{movies?.title}</div>
          <div className={styles.card__runtime}>
            {movies?.year}
            <span className={styles.card__rating}><i
              class={`fa fa-imdb`}
              aria-hidden="true"
              onClick={openHeart}
              style={{backgroundColor: "gold",color:"black", fontSize: "15px"}}
            ></i>{movies?.imdb.rating}</span>
          </div>
          <div className={styles.card__description}>{movies?.plot}</div>
        </div>
        <div className={styles.icons}>
          <div className={styles.icon} id="heartIcon">
            <i
              class={`fa fa-heart${value}`}
              aria-hidden="true"
              onClick={openHeart}
              style={{ color: like ? "red" : "white"}}
            ></i>
          </div>
          
          <div className={styles.premium}>
            {movies && premium && <i
              class={`fa fa-star`}
              aria-hidden="true"
              onClick={openHeart}
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
