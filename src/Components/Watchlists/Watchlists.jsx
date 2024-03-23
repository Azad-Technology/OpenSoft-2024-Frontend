import React, { useState, useEffect } from 'react'
import instance from '../../axios';
import Watchlist from './Watchlist';
import { useParams } from 'react-router';
import { useStateValue } from '../../MyContexts/StateProvider';

export const Watchlists = () => {
    const [movies, setMovies] = useState(null);
    const [{token, user}, dispatch] = useStateValue();
    if(token === null || token === 'null' || token === 'undefined' || token === ''){
        window.location.href = '/login';
    }
    const {id} = useParams();
    useEffect(() => {
        try {
            const getWatchlist = async () => {
                console.log(token);
                const res = await instance.get('/watchlist/' + id, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
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
        {movies ? <Watchlist movies={movies.movies} id={movies._id} name={movies.name} /> : <h1>Loading...</h1>}
    </>
  )
}
