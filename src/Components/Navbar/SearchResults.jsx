import React from "react";
import {SearchResult} from "./SearchResult.jsx";
import styles from "./SearchResults.module.css";

export const SearchResults = ({movies, search,setSearch,setShowSearchBar}) => {
  return (
    <div className={styles.searchResults}>
      {movies && movies.map((movie, index) => <SearchResult setSearch={setSearch} key={index} movie={movie} setShowSearchBar={setShowSearchBar} />)}
      {search && movies.length === 0 && <p>No results found</p>}
    </div>
    // <div className={styles.searchResults}>
    //     <SearchResult />
    // </div>
  );
};
