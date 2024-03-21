import React from 'react';
import Card from '../Card/Card.jsx';
import styles from './Watchlist.module.css';

const Watchlist = ({ movies }) => {
  return (
    <div className={styles.watchlist_ontainer}>
      <h2>My Watchlist</h2>
      <div className={styles.movie_grid}>
        {movies.map((movie) => (
          <Card key={movie.id} movies={movie} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;