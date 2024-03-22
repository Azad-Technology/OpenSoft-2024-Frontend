import React, { useEffect, useState } from 'react';
import styles from './GenreModal.module.css';
import instance from '../../axios';
import MovieModalList from './MovieModalList';

function Modal({ onClose, genre, id }) {
    const [movies, setMovies] = useState(null)

    useEffect(() => {
        const getData = async () => {
            if (genre === "More Like This") {
                const response = await instance.get('/movies/' + id + '/related_movies/?count=18')
                setMovies(response.data);
                return;
            }
            if (genre === "Top Movies") {
                const response = await instance.get('/top_movies/?count=18');
                console.log(response.data);
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
                    {movies ? <MovieModalList movie={movies} /> : <h1>Loading...</h1>}
                    {/* {!movies && <MovieList movie={Array(18).fill(null)} />} */}
                </div>
            </div>
            <button className={styles.close_button} onClick={onClose}>X</button>
        </div>
    );
}

const GenreModal = ({ genre, onClose }) => {
    return (
        <>
            <Modal onClose={onClose} genre={genre} />
        </>
    )
}

export default GenreModal;
