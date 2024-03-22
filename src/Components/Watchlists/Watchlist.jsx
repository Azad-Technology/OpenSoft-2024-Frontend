import React, { useState } from 'react';
import styles from './Watchlist.module.css';
import MovieList from '../movieList/MovieList.jsx';
import stockIcon from '../../assets/stock_movie_icon.jpg';
import { useStateValue } from '../../MyContexts/StateProvider.jsx';
import { useNavigate } from 'react-router';

const Watchlist = ({ movies, name, id }) => {
    const [{token, user}, dispatch] = useStateValue();
    // console.log(user);
    const navigate = useNavigate();

  return (
    <div className={styles.watchlist_container}>
  <div className={styles.background_grad}></div>
  <div className={styles.back_button_container}>
    <button className={styles.back_button} onClick={() => (navigate('/profile'))}>
      &larr; Back
    </button>
  </div>
  <div className={styles.watchlist_titlecontainer}>
    <img src={stockIcon} alt="stock icon" className={styles.watchlist_icon} />
    <div className={styles.titles}>
      <div className={styles.watchlist_details}>
        <p>Watchlist</p>
        <h2>{name}</h2>
        <span>
          <strong>{user?.name}</strong> {movies.length} Movies{" "}
        </span>
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