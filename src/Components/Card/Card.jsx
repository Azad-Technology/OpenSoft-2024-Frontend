import { useEffect } from 'react';
import styles from './Card.module.css';
import { useNavigate } from 'react-router-dom';

const Card = (props) => {
  const { movies, value, length } = props;
  const currDate = new Date();
  
  const handlehover = (e) => {
    const particularCard = document.getElementById(`${movies._id}`); 
    if (value === 0) {
      particularCard.style.setProperty('transform-origin', 'top left');
    }
    if(value === length-1){
      particularCard.style.setProperty('transform-origin', 'top right');
    }
  }
  const navigate = useNavigate();

  return (
    <>
      {/* <h2>{key}</h2> */}
      <div onClick={()=>navigate(`/movie/${movies._id}`)} className={styles.cards} id={movies._id} onMouseOver={handlehover}>
        <div className={styles.cards__overlay}>
          <div className={styles.card__title}>{movies.title}</div>
          <div className={styles.card__runtime}>
            {movies.year}
            <span className={styles.card__rating}>{movies.imdb.rating}
            </span>
          </div>
          <div className={styles.card__description}>{movies.plot}</div>
        </div>
        <img src={movies.poster} className={styles.cards_img} alt="Image Not Found" />
      </div>
    </>
  );
};

export default Card;

