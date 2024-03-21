import { useEffect, useState } from "react";
import styles from "./Card.module.css";
import { useNavigate } from "react-router-dom";
import Loader from '../Loader/Loader.jsx'

const Card = ({ movies }) => {
  // for dummy purpose we take movies.like=false;
  const [like,setlike] = useState(false);
  const [value, setvalue] = useState("-o");
  const openHeart = (event) => {
    event.stopPropagation();
    if (value === "" && like) {
      setvalue("-o");setlike(false);
    } else {
      setvalue("");setlike(true);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div onClick={()=>navigate(`/movie/${movies._id}`)} className={styles.cards} id={movies._id}>
        <div className={styles.cards__overlay}>
          <div className={styles.card__title}>{movies.title}</div>
          <div className={styles.card__runtime}>
            {movies.year}
            <span className={styles.card__rating}>{movies.imdb.rating}</span>
          </div>
          <div className={styles.card__description}>{movies.plot}</div>
        </div>
        <div>
          <div className={styles.icon}>
            <i
              class={`fa fa-heart${value}`}
              aria-hidden="true"
              onClick={openHeart}
            ></i>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
            className={styles.cards_img}
            alt="Image Not Found"
          />
        </div>
      </div>
    </>
  );
};

export default Card;
