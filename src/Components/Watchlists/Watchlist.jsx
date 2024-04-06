import React, {useState} from "react";
import styles from "./Watchlist.module.css";
import Card from "../Card/Card.jsx";
import stockIcon from "../../assets/stock_movie_icon.jpg";
import {useStateValue} from "../../MyContexts/StateProvider.jsx";
import {useNavigate} from "react-router";
import MovieModalList from "../GenreModal/MovieModalList.jsx";
import deleteIcon from "../../assets/Delete_Icon.svg";
import deleteIconWhite from "../../assets/Delete_Icon_White.svg";
import instance from "../../axios.jsx";

const Watchlist = ({movies, name, id, setShowLikePopup}) => {
  const [{token, user}, dispatch] = useStateValue();
  const navigate = useNavigate();
  const handleDelete = () => {
    dispatch({
      type: "REMOVE_WATCHLIST",
      watchlistID: id,
    });
    navigate("/profile");
  };

  const deleteMovie = movieID => {
    dispatch({
      type: "REMOVE_MOVIE_FROM_WATCHLIST",
      movieID: movieID,
      watchlistID: id,
    });
  };

  return (
    <div className={styles.watchlist_container}>
      <div className={styles.background_grad}></div>
      <div className={styles.back_button_container}>
        <button className={styles.back_button} onClick={() => navigate("/profile")}>
          &larr; Back
        </button>
      </div>
      <div className={styles.watchlist_titlecontainer}>
        <img src={stockIcon} alt="stock icon" className={styles.watchlist_icon} />
        <div className={styles.titles}>
          <div className={styles.watchlist_details}>
            <p>Watchlist</p>
            <h2 className={styles.titleofwatchlist}>{name}</h2>
            <span>
              <strong>{user?.name}</strong> {movies?.length} Movies{" "}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.delete_button_container}>
        <button className={styles.delete_button} onClick={handleDelete}>
          <img src={deleteIcon} alt="delete icon" />
          Delete
        </button>
      </div>
      <div className={styles.movie_grid}>
        <div className={styles.movieList}>
          {movies?.map((m, i) => {
            return (
              <div className={styles.cardcontainer}>
                <Card setShowLikePopup={setShowLikePopup} movies={m} />
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
