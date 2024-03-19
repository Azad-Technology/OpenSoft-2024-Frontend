import React, { useEffect, useState } from 'react'
import styles from './HomeSliders.module.css'
import Card from '../Card/Card.jsx'
import instance from '../../axios.jsx'
import MovieList from '../movieList/MovieList.jsx'

export const Slider = ({genre,id}) => {

  const [movies,setMovies] = useState(null)

  useEffect(() => {
    const getData = async () => {
      if(genre==="Top IMDB"){
        const response = await instance.get('/imdb')
        setMovies(response.data);
        return;
      }
      if(genre==="More Like This"){
        const response = await instance.get('/movies/'+id+'/related_movies/?count=15')
        setMovies(response.data);
        return;
      }
      const response = await instance.get(`/genre_top/${genre}/?count=15`)
      // movies.push(...movies);
      console.log(response.data);
      setMovies(response.data);
    }
    getData();
  },[genre])
  
  return (
    
      <>
       {movies ? <div className={styles.slider__movies}>
      
        <MovieList movie={movies} />
      </div> : null
      }
      
      </>
   
  )
}
