import React, {useEffect, useState, useCallback} from "react";
import "./Carousel.css";
import {movies} from "./data";
import {useNavigate} from "react-router";

export const Carousel = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const navigate = useNavigate();
  const slideRight = () => {
    setCurrIndex((currIndex + 1) % movies.length);
  };
  const handleClick = index => {
    setCurrIndex(index);
  };

  const handleImageClick = index => {
    if (window.innerWidth < 1024) {
      navigate("movie/" + movies[currIndex].id);
    }
  };

  useEffect(() => {
    const interval = setInterval(slideRight, 3000);
    return () => clearInterval(interval);
  }, [currIndex]);

  return (
    <div className="carousel">
      <div className="carousel__container" style={{"--index": currIndex}}>
        {movies.map((movie, index) => {
          return (
            <div className="carousel__slide" key={index} onClick={handleImageClick}>
              <div className="overlay"></div>
              <div className="overlay--down"></div>
              <img src={movie.backdrop} alt="Movie" />
              <div className="carousel__content">
                <h1 className="carousel__title">{movie.title}</h1>
                <div className="carousel__specifics">
                  <p>{movie.date} &nbsp;</p>
                  <p>&nbsp; </p>
                  <div className="carousel__rating">
                    <p>{movie.imdb}</p>
                  </div>
                  <p>&nbsp; </p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 1536 1536">
                    <path
                      fill="#e8ff38"
                      d="M922 669v182q0 4 .5 15t0 15l-1.5 12l-3.5 11.5l-6.5 7.5l-11 5.5l-16 1.5V610q9 0 16 1t11 5t6.5 5.5t3.5 9.5t1 10.5zm316 96v121q0 1 .5 12.5t0 15.5t-2.5 11.5t-7.5 10.5t-13.5 3q-9 0-14-9q-4-10-4-165v-24.5l1.5-8.5l3.5-7l5-5.5l8-1.5q6 0 10 1.5t6.5 4.5t4 6t2 8.5t.5 8zM180 1001h122V529H180zm434 0h106V529H561l-28 221q-20-148-32-221H343v472h107V689l45 312h76l43-319zm425-305q0-67-5-90q-3-16-11-28.5t-17-20.5t-25-14t-26.5-8.5t-31-4t-29-1.5H762v472h56q169 1 197-24.5t25-180.5q-1-62-1-100m317 197V760q0-29-2-45t-9.5-33.5t-24.5-25t-46-7.5q-46 0-77 34V529h-117v472h110l7-30q30 36 77 36q50 0 66-30.5t16-83.5m180-733v1216q0 66-47 113t-113 47H160q-66 0-113-47T0 1376V160Q0 94 47 47T160 0h1216q66 0 113 47t47 113"
                    />
                  </svg>
                  <p>&nbsp; </p>
                  <p>&nbsp; </p>
                  {movie.genre.map(g => {
                    return <p key={g}>{g} &nbsp;</p>;
                  })}
                </div>
                <div className="carousel__description">{movie.description}</div>
                <button className="carousel__button" onClick={() => navigate("movie/" + movie.id)}>
                  Watch Now!
                </button>
              </div>
            </div>
          );
        })}
        <div className="carousel__sideslide">
          {movies.map((movie, index) => {
            return (
              <img
                className={`carousel__sideslide-image ${index === currIndex ? "active" : ""}`}
                src={movie.poster}
                alt={movie.title}
                key={index}
                onClick={() => handleClick(index)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
