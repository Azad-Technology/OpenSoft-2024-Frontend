import { useEffect, useState, useRef } from 'react'
import './App.css'
import MoreLikeThis from './Components/moviePage/MoreLikeThis/MoreLikeThis.jsx'
import MoviePage from './Components/moviePage/MoviePage.jsx'
import SearchPage from './Components/SearchPage/SearchPage.jsx'
import CommentCards from './Components/CommentCard/CommentCards.jsx';
// import Card from './Components/Card/Card.jsx'
// main.js or App.js
import MovieList from './Components/movieList/MovieList'
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
import NotFound from './Components/NotFound/NotFound.jsx'
import LoginForm from './Components/LoginForm/LoginForm.jsx'
import Profile from './Components/profile/Profile.jsx'
import { useStateValue } from './MyContexts/StateProvider.jsx';
import Footer from './Components/Footer/Footer.jsx'
import  SignUp from "./Components/SignUp/SignUp.jsx"
import { Watchlists } from './Components/Watchlists/Watchlists.jsx'
import useAlan from './Components/Alan'
import BuyPremiumToWatch from './Components/moviePage/BuyPremiumToWatch.jsx'

const App = () => {

  useEffect(() => {
    window.scroll(0, 0);
  }, [])

  useAlan();
  const alanBtnContainer = useRef();
  const [movies, setMovies] = useState([]);

  const [{ token }, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: 'INITIALIZE_TOKEN'
    })
    if(token && token !== 'null' && token !== 'undefined'){
      const getUser=async()=>{
        try{
          const user=await instance.get('/user',{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
          // console.log(user.data);
          dispatch({
            type: 'SET_USER',
            user: user.data
          })
        }catch(err){
          console.log(err)
        }
      }
      getUser();
    }
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
        // console.log(response.data);
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
              <div className='homepage'>
                <Carousel />
                <HomeSliders />
                <Footer />
              </div>

            </>
          } />
          <Route path="/search/:searchTerm" element={
            <>
              <Navbar />
              <SearchPage />
              <Footer />
            </>
          } />
          <Route path="/profile" element={<Profile />} />
          <Route path='/pricing' element={
            <>
              <Navbar />
              <div className='home'>
                <Pricing />
                <Footer />
              </div>
            </>

          } />

          <Route path="/movie/:id" element={
            <>
              <Navbar />
              <MoviePage />
              <Footer />
              {/* <MoreLikeThis /> */}
              {/* <SearchPage /> */}
            </>
          } />
          <Route path="/buyPremium" element={
            <>
              <Navbar />
              <BuyPremiumToWatch />
              <Footer />
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
          <Route path='/signup' element={
            <>
              <Navbar />
              <SignUp />
            </>
          }/>
        <Route path='/watchlist/:id' element={
          <Watchlists />
        }/>
        <Route path="*" element={
          <NotFound/>
        }/>
        
        </Routes>
      </BrowserRouter>
      <div ref={alanBtnContainer} />
    </>
  );
}

export default App;
