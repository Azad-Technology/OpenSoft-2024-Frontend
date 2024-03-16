import React from 'react'
import styles from './MovieList.module.css'
import Card from '../Card/Card'

const MovieList = () => {
  return (
      <div className={styles.card_array}>
        {
        [...Array(100)].map((e, i) =>{
            return <Card f={i} />
        })
      }
    </div>
  )
}

export default MovieList