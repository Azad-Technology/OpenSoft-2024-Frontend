import React, { useEffect, useState, useRef } from 'react'
import styles from './MovieList.module.css'
import Card from '../../Components/Card/Card.jsx'

const MovieList = ({ movie }) => {
  
  
  
  return (
    <>

        {movie?.map((m, i) => {
          if(m.poster_path === null || m.poster_path === "" || m.poster_path === undefined) return;
          return <Card key={i} movies={m} />
        
        })}
        
      </>
  )
}

export default MovieList