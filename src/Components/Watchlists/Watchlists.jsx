import React, { useState, useEffect } from 'react'
import instance from '../../axios';
import Watchlist from './Watchlist';

export const Watchlists = () => {
    const [movies, setMovies] = useState(null);
    useEffect(() => {
        try {
            const getWatchlist = async () => {
                const res = await instance.get('/recent_movies');
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
        {movies ? <Watchlist movies={movies} /> : <h1>Loading...</h1>}
    </>
  )
}
