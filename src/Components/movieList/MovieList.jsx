import React, { useEffect, useState, useRef } from 'react'
import styles from './MovieList.module.css'
import Card from '../../Components/Card/Card.jsx'

const MovieList = ({ movie }) => {
  
  
  
  return (
    <>

        {movie?.map((m, i) => (
          
          <Card movies={m} index={i} />
        ))}
        {/* <Card movies={movie[0]} />
        <Card movies={movie[0]} />
        <Card movies={movie[0]} />
        <Card movies={movie[0]} />
        <Card movies={movie[0]} />
        <Card movies={movie[0]} />
        <Card movies={movie[0]} />
        <Card movies={movie[0]} />
        <Card movies={movie[0]} />
        <Card movies={movie[0]} />
        <Card movies={movie[0]} />
        <Card movies={movie[0]} />
        <Card movies={movie[0]} />
        <Card movies={movie[0]} />
        <Card movies={movie[0]} /> */}
      </>
  )
}

export default MovieList