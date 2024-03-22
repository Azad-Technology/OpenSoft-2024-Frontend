import React, { useState, useEffect } from 'react'
import instance from '../../axios';
import Watchlist from './Watchlist';
import { useParams } from 'react-router';
import { useStateValue } from '../../MyContexts/StateProvider';

export const Watchlists = () => {
    const [movies, setMovies] = useState(null);
    const [token, dispatch] = useStateValue();
    const {id} = useParams();
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
        {movies ? <Watchlist movies={movies} id={movies._id} name="My WatchList #1" /> : <h1>Loading...</h1>}
    </>
  )
}
