import React from 'react'
import styles from './HomeSliders.module.css'
import { Slider } from './Slider.jsx';

export const HomeSliders = () => {
  return (
    <div className={styles.sliders}>
        <Slider genre="Top IMDB" />
        <Slider genre="Comedy"/>
        <Slider genre="Action"/>
        <Slider genre="Horror"/>
        <Slider genre="Romance"/>
    </div>
  )
}
