import React, {useEffect, useState, useCallback} from "react";
import styles from "./GenreModal.module.css";
import instance from "../../axios";
import MovieModalList from "./MovieModalList";
import Loader from "../Loader/Loader";

function Modal({onClose, genre}) {
  const [movies, setMovies] = useState(null);
  const getData = useCallback(async () => {
    const response = await instance.get(`/countries_top/${genre}/?count=18`);
    setMovies(response.data);
  }, [genre]);
  useEffect(() => {
    getData();
  }, [getData]);

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

const GenreModalCountry = ({genre, onClose}) => {
  return (
    <>
      <Modal onClose={onClose} genre={genre} />
    </>
  );
};

export default GenreModalCountry;
