import { useEffect } from 'react';
import styles from './Card.module.css';
import { useNavigate } from 'react-router-dom';

const Card = ({ movies, index }) => {
  
  const navigate = useNavigate();

  return (
    <>
      <div onClick={()=>navigate(`/movie/${movies._id}`)} className={`${styles.cards} ${index === 0 ? 'styles.first' : ''}`} id={movies._id}>
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

