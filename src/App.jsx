import { useEffect, useState } from 'react'
import './App.css'
import MoreLikeThis from './components/MoreLikeThis/MoreLikeThis'
import MoviePage from './components/moviePage/MoviePage'
import SearchPage from './components/SearchPage/SearchPage'
import Card from './Components/Card/Card'
import MovieList from './Components/movieList/MovieList'

import { Carousel } from './Components/Carousel/Carousel'
import React from 'react'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css';
import { Movies } from './Components/Movies.jsx';
import { Navbar } from './Components/Navbar/Navbar.jsx';
import { MobileMenu } from './Components/Navbar/MobileMenu.jsx';
import SearchPage from './Components/SearchPage/SearchPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  const [movies, setMovies] = useState([]);
  const [showhamurgerMenu, setShowHamburgerMenu] = useState(false);

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


  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={
          <>
            <Navbar />
            <div className='home'>
              <Carousel />
              <MovieList movie={[{ title: "Wanda Vision", _id: "012" }]} />
            </div>
          </>
        } />
        <Route path="/search/:searchTerm" element={
          <SearchPage />
        } />
        <Route path="/movie/:id" element={
              <>
                <MoviePage />
                <MoreLikeThis />
                {/* <SearchPage /> */}
              </>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
