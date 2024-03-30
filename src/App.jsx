import {useEffect, useState, useRef} from "react";
import "./App.css";
import MoreLikeThis from "./Components/moviePage/MoreLikeThis/MoreLikeThis.jsx";
import MoviePage from "./Components/moviePage/MoviePage.jsx";
import SearchPage from "./Components/SearchPage/SearchPage.jsx";
import CommentCards from "./Components/CommentCard/CommentCards.jsx";
// import Card from './Components/Card/Card.jsx'
// main.js or App.js
import MovieList from "./Components/movieList/MovieList";
import {Carousel} from "./Components/Carousel/Carousel";
import React from "react";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import {Movies} from "./Components/Movies.jsx";
import {Navbar} from "./Components/Navbar/Navbar.jsx";
import {MobileMenu} from "./Components/Navbar/MobileMenu.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Pricing from "./Components/Pricing/Pricing.jsx";
import {HomeSliders} from "./Components/HomeSliders/HomeSliders.jsx";
import instance from "./axios.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import LoginForm from "./Components/LoginForm/LoginForm.jsx";
import Profile from "./Components/profile/Profile.jsx";
import {useStateValue} from "./MyContexts/StateProvider.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import SignUp from "./Components/SignUp/SignUp.jsx";
import {Watchlists} from "./Components/Watchlists/Watchlists.jsx";
import useAlan from "./Components/Alan";
import BuyPremiumToWatch from "./Components/moviePage/BuyPremiumToWatch.jsx";
import SuccessPopup from "./Components/LoginAcceptedRejected/successfulLogin.jsx";
import RejectedPopup from "./Components/LoginAcceptedRejected/rejectedLogin.jsx";
import GenreModal from "./Components/GenreModal/GenreModal";
import LoginExpired from "./Components/LoginExpired/LoginExpired.jsx";

const App = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  //Alan AI
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleFoundGenre = foundGenre => {
    openModal(foundGenre);
  };

  useAlan(handleFoundGenre);

  const openModal = genre => {
    setSelectedGenre(genre);
  };

  const alanBtnContainer = useRef();
  //Alan AI end

  const [movies, setMovies] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showPopup3,setShowPopup3] = useState(false);

  const [{token}, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: "INITIALIZE_TOKEN",
    });
    if (token && token !== "null" && token !== "undefined") {
      const getUser = async () => {
        try {
          const user = await instance.get("/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch({
            type: "SET_USER",
            user: user.data,
          });
        } catch (err) {
          if (err.request.status === 401) {
            dispatch({
              type: "REMOVE_TOKEN",
            });
          }
          window.location.href = "/login-expired";
        }
      };
      getUser();
    }
  }, [token]);

  const [showLikePopup, setShowLikePopup] = useState(false);

  return (
    <>
      {showLikePopup && <RejectedPopup message="You can only like 10 movies" />}
      <BrowserRouter>
        <Routes>
          <Route
            index
            path="/"
            element={
              <>
                {showPopup && <SuccessPopup message="Logged in successfully" />}
                {showPopup3 && <RejectedPopup message="Something went wrong" />}
                <Navbar setShowLikePopup={setShowLikePopup} />
                <div className="homepage">
                  <Carousel />
                  <HomeSliders setShowPopup3={setShowPopup3} setShowLikePopup={setShowLikePopup}/>
                  <Footer setShowLikePopup={setShowLikePopup} setSelectedGenre={setSelectedGenre} />
                </div>
              </>
            }
            />
          <Route
            path="/search/:searchTerm"
            element={
              <>
                <Navbar setShowLikePopup={setShowLikePopup} />
                <SearchPage setShowLikePopup={setShowLikePopup} />
                <Footer setShowLikePopup={setShowLikePopup} />
              </>
            }
            />
          <Route path="/profile" element={
            <>
              {showPopup3 && <RejectedPopup message="Something went wrong" />}
              <Profile setShowPopup3={setShowPopup3}/>
            </>
          } />
          <Route
            path="/pricing"
            element={
              <>
                {showPopup2 && <RejectedPopup message="Premium access required for the movie" />}
                <Navbar setShowLikePopup={setShowLikePopup} />
                <div className="home">
                  <Pricing />
                  <Footer setShowLikePopup={setShowLikePopup} />
                </div>
              </>
            }
          />

          <Route
            path="/movie/:id"
            element={
              <>
                <Navbar setShowLikePopup={setShowLikePopup} />
                <MoviePage setShowLikePopup={setShowLikePopup} setShowPopup={setShowPopup2} />
                <Footer setShowLikePopup={setShowLikePopup} />
                {/* <MoreLikeThis /> */}
                {/* <SearchPage /> */}
              </>
            }
          />
          <Route
            path="/buyPremium"
            element={
              <>
                <Navbar setShowLikePopup={setShowLikePopup} />
                <BuyPremiumToWatch />
                <Footer setShowLikePopup={setShowLikePopup} />
                {/* <MoreLikeThis /> */}
                {/* <SearchPage /> */}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar setShowLikePopup={setShowLikePopup} />
                <LoginForm setShowPopup={setShowPopup} setShowPopup2={setShowPopup2} showPopup2={showPopup2} />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Navbar setShowLikePopup={setShowLikePopup} />
                <SignUp setShowPopup={setShowPopup} />
              </>
            }
          />
          <Route path="/watchlist/:id" element={token ? <Watchlists setShowLikePopup={setShowLikePopup} /> : <LoginForm />} />
          <Route
            path="/login-expired"
            element={
              <>
                <Navbar setShowLikePopup={setShowLikePopup} />
                <LoginExpired />
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {selectedGenre && <GenreModal genre={selectedGenre} onClose={() => setSelectedGenre(null)} />}
      </BrowserRouter>
      <div ref={alanBtnContainer} />
    </>
  );
};

export default App;
