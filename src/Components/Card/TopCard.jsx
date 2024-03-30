import React, {useState, useEffect} from "react";
import styles from "./Card.module.css";
import {useNavigate} from "react-router-dom";
import instance from "../../axios.jsx";
import {useStateValue} from "../../MyContexts/StateProvider.jsx";

const TopCard = ({movies, val, length, setShowPopup3,setShowLikePopup}) => {
  const [{user, token}, dispatch] = useStateValue();

  const [premium, setPremium] = useState(movies?.imdb.rating >= 8.0);
  const [like, setlike] = useState(false);
  const [value, setvalue] = useState("-o");
  const openHeart = event => {
    if (!token) {
      navigate("/login");
    }

    if (like) {
      setlike(false);
    } else {
      if (user?.subtype === "Basic" && user.fav.length >= 10) {
        event.stopPropagation();
        setShowLikePopup(true);
        setTimeout(() => {
          setShowLikePopup(false);
        }, 2000);
        return;
      }
      setlike(true);
    }
    event.stopPropagation();
    addFavouriteRequest();
  };
  const handlehover = event => {
    const particularCard = document.getElementById(`${movies?._id}`);
    if (val === length - 1) {
      particularCard.style.transformOrigin = "right";
    } else {
      particularCard.style.transformOrigin = "left";
    }
  };

  const addFavouriteRequest = async e => {
    try {
      const response = await instance.patch(`/add_favourite/${movies?._id}`, null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!like) {
        dispatch({type: "ADD_FAV", movie: movies});
      } else {
        dispatch({type: "REM_FAV", movie: movies});
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setlike(user?.fav.some(movie => movie?._id === movies?._id));
  }, [movies, user]);

  const navigate = useNavigate();
  return (
    <div className={styles.contain}>
      <div className={styles.number}>
        <h2 className={styles.number__gradient}>{val + 1}</h2>
      </div>
      <div
        onClick={() => navigate(`/movie/${movies?._id}`)}
        className={`${styles.cards} ${!movies && styles.skeleton__cards}`}
        id={`${movies?._id}`}
        onMouseOver={handlehover}
      >
        {movies && (
          <div className={styles.cards__overlay}>
            <div className={styles.card__title}>{movies?.title}</div>
            <div className={styles.card__runtime}>
              {movies?.year}
              <span className={styles.card__rating}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 1536 1536">
                  <path
                    fill="#e8ff38"
                    d="M922 669v182q0 4 .5 15t0 15l-1.5 12l-3.5 11.5l-6.5 7.5l-11 5.5l-16 1.5V610q9 0 16 1t11 5t6.5 5.5t3.5 9.5t1 10.5zm316 96v121q0 1 .5 12.5t0 15.5t-2.5 11.5t-7.5 10.5t-13.5 3q-9 0-14-9q-4-10-4-165v-24.5l1.5-8.5l3.5-7l5-5.5l8-1.5q6 0 10 1.5t6.5 4.5t4 6t2 8.5t.5 8zM180 1001h122V529H180zm434 0h106V529H561l-28 221q-20-148-32-221H343v472h107V689l45 312h76l43-319zm425-305q0-67-5-90q-3-16-11-28.5t-17-20.5t-25-14t-26.5-8.5t-31-4t-29-1.5H762v472h56q169 1 197-24.5t25-180.5q-1-62-1-100m317 197V760q0-29-2-45t-9.5-33.5t-24.5-25t-46-7.5q-46 0-77 34V529h-117v472h110l7-30q30 36 77 36q50 0 66-30.5t16-83.5m180-733v1216q0 66-47 113t-113 47H160q-66 0-113-47T0 1376V160Q0 94 47 47T160 0h1216q66 0 113 47t47 113"
                  />
                </svg>
                {movies?.imdb.rating}
              </span>
            </div>
            <div className={styles.card__description}>{movies?.plot}</div>
          </div>
        )}
        <div>
          {movies && <div className={styles.icon}>
            {like ? (
              <i className={`fa fa-heart`} aria-hidden="true" onClick={openHeart} style={{color: "red"}}></i>
            ) : (
              <i className={`fa fa-heart-o`} aria-hidden="true" onClick={openHeart}></i>
            )}
          </div>}
          <div className={styles.premium}>
            {movies && premium && <i className={`fa fa-star`} aria-hidden="true"></i>}
          </div>
          {movies && <img
            src={
              movies && movies.poster_path ? `https://image.tmdb.org/t/p/w500${movies.poster_path}` : "/poster_1.jpg"
            }
            className={styles.cards_img}
            alt="Image Not Found"
          />}
        </div>
      </div>
    </div>
  );
};

export default TopCard;
