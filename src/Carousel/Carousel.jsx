import React from 'react'
import './Carousel.css'

export const Carousel = () => {
  return (
    <div className='carousel'>
        <div className='carousel__slide'>
            <div className='overlay'></div>
            <img src='http://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg' alt='Movie' />
            {/* <img className="image2" src='https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_SX677_AL_.jpg' alt="Movie" />
            <img className='image1' src='https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_SX677_AL_.jpg' alt="Movie" /> */}
            <div className='carousel__content'>
                <h1 className='carousel__title'>Inception</h1>
                <div className='carousel__specifics'>
                    <p>2023/2/25 &nbsp;</p>
                    <p>8.3 &nbsp;</p>
                    <p>Action | Thriller &nbsp;</p>
                </div>
                <div className='carousel__description'>Two imprisoned lorem ipsum lorem ipsum plsfh asjasjdas  hasjd ja sjd jasd jajsdasjdjasd j jasdjad  asda asdasd sadasd asdasd asdadasd sadasdas dasdasdhghjkh  </div>
            </div>
                {/* <div className='carousel__sideslide'>
                <img src='https://image.tmdb.org/t/p/w154/wShcJSKMFg1Dy1yq7kEZuay6pLS.jpg' alt='Movie' />
                </div> */}
        </div>
        
    </div>
  )
}
