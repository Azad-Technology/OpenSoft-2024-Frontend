import React from 'react'
import { SearchResult } from './SearchResult.jsx'
import styles from "./SearchResults.module.css";

export const SearchResults = ({movies}) => {
  return (
    <div className={styles.searchResults}>
        {movies.filter((_,index)=>index<5).map((movie,index)=>(
            <SearchResult key={index} movie={movie}/>
        ))}
    </div>
    // <div className={styles.searchResults}>
    //     <SearchResult />
    // </div>
  )
}
