import React, { useEffect, useState } from 'react';
import styles from './GenreModal.module.css';
import instance from '../../axios';
import MovieModalList from './MovieModalList';
import Loader from '../Loader/Loader';

function Modal({ onClose, genre, id}) {
    const [movies, setMovies] = useState(null)
    useEffect(() => {
        const getData = async () => {
            if (genre === "More Like This") {
                const response = await instance.get('/movies/' + id + '/related_movies/?count=18')
                setMovies(response.data);
                return;
            }
            if (genre === "Top Movies" || genre === "Top IMDB") {
                const response = await instance.get('/top_movies/?count=18');
                setMovies(response.data);
                return;
            }
            if (genre === "Top Series") {
                const response = await instance.get('/top_series/?count=18');
                setMovies(response.data);
                return;
            }
            if (genre === "Recent") {
                const response = await instance.get('/recent_movies/?count=18');
                setMovies(response.data);
                return;
            }
            if (genre === "TV Shows") {
                const response = await instance.get('/top_series/?count=18');
                setMovies(response.data);
                return;
            }
            if(id==="country"){
                const response = await instance.get(`/countries_top/${genre}/?count=18`)
                setMovies(response.data);
                return;
            }
            const response = await instance.get(`/genre_top_movies/${genre}/?count=18`);
            setMovies(response.data);
        }
        getData();
    }, [genre, id])

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.heading}>{genre}</div>
            <div className={styles.modal}>
                <div className={styles.movieList}>
                    {movies ? <MovieModalList movie={movies} onClose={onClose}/> : <h1>Loading...</h1>}
                    {/* {!movies && <MovieList movie={Array(18).fill(null)} />} */}
                </div>
            </div>
            <button className={styles.close_button} onClick={onClose}>X</button>
        </div>
    );
}

const GenreModal = ({ genre,id, onClose }) => {
    return (
        <>
            <Modal onClose={onClose} genre={genre} id={id} />
        </>
    )
}

export default GenreModal;
