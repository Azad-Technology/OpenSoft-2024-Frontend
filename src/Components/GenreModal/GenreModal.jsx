import React, {useEffect, useState, useCallback} from "react";
import styles from "./GenreModal.module.css";
import instance from "../../axios";
import MovieModalList from "./MovieModalList";
import Loader from "../Loader/Loader";
import {useRef} from "react";

function Modal({onClose, genre, id}) {
  const [movies, setMovies] = useState(null);
  const getData = useCallback(async () => {
    if (id === "country") {
      const response = await instance.get(`/countries_top/${genre}/?count=18`);
      setMovies(response.data);
      return;
    } else if (genre === "Top Movies" || genre === "Top IMDB") {
      const response = await instance.get("/top_movies/?count=18");
      setMovies(response.data);
      return;
    } else if (genre === "Top Series") {
      const response = await instance.get("/top_series/?count=18");
      setMovies(response.data);
      return;
    } else if (genre === "Recent") {
      const response = await instance.get("/recent_movies/?count=18");
      setMovies(response.data);
      return;
    } else if (genre === "TV Shows") {
      const response = await instance.get("/top_series/?count=18");
      setMovies(response.data);
      return;
    } else {
      const response = await instance.get(`/genre_top_movies/${genre}/?count=18`);
      setMovies(response.data);
    }
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);
    const modalRef = useRef(null);
    useEffect(()=>{
      if(modalRef.current){
        modalRef.current.addEventListener("click", (event)=>{
          if(event.target.id=="overlay" || event.target.id=="genre"){
            onClose();
          }
        })
      }
    }, [genre]);

  


  return (
    <div className={styles.modal_overlay} id="overlay" ref={modalRef}>
      <div className={styles.heading} id="genre">{genre}</div>
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

  return (
    <div>
      <Modal onClose={onClose} genre={genre} id={id} />
    </div>
  );
};

export default GenreModal;
