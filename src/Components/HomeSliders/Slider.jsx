import React, { useEffect, useState, useRef } from 'react'
import styles from './HomeSliders.module.css'
import Card from '../Card/Card.jsx'
import instance from '../../axios.jsx'
import MovieList from '../movieList/MovieList.jsx'

export const Slider = ({genre}) => {

  const [movies,setMovies] = useState(null)

  useEffect(() => {
    const getData = async () => {
      if(genre==="Top IMDB"){
        const response = await instance.get('/imdb')
        setMovies(response.data);
        return;
      }
      const response = await instance.get(`/genre/${genre}/?count=15`)
      // movies.push(...movies);
      setMovies(response.data);
    }
    getData();
  },[genre])



  
  return (
      
    <>
    {movies ? <div className={styles.slider}>
      
      <MovieList movie={movies} />
    </div> : null
    }
    </>
    
  )
}
