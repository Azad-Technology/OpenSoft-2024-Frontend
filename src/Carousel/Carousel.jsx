import React, { useEffect, useState } from 'react'
import './Carousel.css'
import {movies} from './data'

export const Carousel = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const slideRight = () => {
    setCurrIndex((currIndex + 1) % movies.length);
  }
  const handleClick = (index) => {
    setCurrIndex(index);
  }
  useEffect(() => {
    const interval = setInterval(slideRight, 3000);
    return () => clearInterval(interval);
  }, [currIndex]);
 
  return (
    <div className='carousel'>
      <div className='carousel__container'
       style={{"--index": currIndex}}
       >
        {movies.map((movie, index) => {
          return (
            <div className='carousel__slide' key={index} 
             >
            <div className='overlay' ></div>
            <div className='overlay--down' ></div>
            <img src={movie.backdrop} alt='Movie' />
            <div className='carousel__content'>
                <h1 className='carousel__title'>{movie.title}</h1>
                <div className='carousel__specifics'>
                    <p>{movie.date} &nbsp;</p>
                    <p className=''>{movie.imdb}</p>
                    <p>&nbsp; </p>
                    {movie.genre.map((g) => {
                      return (
                        <p key={g}>{g} &nbsp;</p>
                      )
                    })}
                </div>
                <div className='carousel__description'>{movie.description}</div>
            </div>
        </div>
          )
        })
        }
        <div className='carousel__sideslide'> 
        {movies.map((movie, index) => {
          return (
            <img className={`carousel__sideslide-image ${index === currIndex ? 'active' : ''}`} src={movie.poster} alt={movie.title} key={index} onClick={() => (handleClick(index))} />
          )}
        )}
        </div>
        </div>
    </div>
  )
}
