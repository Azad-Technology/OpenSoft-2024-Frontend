import { useEffect, useState } from "react";
import styles from "./Card.module.css";
import imdbIcon from '../../assets/imdb-icon.svg';
import { useNavigate } from "react-router-dom";
import Loader from '../Loader/Loader.jsx'

const Card = ({ movies }) => {
  // for dummy purpose we take movies?.like=false;
  const [like,setlike] = useState(false);
  const [value, setvalue] = useState("-o");
  const openHeart = (event) => {
    event.stopPropagation();
    const heart = document.getElementById("heartIcon");
    if (value === "" && like) {
      setvalue("-o");setlike(false);
      heart.style.color = "white";
    } else {
      heart.style.color = "red";
      setvalue("");setlike(true);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      {/* <div className={`${styles.cards} ${styles.skeleton__cards}`}></div> */}
      <div onClick={()=>navigate(`/movie/${movies?._id}`)} className={`${styles.cards} ${styles.skeleton__cards}`} id={movies?movies._id:''}>
        <div className={styles.cards__overlay}>
          <div className={styles.card__title}>{movies?.title}</div>
          <div className={styles.card__runtime}>
            {movies?.year}
            <span className={styles.card__rating}>IMDB: {movies?.imdb.rating}</span>
          </div>
          <div className={styles.card__description}>{movies?.plot}</div>
        </div>
        <div className={styles.icons}>
          <div className={styles.icon} id="heartIcon">
            <i
              class={`fa fa-heart${value}`}
              aria-hidden="true"
              onClick={openHeart}
            ></i>
          </div>
          {movies && <img
            src={`https://image.tmdb.org/t/p/w1280${movies?.poster_path}`}
            className={styles.cards_img}
          />}
        </div>
      </div>
    </>
  );
};

export default Card;
