import React, { useEffect } from 'react'
import styles from "./SearchResults.module.css";
import { useNavigate } from 'react-router-dom';

export const SearchResult = ({movie}) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(movie);
  }, [movie])
  return (
    <div onClick={()=>navigate(`/movie/${movie?._id}`)} className={styles.searchResult}> 
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="search result" />
        <div className={styles.searchResult__details}>
            <h5>{movie.title}</h5>
            <small>Year</small>
        </div>
    </div>
  )
}
