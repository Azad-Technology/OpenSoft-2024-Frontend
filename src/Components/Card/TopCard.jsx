import React, { useState } from 'react'
import styles from "./Card.module.css";
import { useNavigate } from "react-router-dom";

const TopCard = ({ movies, val, length }) => {

    const [like, setlike] = useState(false);
    const [value, setvalue] = useState("-o");
    const openHeart = (event) => {
        event.stopPropagation();
        if (value === "" && like) {
            setvalue("-o"); setlike(false);
        } else {
            setvalue(""); setlike(true);
        }
    };
    const handlehover = (event) => {
        console.log(movies)
        const particularCard = document.getElementById(`${movies._id}`);
        if (val === length - 1) {
            particularCard.style.transformOrigin = "right";
        }
        else {
            particularCard.style.transformOrigin = "left";
        }
    }
    const navigate = useNavigate();
    return (
        <div className={styles.contain}>
            <div className={styles.number}>
                <h2>{val + 1}</h2>
            </div>
            <div onClick={() => navigate(`/movie/${movies?._id}`)} className={`${styles.cards} ${styles.skeleton__cards}`} id={`${movies?._id}`} onMouseOver={handlehover}>
                <div className={styles.cards__overlay}>
                    <div className={styles.card__title}>{movies?.title}</div>
                    <div className={styles.card__runtime}>
                        {movies?.year}
                        <span className={styles.card__rating}>{movies?.imdb.rating}</span>
                    </div>
                    <div className={styles.card__description}>{movies?.plot}</div>
                </div>
                <div>
                    <div className={styles.icon}>
                        <i
                            class={`fa fa-heart${value}`}
                            aria-hidden="true"
                            onClick={openHeart}
                            style={{ color: like ? "red" : "white" }}
                        ></i>
                    </div>
                    <img
                        src={`https://image.tmdb.org/t/p/w1280${movies?.poster_path}`}
                        className={styles.cards_img}
                        alt="Image Not Found"
                    />
                </div>
            </div>
        </div>
    )
}

export default TopCard