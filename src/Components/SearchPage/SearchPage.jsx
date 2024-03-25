import React, {useState, useEffect} from "react";
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

  useEffect(() => {
    const getData = async () => {
      const app = new Realm.App({id: "application-0-gisfr"});
      const credentials = Realm.Credentials.anonymous();
      try {
        const user = await app.logIn(credentials);
        const results = await user.functions.fuzzy_dave(searchTerm, "*");
        setFuzzy(results);
      } catch (err) {
        setFuzzy(null);
        console.error("Failed to log in", err);
      }
    };
    getData();
  }, [searchTerm]);

  const [movies, setMovies] = useState([]);
  const [genreSelections, setGenreSelections] = useState([]);
  const [yearSelections, setYearSelections] = useState([]);
  const [languageSelections, setLanguageSelections] = useState([]);
  const genreOptions = [
    {label: "Action", value: "action"},
    {label: "Comedy", value: "comedy"},
    {label: "Sci-Fi", value: "sci-fi"},
    // ... add more genres
  ];

  const yearOptions = [
    {label: "2023", value: "2023"},
    {label: "2022", value: "2022"},
    {label: "2021", value: "2021"},
    // ... add more years
  ];

  const languageOptions = [
    {label: "English", value: "english"},
    {label: "Spanish", value: "spanish"},
    {label: "French", value: "french"},
    // ... add more languages
  ];
  // State to store fetched movies

  const fetchMovies = async () => {
    const filters = {
      genre: genreSelections.join(","),
      year: yearSelections.join(","),
      language: languageSelections.join(","),
    };

    try {
      const response = await axios.get("/api/movies", {params: filters});
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, [genreSelections, yearSelections, languageSelections]);

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
          key="year-dropdown"
          label="Year"
          options={yearOptions}
          selectedItems={yearSelections}
          updateSelectedItems={setYearSelections}
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
