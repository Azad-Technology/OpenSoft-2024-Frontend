import React, {useEffect, useState} from "react";
import styles from "./GenreModal.module.css";
import instance from "../../axios";
import MovieModalList from "./MovieModalList";
import Loader from "../Loader/Loader";
import {useRef} from "react";

function Modal({onClose, genre, id}) {
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    const getData = async () => {
      if (id === "country") return;
      if (genre === "Top Movies" || genre === "Top IMDB") {
        const response = await instance.get("/top_movies/?count=18");
        setMovies(response.data);
        return;
      }
      if (genre === "Top Series") {
        const response = await instance.get("/top_series/?count=18");
        setMovies(response.data);
        return;
      }
      if (genre === "Recent") {
        const response = await instance.get("/recent_movies/?count=18");
        setMovies(response.data);
        return;
      }
      if (genre === "TV Shows") {
        const response = await instance.get("/top_series/?count=18");
        setMovies(response.data);
        return;
      }
      const response = await instance.get(`/genre_top_movies/${genre}/?count=18`);
      setMovies(response.data);
    };
    getData();
  }, [genre]);

  useEffect(() => {
    const getData = async () => {
      if (id === "country") {
        const response = await instance.get(`/countries_top/${genre}/?count=18`);
        setMovies(response.data);
        return;
      }
    };
    getData();
  }, []);

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.heading}>{genre}</div>
      <div className={styles.modal}>
        <div className={styles.movieList}>
          {movies ? <MovieModalList movie={movies} onClose={onClose} /> : <Loader />}
          {/* {!movies && <MovieList movie={Array(18).fill(null)} />} */}
        </div>
      </div>
      <button className={styles.close_button} onClick={onClose}>
        X
      </button>
    </div>
  );
}

const GenreModal = ({genre, id, onClose}) => {
  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [genre]);

  const modalRef = useRef();
  return (
    <div ref={modalRef}>
      <Modal onClose={onClose} genre={genre} id={id} />
    </div>
  );
};

export default GenreModal;
