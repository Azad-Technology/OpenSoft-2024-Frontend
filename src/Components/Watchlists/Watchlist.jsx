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
  const handleDelete = async () => {
    try {
      let config = {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await instance.request(`/remove_watchlist/${id}`, config);
      dispatch({
        type: "REMOVE_WATCHLIST",
        watchlistID: id,
      });
      navigate("/profile");
    } catch (err) {
      // console.log(err);
    }
  };

  const deleteMovie = async movieID => {
    try {
      let config = {
        method: "patch",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await instance.request(`/add_movie_to_watchlist/${id}/${movieID}`, config);
      dispatch({
        type: "REMOVE_MOVIE_FROM_WATCHLIST",
        movieID: movieID,
        watchlistID: id,
      });
      window.location.reload();
    } catch (err) {
      // console.log(err);
    }
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
          {movies.map((m, i) => {
            return (
              <div className={styles.cardcontainer}>
                <Card setShowLikePopup={setShowLikePopup} movies={m} />
                <img
                  src={deleteIconWhite}
                  className={styles.deleteimage}
                  height={30}
                  width={30}
                  onClick={() => deleteMovie(m._id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
