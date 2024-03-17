import React from 'react'
import styles from './MovieList.module.css'
import Card from '../Card/Card.jsx'

const MovieList = ({ movie }) => {
  return (
    <div className={styles.card_array}>
      {
        movie.map((m, i) => (
          <Card movies={m} />
        ))
      }
    </div>
  )
}

export default MovieList