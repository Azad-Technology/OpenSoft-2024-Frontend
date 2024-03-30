import React, {useState} from "react";
import {useStateValue} from "../../MyContexts/StateProvider";
import styles from "./HomeSliders.module.css";
import {Slider} from "./Slider.jsx";
import CommentCards from "../CommentCard/CommentCards.jsx";
import GenreModal from "../GenreModal/GenreModal";

export const HomeSliders = ({setShowPopup3,setShowLikePopup}) => {
  const [{token}, dispatch] = useStateValue();
  const [selectedGenre, setSelectedGenre] = useState(null);

  const openModal = genre => {
    setSelectedGenre(genre);
  };

  const genres = [
    {
      name: "Top Series",
      link: "#",
      genreID: "topseries",
    },
    {
      name: "Romance",
      link: "#",
      genreID: "romance",
    },
    {
      name: "Action",
      link: "#",
      genreID: "action",
    },
    {
      name: "Comedy",
      link: "#",
      genreID: "comedy",
    },
    {
      name: "Horror",
      link: "#",
      genreID: "horror",
    },
    {
      name: "Thriller",
      link: "#",
      genreID: "thriller",
    },
    {
      name: "Sci-Fi",
      link: "#",
      genreID: "scifi",
    },
    {
      name: "Drama",
      link: "#",
      genreID: "drama",
    },
    {
      name: "Mystery",
      link: "#",
      genreID: "mystery",
    },
    {
      name: "Crime",
      link: "#",
      genreID: "crime",
    },
    {
      name: "Animation",
      link: "#",
      genreID: "animation",
    },
    {
      name: "Adventure",
      link: "#",
      genreID: "adventure",
    },
    {
      name: "Fantasy",
      link: "#",
      genreID: "fantasy",
    },
    {
      name: "Family",
      link: "#",
      genreID: "family",
    },
  ];

  return (
    <div className={styles.sliders}>
      {token && token !== "null" && token !== undefined && token !== "undefined" && token !== "" && (
        <div className={styles.slider_container}>
          <div className={styles.slider__header}>
            <div className={styles.slider__title}>Handpicked for You</div>
          </div>
          <Slider setShowPopup3={setShowPopup3} setShowLikePopup={setShowLikePopup} genre="Handpicked" />
        </div>
      )}
      <div className={styles.slider_container}>
        <div className={styles.slider__header}>
          <div className={styles.slider__title}>Regional Hits</div>
          <button className={styles.view__more} onClick={() => openModal("Regional Hits")}>
            {" "}
            View More{" "}
          </button>
        </div>
        <Slider setShowPopup3={setShowPopup3} setShowLikePopup={setShowLikePopup} genre="Regional Hits" />
      </div>
      <div id="popular" className={styles.slider_container}>
        <div className={styles.slider__header}>
          <div className={styles.slider__title}>Top Movies</div>
          <button className={styles.view__more} onClick={() => openModal("Top Movies")}>
            {" "}
            View More{" "}
          </button>
        </div>
        <Slider setShowPopup3={setShowPopup3} setShowLikePopup={setShowLikePopup} genre="Top Movies" />
      </div>
      <div id="recent" className={styles.slider_container}>
        <div className={styles.slider__header}>
          <div className={styles.slider__title}>Latest</div>
          <button className={styles.view__more} onClick={() => openModal("Recent")}>
            {" "}
            View More{" "}
          </button>
        </div>
        <Slider setShowPopup3={setShowPopup3} setShowLikePopup={setShowLikePopup} genre="Recent" />
      </div>
      <div className={styles.slider__title}>Comments</div>
      <div className={styles.commentCardParent}>
        <CommentCards />
      </div>
      {genres.map(genre => {
        return (
          <div id={genre.genreID} className={styles.slider_container}>
            <div className={styles.slider__header}>
              <div className={styles.slider__title}>{genre.name}</div>
              <button className={styles.view__more} onClick={() => openModal(genre.name)}>
                {" "}
                View More{" "}
              </button>
            </div>
            <Slider setShowPopup3={setShowPopup3} setShowLikePopup={setShowLikePopup} genre={genre.name} />
          </div>
        );
      })}
      {selectedGenre && <GenreModal setShowLikePopup={setShowLikePopup} genre={selectedGenre} onClose={() => setSelectedGenre(null)} />}
    </div>
  );
};
