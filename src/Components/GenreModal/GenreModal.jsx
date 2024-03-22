import React, { useState, useEffect } from 'react'
import { useStateValue } from "../../MyContexts/StateProvider";
import instance from '../../axios';
import styles from './GenreModal.module.css';
import Watchlist from '../Watchlists/Watchlist';
import MovieList from '../movieList/MovieList';


function Modal({ onClose, movies }) {
    return (
        <div className={styles.modal_overlay}>
            <div className={styles.heading}> Action </div>
            <div className={styles.modal}>
                <div>        
                    {movies ? <MovieList movie={movies} /> : <h1>Loading...</h1>}
                </div>
            </div>
            <button className={styles.close_button} onClick={onClose}>X</button>
        </div>
    );
}

const GenreModal = () => {
    const [{ token }, dispatch] = useStateValue();
    const [showModal, setShowModal] = useState(false);
    const [movies, setMovies] = useState(null);
    const handleClick = () => {
        if (token && token != 'null' && token !== undefined && token != 'undefined' && token != '') {
            setShowModal(true);
        }
        else {
            navigate('/login');
        }
    }
    useEffect(() => {
        try {
            const getWatchlist = async () => {
                const res = await instance.get('/genre/Action');
                console.log(res.data);
                setMovies(res.data);
            }
            getWatchlist();
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <>
            <div>
                <button className={styles.modalbutton} onClick={handleClick}>
                    Watch Now
                </button>
                {showModal && <Modal onClose={() => setShowModal(false)} movies={movies} />}
            </div>
        </>
    )
}

export default GenreModal;