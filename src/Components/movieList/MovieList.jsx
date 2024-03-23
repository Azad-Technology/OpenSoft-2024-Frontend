import React, { useEffect, useState, useRef } from 'react'
import styles from './MovieList.module.css'
import Card from '../../Components/Card/Card.jsx'

const MovieList = ({ movie }) => {
  const length = movie.length;
  return (
    <div className={styles.movieList}>

        {movie.map((m, i) => {
          if(m && m.poster_path === undefined) return;
          return <Card movies={m} val={i} length={length} />
        })}
        
    </div>
  )
}

export default MovieList