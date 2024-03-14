import React from 'react'
import './Carousel.css'

export const Carousel = () => {
  return (
    <div className='Carousel'>
        <div className='Carousel_slide'>
            <div className='overlay'></div>
            <img src='https://image.tmdb.org/t/p/w1280/fGe1ej335XbqN1j9teoDpofpbLX.jpg' alt='Movie' />
            <div className='Carousel_content'>
                <h1 className='Carousel__title'>The Shawshank Redemption</h1>
                <div className='Carousel_Specifics'>
                    <p>Date &nbsp;</p>
                    <p>Imdb Rating &nbsp;</p>
                    <p>Genre &nbsp;</p>
                </div>
                <div className='Carousel__description'>Two imprisoned lorem ipsum lorem ipsum plsfh asjasjdas  hasjd ja sjd jasd jajsdasjdjasd j jasdjad  asda asdasd sadasd asdasd asdadasd sadasdas dasdasdhghjkh  </div>
            </div>
                {/* <div className='Carousel_sideslide'>
                <img src='https://image.tmdb.org/t/p/w154/wShcJSKMFg1Dy1yq7kEZuay6pLS.jpg' alt='Movie' />
                </div> */}
        </div>
        
    </div>
  )
}
