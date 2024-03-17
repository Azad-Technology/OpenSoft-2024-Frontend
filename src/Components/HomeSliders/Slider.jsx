import React from 'react'
import styles from './HomeSliders.module.css'
import Card from '../Card/Card.jsx'

export const Slider = ({genre}) => {

  const movies=[
    {
      title:"The Tomorrow War",
      poster_path:"https://image.tmdb.org/t/p/w500/34nDCQZwaEvsy4CFO5hkGRFDCVU.jpg"
    },
    {
      title: "Inception",
      poster_path: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
    },
    {
      title: "The Tomorrow War",
      poster_path: "https://image.tmdb.org/t/p/w500/34nDCQZwaEvsy4CFO5hkGRFDCVU.jpg"
    },
    {
      title: "Inception",
      poster_path: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
    },
    {
      title: "The Tomorrow War",
      poster_path: "https://image.tmdb.org/t/p/w500/34nDCQZwaEvsy4CFO5hkGRFDCVU.jpg"
    },
    {
      title: "Inception",
      poster_path: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
    },
    {
      title: "The Tomorrow War",
      poster_path: "https://image.tmdb.org/t/p/w500/34nDCQZwaEvsy4CFO5hkGRFDCVU.jpg"
    },
    {
      title: "Inception",
      poster_path: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
    },
  ]

  return (
    <div className={styles.slider}>
      <div className={styles.slider__title}>{genre}</div>
      <div className={styles.slider__movies}>
        <Card movies={movies[0]}/>
        <Card movies={movies[1]}/>
        <Card movies={movies[2]}/>
        <Card movies={movies[3]}/>
        {/* <Card movies={movies[4]}/>
        <Card movies={movies[5]}/>
        <Card movies={movies[6]}/>
        <Card movies={movies[7]}/> */}

      </div>
    </div>
  )
}
