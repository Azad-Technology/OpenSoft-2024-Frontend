import React, {useEffect, useState, useRef} from "react";
import styles from "./MovieList.module.css";
import Card from "../../Components/Card/Card.jsx";

const MovieList = ({movie, setShowPopup3,setShowLikePopup}) => {
  const length = movie.length === 1 ? 2 : movie.length; // The problem was only for 1 card
  return (
    <div className={styles.movieList}>
      {movie.map((m, i) => {
        if (m && m.poster_path === undefined) return;
        return <Card setShowPopup3={setShowPopup3} movies={m} val={i} length={length} setShowLikePopup={setShowLikePopup} />;
      })}
    </div>
  );
};

export default MovieList;
