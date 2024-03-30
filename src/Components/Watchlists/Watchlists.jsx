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
    try {
      const getWatchlist = async () => {
        const res = await instance.get("/watchlist/" + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovies(res.data);
      };
      getWatchlist();
    } catch (error) {
      // console.log(error);
    }
  }, []);
  return <>{movies ? <Watchlist setShowLikePopup={setShowLikePopup} movies={movies.movies} id={movies._id} name={movies.name} /> : <Loader />}</>;
};
