import React, {useEffect, useState} from "react";
import styles from "./SearchResults.module.css";
import {useNavigate} from "react-router-dom";

export const SearchResult = ({movie}) => {
  const navigate = useNavigate();
  const [premium, setPremium] = useState(false);
  useEffect(() => {
    console.log(movie);
    setPremium(movie.imdb.rating >= 8);
  }, [movie]);
  return (
    <div onClick={() => navigate(`/movie/${movie?._id}`)} className={styles.searchResult}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        style={{height: "4rem", width: "3rem"}}
        alt="search result"
      />
      <div className={styles.searchResult__details}>
        <h5>
          {movie.title}
          {premium && (
            <span className={styles.premium}>
              <i class={`fa fa-star`} aria-hidden="true"></i>
            </span>
          )}
        </h5>
        <div className={styles.searchRes_detail}>
          {movie.year && <small>{movie.year} </small>}
          {movie.imdb.rating && <small>{movie.imdb.rating} </small>}
          <small>Ln</small>
        </div>
      </div>
    </div>
  );
};
