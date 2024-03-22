import { useEffect } from 'react';
import styles from './Card.module.css';
import { useNavigate } from 'react-router-dom';

const Card = ({ movies }) => {
  
  const currDate = new Date();
  // if(movies != null) console.log(movies.imdb.rating);
  const onMove = (e) => {
    return e;
  };

  const unHover = () => {
    const particularCard = document.getElementById(`${movies._id}`);
    particularCard.style.setProperty('transform-origin', 'top');
  };

  const onHover = (onMove) => {
    let h = parseFloat(window.innerWidth);
    let val = (onMove.clientX / h) * 100;
    const particularCard = document.getElementById(`${movies._id}`);
    const thatStyle = window.getComputedStyle(particularCard);
    let x = (parseFloat(thatStyle.width) / h) * 100;
    if (x + 8 >= val) {
      particularCard.style.setProperty('transform-origin', 'top left');
    } else if (100 - val <= x + 8.9) {
      particularCard.style.setProperty('transform-origin', 'top right');
    } else {
      particularCard.style.setProperty('transform-origin', 'top');
    }
    console.log(thatStyle.width, x, h, val);
  };

  const navigate = useNavigate();

  return (
    <>
      <div onClick={()=>navigate(`/movie/${movies._id}`)} className={styles.cards} id={movies._id} onMouseOver={onHover} onMouseOut={unHover} onMouseMove={onMove}>
        <div className={styles.cards__overlay}>
          <div className={styles.card__title}>{movies.title}</div>
          <div className={styles.card__runtime}>
            {movies.year}
            <span className={styles.card__rating}>{movies.imdb.rating}
            </span>
          </div>
          <div className={styles.card__description}>{movies.plot}</div>
        </div>
        <img src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`} className={styles.cards_img} alt="Image Not Found" />
      </div>
    </>
  );
};

export default Card;

