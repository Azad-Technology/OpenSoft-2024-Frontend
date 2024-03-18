import React, { useEffect, useState } from 'react'
import styles from './HomeSliders.module.css'
import Card from '../Card/Card.jsx'
import instance from '../../axios.jsx'
import MovieList from '../movieList/MovieList.jsx'

export const Slider = ({genre}) => {

  const [movies,setMovies] = useState([
    {
      "_id": 1,
      "title": "The Shawshank Redemption",
    },
    {
      "_id": 2,
      "title": "The Godfather",
    },
    {
      "_id": 3,
      "title": "The Dark Knight",
    },
    {
      "_id": 4,
      "title": "The Godfather: Part II",
    }
  ])

  useEffect(() => {
    const getData = async () => {
      const response = await instance.get(`/genre/${genre}`)
      setMovies(response.data)
    }
    getData();
  },[genre])

  return (
    <div className={styles.slider}>
      <div className={styles.slider__title}>{genre}</div>
      <div className={styles.slider__movies}>
        <MovieList movie={movies} />
      </div>
    </div>
  )
}
