import { useEffect, useState } from "react";
import styles from "./Card.module.css";
import { useNavigate } from "react-router-dom";

const Card = ({ movies }) => {
  // for dummy purpose we take movies.like=false;
  const [like,setlike] = useState(false);
  const [value, setvalue] = useState("-o");
  const currDate = new Date();
  // if(movies != null) console.log(movies.imdb.rating);
  const openHeart = (event) => {
    event.stopPropagation();
    if (value === "" && like) {
      setvalue("-o");setlike(false);
    } else {
      setvalue("");setlike(true);
    }
  };
  const onMove = (e) => {
    return e;
  };
  const unHover = () => {
    const particularCard = document.getElementById(`${movies._id}`);
    particularCard.style.setProperty("transform-origin", "top");
  };

  const onHover = (onMove) => {
    let h = parseFloat(window.innerWidth);
    let val = (onMove.clientX / h) * 100;
    const particularCard = document.getElementById(`${movies._id}`);
    const thatStyle = window.getComputedStyle(particularCard);
    let x = (parseFloat(thatStyle.width) / h) * 100;
    if (x + 8 >= val) {
      particularCard.style.setProperty("transform-origin", "top left");
    } else if (100 - val <= x + 8.9) {
      particularCard.style.setProperty("transform-origin", "top right");
    } else {
      particularCard.style.setProperty("transform-origin", "top");
    }
    console.log(thatStyle.width, x, h, val);
  };

  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => navigate(`/movie/${movies._id}`)}
        className={styles.cards}
        id={movies._id}
        onMouseOver={onHover}
        onMouseOut={unHover}
        onMouseMove={onMove}
      >
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
            src={movies.poster}
            className={styles.cards_img}
            alt="Image Not Found"
          />
        </div>
      </div>
    </>
  );
};

export default Card;
