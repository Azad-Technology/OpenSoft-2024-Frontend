import React, { useEffect } from 'react'
import instance from '../../axios';
import Watchlist from './Watchlist';

export const Watchlists = () => {
    const [movies, setMovies] = useState(null);
    useEffect(async () => {
        const response = await instance.get('/recent_movies');
        console.log(response.data);
        setMovies(response.data);
    }, []);
  return (
    <>
        {movies ? <Watchlist movies={movies} /> : <h1>Loading...</h1>}
    </>
  )
}
