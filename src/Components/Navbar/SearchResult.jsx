import React from 'react'
import styles from "./SearchResults.module.css";

export const SearchResult = ({movie}) => {
  return (
    <div className={styles.searchResult}> 
        <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="search result" />
        <div className={styles.searchResult__details}>
            <h5>{movie.title}</h5>
            <small>Year</small>
        </div>
    </div>
  )
}
