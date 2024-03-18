import { useEffect, useState } from 'react'
import './App.css'
import MoreLikeThis from './Components/moviePage/MoreLikeThis/MoreLikeThis.jsx'
import MoviePage from './Components/moviePage/MoviePage.jsx'
import SearchPage from './Components/SearchPage/SearchPage.jsx'
// import Card from './Components/Card/Card.jsx'
import MovieList from './Components/movieList/MovieList'

import { Carousel } from './Components/Carousel/Carousel'
import React from 'react'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css';
import { Movies } from './Components/Movies.jsx';
import { Navbar } from './Components/Navbar/Navbar.jsx';
import { MobileMenu } from './Components/Navbar/MobileMenu.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  Pricing  from './Components/Pricing/Pricing.jsx'
import { HomeSliders } from './Components/HomeSliders/HomeSliders.jsx';
import instance from './axios.jsx'

const App = () => {

  const [movies, setMovies] = useState([]);
  const [showhamurgerMenu, setShowHamburgerMenu] = useState(false);

  useEffect(() => {

  }, [])

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/popular',
      params: { language: 'en-US', page: '3' },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTkwNjA5NGUyNTQxMzAwY2U2NTY5ZjZlYWI1YzI2MSIsInN1YiI6IjY1ZjBiY2I1MGRlYTZlMDE3Y2JjNGE1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FOZqC7Jm3by-ObIzGOsc9x-oXcoHgFqXCJ3bFoByTro'
      }
    };


    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [])

  let movieInfo = {
    movieTitle: "Hello world",
    movieDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce luctus id sapien vel dignissim. In convallis sit amet mauris et rutrum. Cras vitae leo erat. Nulla a varius quam, pretium finibus massa. Ut lacinia felis est, sed porta diam dapibus et. In hac habitasse platea dictumst. Duis laoreet nec est consectetur faucibus. Maecenas non blandit sapien. Nam quam tortor, finibus non aliquet sed, laoreet non diam. Donec condimentum felis lacus, interdum pharetra orci mollis vitae.",
    imdb: "7.5",
    duration: "2h 34min",
    releaseYear: "2024",
    rating: ["PG","HDR","UHD","U/A 13+"],
    genre: ["Comedy","Drama","International","Romance"],
    directors: ["Auguste Lumière", "Louis Lumière"],
    languages: ["Hindi","English"],
    awards: "Won 1 Golden Globe. Another 3 wins & 7 nominations.",
    cast: ["Jennifer Lawrence","Jennifer Lawrence","Jennifer Lawrence","Jennifer Lawrence"],
    writers:["George MacDonald Fraser (screenplay)", "Alexandre Dumas père (novel)"],
    countries: ["Spain", "USA", "Panama", "UK"],
    tomatometer: {
      viewer: 78,
      critic: 82
    },
    production: "Live Home Video",
    comments: [
      {
        name: 'abc',
        date: '12-3-24',
        image: 'https://source.unsplash.com/random',
        comment: "alskfjeiljafsefasdjf"
      },
      {
        name: 'John Doe',
        date: '13-3-24',
        image: 'https://source.unsplash.com/random',
        comment: "lorem ipsum"
      },
      {
        name: 'asdf',
        date: '13-3-24',
        image: 'https://source.unsplash.com/random',
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam finibus ipsum, nec posuere purus pulvinar fermentum. Morbi semper lacus mattis neque lobortis tincidunt non varius felis. Mauris mollis tortor non pretium condimentum. Nam aliquet blandit ultrices. Fusce vitae lorem eleifend, laoreet enim porta, mattis neque. Etiam pellentesque vel tellus."
      }
    ]
  }

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route index path="/" element={
          <>
            <Navbar />
            <div className='home'>
              <Carousel />
              {/* {
                [...Array(10)]
              } */}
              <MovieList movie={[{ title: "Wanda Vision", _id: "1" },{ title: "Wanda Vision", _id: "2" },{ title: "Wanda Vision", _id: "3" },{ title: "Wanda Vision", _id: "4" },{ title: "Wanda Vision", _id: "5" },{ title: "Wanda Vision", _id: "6" }]} />
              
              <HomeSliders />
            </div>
          </>
        } />
        <Route path="/search/:searchTerm" element={
          <>
          <Navbar />
          <div className='home'>
          <SearchPage />
          </div>
          </>
        } />
        <Route path='/pricing' element={
          <>
          <Navbar />
          <Pricing/>
          </>
           
        } />
        <Route path="/movie/:id" element={
              <>
                <Navbar />
                <MoviePage info={movieInfo}/>
                <MoreLikeThis />
              </>
        }/>
      </Routes>
    </BrowserRouter>
      
      
    </>
  )
}

export default App;
