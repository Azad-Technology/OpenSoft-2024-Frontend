import React from 'react'
import styles from './HomeSliders.module.css'
import { Slider } from './Slider.jsx';
import  CommentCards  from '../CommentCard/CommentCards.jsx';

export const HomeSliders = () => {

  return (
    <div className={styles.sliders}>
        <>
        <div className={styles.slider__title}>Romance</div>
        <Slider genre="Romance"/>
        </>
        <>
        <div className={styles.slider__title}>Comments</div>
        <CommentCards />
        </>
        <>
        <div className={styles.slider__title}>Comedy</div>
        <Slider genre="Comedy"/>
        </>
        <>
        <div className={styles.slider__title}>Action</div>
        <Slider genre="Action"/>
        </>
        <>
        <div className={styles.slider__title}>Horror</div>
        <Slider genre="Horror"/>
        </>
    </div>
  )
}
