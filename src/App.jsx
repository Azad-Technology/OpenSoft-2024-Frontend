import { useEffect, useState } from 'react'
import './App.css'
import MoreLikeThis from './Components/moviePage/MoreLikeThis/MoreLikeThis.jsx'
import MoviePage from './Components/moviePage/MoviePage.jsx'
import SearchPage from './Components/SearchPage/SearchPage.jsx'
// import Card from './Components/Card/Card.jsx'
// main.js or App.js
import MovieList from './Components/movieList/MovieList'
import Player from './Components/MoviePlayback/Player'
import { Carousel } from './Components/Carousel/Carousel'
import React from 'react'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css';
import { Movies } from './Components/Movies.jsx';
import { Navbar } from './Components/Navbar/Navbar.jsx';
import { MobileMenu } from './Components/Navbar/MobileMenu.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Pricing from './Components/Pricing/Pricing.jsx'
import { HomeSliders } from './Components/HomeSliders/HomeSliders.jsx';
import instance from './axios.jsx'
import LoginForm from './Components/LoginForm/LoginForm.jsx'
import Profile from './Components/profile/Profile.jsx'
import { useStateValue} from './MyContexts/StateProvider.jsx';

const App = () => {

  const [movies, setMovies] = useState([]);

  const [{token},dispatch]=useStateValue();

  useEffect(() => {
    dispatch({
      type: 'INITIALIZE_TOKEN'
    })
  }, [token])

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
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={
            <>
              <Navbar />
              <div className='home'>
                <Carousel />
                <HomeSliders />
              </div>
            </>
          } />
          <Route path="/search/:searchTerm" element={
            <>
              <Navbar />
              <SearchPage />
            </>
          } />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/movieplay" element={
            <>
              <Player />
            </>
          } />
          <Route path='/pricing' element={
            <>
              <Navbar />
              <Pricing />
            </>

          } />
          
          <Route path="/movie/:id" element={
            <>
              <MoviePage />
              {/* <MoreLikeThis /> */}
              {/* <SearchPage /> */}
            </>
          } />
          <Route path='/login' element={
            <>
              <Navbar />
              <LoginForm />
            </>
          }/>
          <Route path='/register' element={
            <>
              <Navbar />
              <LoginForm register="register"/>
            </>
          }/>
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
