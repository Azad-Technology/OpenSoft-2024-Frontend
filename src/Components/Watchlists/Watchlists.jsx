import React, {useState, useEffect} from "react";
import instance from "../../axios";
import Watchlist from "./Watchlist";
import {useParams} from "react-router";
import {useStateValue} from "../../MyContexts/StateProvider";
import Loader from "../Loader/Loader";

export const Watchlists = ({setShowLikePopup}) => {
  const [movies, setMovies] = useState(null);
  const [{token, user}, dispatch] = useStateValue();
  if (token === null || token === "null" || token === "undefined" || token === "" || !token) {
    window.location.href = "/login";
  }
  const {id} = useParams();
  useEffect(() => {
    user.watchlist?.map((watchlist) => {
      if (watchlist?._id === id) {
        setMovies(watchlist);
      }
    });
  }, []);
  return <>{movies ? <Watchlist setShowLikePopup={setShowLikePopup} movies={movies.movies} id={movies._id} name={movies.name} /> : <Loader />}</>;
};
