import React, { useEffect, useState, useRef } from 'react'
import styles from './MovieModalList.module.css'
import Card from '../Card/Card.jsx'

const MovieModalList = ({ movie }) => {

  return (
    <div className={styles.movieList}>

      {movie.map((m, i) => {
        // if(m && m.poster_path === undefined) return;
        return <Card movies={m} />
      })}

    </div>
  )
}

export default MovieModalList