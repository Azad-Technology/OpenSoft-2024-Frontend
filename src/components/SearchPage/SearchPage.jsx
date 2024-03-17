import React, { useState, useEffect } from 'react'
import CustomDropdown from './CustomDropdown'
import axios from 'axios';
import styles from './CustomDropdown.module.css'
import { useParams } from 'react-router-dom';
import MovieList from '../movieList/MovieList.jsx';
import * as Realm from "realm-web";

const SearchPage = () => {
  const { searchTerm } = useParams();

  const [fuzzy, setFuzzy] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const app = new Realm.App({ id: "application-0-gisfr" });
      const credentials = Realm.Credentials.anonymous();
      try {
        const user = await app.logIn(credentials);
        const results = await user.functions.fuzzy_dave(searchTerm, '*');
        setFuzzy(results);
        console.log("fuzzy", results);
      }
      catch (err) {
        console.error("Failed to log in", err);
      }
    }
    getData();
  }, [searchTerm])

  const [movies, setMovies] = useState([]);
  const [genreSelections, setGenreSelections] = useState([]);
  const [yearSelections, setYearSelections] = useState([]);
  const [languageSelections, setLanguageSelections] = useState([]);
  const genreOptions = [
    { label: 'Action', value: 'action' },
    { label: 'Comedy', value: 'comedy' },
    { label: 'Sci-Fi', value: 'sci-fi' },
    // ... add more genres 
  ];

  const yearOptions = [
    { label: '2023', value: '2023' },
    { label: '2022', value: '2022' },
    { label: '2021', value: '2021' },
    // ... add more years
  ];

  const languageOptions = [
    { label: 'English', value: 'english' },
    { label: 'Spanish', value: 'spanish' },
    { label: 'French', value: 'french' },
    // ... add more languages
  ];
  // State to store fetched movies

  const fetchMovies = async () => {
    const filters = {
      genre: genreSelections.join(','),
      year: yearSelections.join(','),
      language: languageSelections.join(',')
    };

    console.log('Filters:', filters); // Log the constructed filters

    try {
      const response = await axios.get('/api/movies', { params: filters });
      console.log('API Response:', response); // Log the complete response
      // setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, [genreSelections, yearSelections, languageSelections]);

  return (
    <div className="maincontentwrapper">

      <div className="dropdownscontainer" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginLeft: '2rem', width: 'max-content', alignSelf: 'start' }}>
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
          updateSelectedItems={setLanguageSelections} />
      </div>
      <div className="moviescontainer">
        <section className={styles.container}>
          <div className={styles.title}>
            <span>Search Results for {searchTerm}</span>
          </div>
          <div className={styles.gridcontainer}>
          </div>
        </section>

      </div>
      <MovieList movie={fuzzy} />
    </div>
  );
}
export default SearchPage


