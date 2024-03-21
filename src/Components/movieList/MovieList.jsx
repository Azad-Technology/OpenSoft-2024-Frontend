import React, { useEffect, useState, useRef } from 'react'
import styles from './MovieList.module.css'
import Card from '../../Components/Card/Card.jsx'

const MovieList = ({ movie }) => {
  
  
  
  return (
    <>
      {movie.map((m, i) => {
        return <Card movies={m} />
      })}
    </>
  )
}

export default MovieList