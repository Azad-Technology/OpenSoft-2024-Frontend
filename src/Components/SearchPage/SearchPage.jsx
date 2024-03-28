import React, {useState, useEffect, useCallback} from "react";
import CustomDropdown from "./CustomDropdown.jsx";
import axios from "axios";
import styles from "./CustomDropdown.module.css";
import {useParams} from "react-router-dom";
import MovieModalList from "../GenreModal/MovieModalList.jsx";
import * as Realm from "realm-web";
import Card from "../Card/Card.jsx";

const SearchPage = () => {
  const {searchTerm} = useParams();

  const [fuzzy, setFuzzy] = useState(null);

  const getData = useCallback(async () => {
    try {
      const response = await axios.post("https://embed.popkorn.tech/rrf", {
        query: searchTerm,
      });
      setFuzzy(response.data);
    } catch (error) {
      setFuzzy([]);
      console.error("Error fetching movies:", error);
    }
  }, [searchTerm]);
  useEffect(() => {
    getData();
  }, [getData]);

  const [movies, setMovies] = useState([]);
  const [genreSelections, setGenreSelections] = useState([]);
  const [languageSelections, setLanguageSelections] = useState([]);
  const genreOptions = [
    {label: "Action", value: "action"},
    {label: "Comedy", value: "comedy"},
    {label: "Sci-Fi", value: "sci-fi"},
    // ... add more genres
  ];

  const languageOptions = [
    {label: "English", value: "english"},
    {label: "Spanish", value: "spanish"},
    {label: "French", value: "french"},
    // ... add more languages
  ];
  // State to store fetched movies

  const fetchMovies = useCallback(async () => {
    try {
      const response = await axios.post("https://embed.popkorn.tech/fts_search_filter", {
        query: searchTerm,
        genre: genreSelections.join(","),
        language: languageSelections.join(","),
      });
      // setMovies(response.data);
      setFuzzy(response.data);
    } catch (error) {
      setFuzzy([]);
      console.error("Error fetching movies:", error);
    }
  }, [genreSelections, languageSelections]);
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className={styles.maincontentwrapper}>
      <div className={styles.dropdownscontainer} style={{display: "flex", gap: "2rem", marginLeft: "2rem"}}>
        <CustomDropdown
          key="genre-dropdown"
          label="Genre"
          options={genreOptions}
          selectedItems={genreSelections}
          updateSelectedItems={setGenreSelections}
        />
        <CustomDropdown
          key="language-dropdown"
          label="Language"
          options={languageOptions}
          selectedItems={languageSelections}
          updateSelectedItems={setLanguageSelections}
        />
      </div>
      <div className="moviescontainer">
        <section className={styles.container}>
          <div className={styles.title}>
            <span>Search Results for {searchTerm}</span>
          </div>
          <div className={styles.gridcontainer}></div>
        </section>
      </div>
      {fuzzy && (
        <div className={styles.results_container}>
          {fuzzy.map((movie, index) => (
            <Card key={index} movies={movie} />
          ))}
        </div>
      )}
      {!fuzzy && (
        <div className={styles.results_container}>
          {Array(18)
            .fill(null)
            .map((movie, index) => (
              <Card key={index} movies={movie} />
            ))}
        </div>
      )}
      {fuzzy?.length === 0 && (
        <div className={styles.NoMoviesFound}>
          <p>No Movie Found</p>
        </div>
      )}
    </div>
  );
};
export default SearchPage;
