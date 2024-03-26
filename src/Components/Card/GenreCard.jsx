import {useEffect, useState} from "react";
import styles from "./Card.module.css";
import {useNavigate} from "react-router-dom";

const Card = ({movies}) => {
  const navigate = useNavigate();

  return (
    <>
      <div onClick={() => navigate(`/movie/${movies._id}`)} className={styles.cards} id={movies._id}>
        <div className={styles.card}>
          <div className={styles.Genrediv}>
            <p>{movies.genre}</p>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/original/hMLyJ9BbgvzIGoY5hxJRsfYv1WY.jpg`}
            className={styles.cards_img}
            alt="Image Not Found"
          />
        </div>
      </div>
    </>
  );
};

export default Card;
