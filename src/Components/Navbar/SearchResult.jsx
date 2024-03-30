import React, {useEffect, useState} from "react";
import styles from "./SearchResults.module.css";
import {useNavigate} from "react-router-dom";

export const SearchResult = ({movie,setSearch,setShowSearchBar}) => {
  const navigate = useNavigate();
  const [premium, setPremium] = useState(false);
  useEffect(() => {
    setPremium(movie.imdb.rating >= 8);
  }, [movie]);

  const handleClick = () => {
    navigate(`/movie/${movie?._id}`);
    setSearch("");
    setShowSearchBar(false);
  }

  return (
    <div onClick={handleClick} className={styles.searchResult}>
      <img
        src={movie && movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/poster_1.jpg"}
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
