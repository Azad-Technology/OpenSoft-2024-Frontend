import React from 'react';
import styles from './Watchlist.module.css';
import MovieList from '../movieList/MovieList.jsx';
import stockIcon from '../../assets/stock_movie_icon.jpg';

const Watchlist = ({ movies }) => {
  return (
    <div className={styles.watchlist_container}>
      <div className={styles.watchlist_titlecontainer}>
        <div className={styles.titles}>
            <img src={stockIcon} alt="stock icon" className={styles.watchlist_icon} />
            <div className={styles.watchlist_details}>
                <p>Watchlist</p>
                <h2>My Watchlist #1</h2>
                <span><strong>UserName</strong> {movies.length} Movies </span>
            </div>
        </div>
      </div>
      <div className={styles.movie_grid}>
        <MovieList movie={movies} />
      </div>
    </div>
  );
};

export default Watchlist;