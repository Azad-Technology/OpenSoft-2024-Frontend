import React from 'react'
import styles from './HomeSliders.module.css'
import { Slider } from './Slider.jsx';
import  CommentCards  from '../CommentCard/CommentCards.jsx';

export const HomeSliders = () => {
  const genres = [
    "Short",
    "Western",
    "Drama",
    "Animation",
    "Comedy",
    "Crime",
    "History",
    "Action",
    "Biography",
    "Family",
    "Romance",
    "Fantasy",
    "Mystery",
    "War",
    "Adventure",
    "Thriller",
    "Documentary",
    "Musical",
    "Music",
    "Film-Noir",
    "Sport",
    "Horror",
    "Sci-Fi",
    "Talk-Show",
    "News"
];

  return (
    <div className={styles.sliders}>

        <div id="romance" className={styles.slider_container}>
        <div className={styles.slider__title}>Romance</div>
        <Slider genre="Romance"/>
        </div>
        <>
        <div className={styles.slider__title}>Comments</div>
        <CommentCards />
        </>
        {genres.map((genre) => {
          return (
            <div id={genre} className={styles.slider_container}>
              <div className={styles.slider__title}>{genre}</div>
              <Slider genre={genre} />
            </div>
          )
        })}
    </div>
  )
}
