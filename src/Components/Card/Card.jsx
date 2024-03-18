import { useEffect } from 'react';
import styles from './Card.module.css';
import { useNavigate } from 'react-router-dom';

const Card = ({ movies }) => {

  const currDate = new Date();

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
            {currDate.getFullYear()}-{currDate.getMonth() + 1}-{currDate.getDate()}
            <span className={styles.card__rating}>
              <i className="fab fa-imdb"></i>:9.5<i className="fas fa-star" />
            </span>
          </div>
          <div className={styles.card__description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo nihil aliquam maxime!</div>
        </div>
        <img src={movies.poster} className={styles.cards_img} alt="Image Not Found" />
      </div>
    </>
  );
};

export default Card;

