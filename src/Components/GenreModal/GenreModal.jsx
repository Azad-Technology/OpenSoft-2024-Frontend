import React, {useEffect, useState, useCallback} from "react";
import styles from "./GenreModal.module.css";
import instance from "../../axios";
import MovieModalList from "./MovieModalList";
import Loader from "../Loader/Loader";
import {useRef} from "react";
import closeIcon from "../../assets/close-47.svg";

function Modal({onClose, genre, id, setShowLikePopup}) {
  const [movies, setMovies] = useState(null);
  const getData = useCallback(async () => {
    if (id === "country") {
      const response = await instance.get(`/countries_top/${genre}?count=18`);
      setMovies(response.data);
      return;
    } else if (genre === "Handpicked") {
      const response = await instance.request("/recommend", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMovies(response.data);
      return;
    } else if (genre === "Regional Hits") {
      const response = await instance.get(`my_country?count=18`);
      setMovies(response.data);

      return;
    } else if (genre === "Top Movies" || genre === "Top IMDB") {
      const response = await instance.get("/top_movies?count=18");
      setMovies(response.data);
      return;
    } else if (genre === "Top Series") {
      const response = await instance.get("/top_series?count=18");
      setMovies(response.data);
      return;
    } else if (genre === "Recent") {
      const response = await instance.get("/recent_movies?count=18");
      setMovies(response.data);
      return;
    } else if (genre === "TV Shows") {
      const response = await instance.get("/top_series?count=18");
      setMovies(response.data);
      return;
    } else {
      const response = await instance.get(`/genre_top_movies/${genre}?count=18`);
      setMovies(response.data);
    }
  }, []);
  useEffect(() => {
    getData();
  }, []);
  const modalRef = useRef(null);
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.addEventListener("click", event => {
        if (event.target.id == "overlay" || event.target.id == "genre") {
          onClose();
        }
      });
    }
  }, [genre]);

  return (
    <div className={styles.modal_overlay} id="overlay" ref={modalRef}>
      <div className={styles.heading} id="genre">
        {genre}
      </div>
      <div className={styles.modal}>
        <div className={styles.movieList}>
          {movies ? (
            <MovieModalList setShowLikePopup={setShowLikePopup} movie={movies} onClose={onClose} />
          ) : (
            <MovieModalList movie={Array(18).fill(null)} />
          )}
          {/* {!movies && <MovieList movie={Array(18).fill(null)} />} */}
        </div>
      </div>
      <button className={styles.close_button} onClick={onClose}>
        <img src={closeIcon} alt="Close" />
      </button>
    </div>
  );
}

const GenreModal = ({genre, id, onClose,setShowLikePopup}) => {
  return (
    <div>
      <Modal setShowLikePopup={setShowLikePopup} onClose={onClose} genre={genre} id={id} />
    </div>
  );
};

export default GenreModal;
