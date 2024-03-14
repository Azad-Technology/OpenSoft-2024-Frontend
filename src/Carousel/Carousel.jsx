import React from 'react'
import './Carousel.css'

export const Carousel = () => {
  const movies = [
    {title:"Inception",
    backdrop:"http://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    description:"A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    date:"2010",
    imdb:"8.8",
    genre:[
      "Action",
      "Mystery",
      "Sci-Fi",
    ],},
    {title:"Edge of Tomorrow",
    backdrop:"http://image.tmdb.org/t/p/w1280/4V1yIoAKPMRQwGBaSses8Bp2nsi.jpg",
    description:"A military officer is brought into an alien war against an extraterrestrial enemy who can reset the day and know the future. When this officer is enabled with the same power, he teams up with a Special Forces warrior to try and end the war.",
    date:"2014",
    imdb:"7.9",
    genre:[
      "Action",
      "Adventure",
      "Sci-Fi",
    ],},
    {title:"Kung Fu Panda",
    backdrop:"http://image.tmdb.org/t/p/w1280/d1RHScaZc7I8j0lDke1c4AxI435.jpg",
    description:"In the Valley of Peace, Po the Panda finds himself chosen as the Dragon Warrior despite the fact that he is obese and a complete novice at martial arts.",
    date:"2008",
    imdb:"7.6",
    genre:[
      "Animation",
      "Action",
      "Adventure",
    ],},
    {title:"Iron Man",
    backdrop:"http://image.tmdb.org/t/p/w1280/cyecB7godJ6kNHGONFjUyVN9OX5.jpg",
    description:"After being held captive in an Afghan cave, an industrialist creates a unique weaponized suit of armor to fight evil.",
    date:"2008",
    imdb:"7.9",
    genre:[
      "Action",
      "Adventure",
      "Sci-Fi",
    ],},
    {title:"The Dark Knight",
    backdrop:"http://image.tmdb.org/t/p/w1280/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
    description:"When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.",
    date:"2008",
    imdb:"9",
    genre:[
      "Action",
      "Crime",
      "Drama",
    ],},
    {title:"The Wolf of Wall Street",
    backdrop:"http://image.tmdb.org/t/p/w1280/2P0toWq3feNvFAzf28j7vNc1IuZ.jpg",
    description:"Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
    date:"2013",
    imdb:"8.2",
    genre:[
      "Biography",
      "Comedy",
      "Crime",
    ],},
    {title:"Titanic",
    backdrop:"http://image.tmdb.org/t/p/w1280/sCzcYW9h55WcesOqA12cgEr9Exw.jpg",
    description:"The story of the 1912 sinking of the largest luxury liner ever built, the tragedy that befell over two thousand of the rich and famous as well as of the poor and unknown passengers aboard the doomed ship.",
    date:"1996",
    imdb:"7.7",
    genre:[
      "Action",
      "Drama",
      "History",
    ],},
  ];

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
