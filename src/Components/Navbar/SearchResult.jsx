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
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={{height:"4rem", width:"3rem"}} alt="search result" />
        <div className={styles.searchResult__details}>
            <h5>{movie.title}</h5>
            <div className={styles.searchRes_detail}>
            <small>{movie.year} </small>
            <small>{movie.imdb.rating} </small>
            <small>Ln</small>
            </div>
        </div>
    </div>
  )
}
