import React, { useState } from "react";
import { useStateValue } from "../../MyContexts/StateProvider";
import styles from "./HomeSliders.module.css";
import { Slider } from "./Slider.jsx";
import CommentCards from "../CommentCard/CommentCards.jsx";
import GenreModal from "../GenreModal/GenreModal";
import useAlan from '../Alan';

export const HomeSliders = () => {
  const [{ token }, dispatch] = useStateValue();
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleFoundGenre = (foundGenre) => {
    // window.location.href = '/';
    openModal(foundGenre); // Trigger the openModal function with the foundGenre.name
  };

  useAlan(handleFoundGenre);

  const openModal = (genre) => {
      setSelectedGenre(genre);
  }

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
    {
      name: "Biography",
      link: "#",
      genreID: "biography",
    },
    {
      name: "History",
      link: "#",
      genreID: "history",
    },
    {
      name: "War",
      link: "#",
      genreID: "war",
    },
    {
      name: "Documentary",
      link: "#",
      genreID: "documentary",
    },
    {
      name: "Music",
      link: "#",
      genreID: "music",
    },
    {
      name: "Sport",
      link: "#",
      genreID: "sport",
    },
    {
      name: "Western",
      link: "#",
      genreID: "western",
    },
    {
      name: "Short",
      link: "#",
      genreID: "short",
    },
    {
      name: "Film-Noir",
      link: "#",
      genreID: "filmnoir",
    },
    {
      name: "Talk-Show",
      link: "#",
      genreID: "talkshow",
    },
    {
      name: "News",
      link: "#",
      genreID: "news",
    },
  ];

  return (
    <div className={styles.sliders}>
      <div id="popular" className={styles.slider_container}>
        <div className={styles.slider__header}>
          <div className={styles.slider__title}>Top Movies</div>
          <button className={styles.view__more} onClick={() => openModal("Top Movies")}> View More </button>
        </div>
        <Slider genre="Top Movies" />
      </div>
      <div id="recent" className={styles.slider_container}>
        <div className={styles.slider__header}>
          <div className={styles.slider__title}>Latest</div>
          <button className={styles.view__more} onClick={() => openModal("Recent")}> View More </button>
        </div>
        <Slider genre="Recent" />
      </div>
      <>
        <div className={styles.slider__title}>Comments</div>
        <CommentCards />
      </>
      {genres.map((genre) => {
        return (
          <div id={genre.genreID} className={styles.slider_container}>
            <div className={styles.slider__header}>
              <div className={styles.slider__title}>{genre.name}</div>
              <button className={styles.view__more} onClick={() => openModal(genre.name)}> View More </button>
            </div>
            <Slider genre={genre.name} />
          </div>
        )
      })}
      {selectedGenre &&
        <GenreModal genre={selectedGenre} onClose={() => setSelectedGenre(null)} />
      }
    </div>
  );
};
