import React, {useState, useEffect, useCallback} from "react";
import CustomDropdown from "./CustomDropdown.jsx";
import axios from "axios";
import styles from "./CustomDropdown.module.css";
import {useParams} from "react-router-dom";
import MovieModalList from "../GenreModal/MovieModalList.jsx";
import * as Realm from "realm-web";
import FuzzyCard from "../Card/FuzzyCard.jsx";

const SearchPage = () => {
  const {searchTerm} = useParams();

  const [fuzzy, setFuzzy] = useState(null);

  const getData = useCallback(async () => {
    try {
      const response = await axios.post("https://embed.popkorn.tech/rrf", {
        query: searchTerm,
      });
      setFuzzy(response.data);
      // console.log(response.data);
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
    // {label: "Action", value: "action"},
    // {label: "Comedy", value: "comedy"},
    // {label: "Sci-Fi", value: "sci-fi"},
    {
      label: "Action",
      link: "#",
      value: "Action",
    },
    {
      label: "Comedy",
      link: "#",
      value: "Comedy",
    },
    {
      label: "Horror",
      link: "#",
      value: "Horror",
    },
    {
      label: "Romance",
      link: "#",
      value: "Homance",
    },
    {
      label: "Thriller",
      link: "#",
      value: "Thriller",
    },
    {
      label: "Sci-Fi",
      link: "#",
      value: "Scifi",
    },
    {
      label: "Drama",
      link: "#",
      value: "Drama",
    },
    {
      label: "Mystery",
      link: "#",
      value: "Mystery",
    },
    {
      label: "Crime",
      link: "#",
      value: "Crime",
    },
    {
      label: "Animation",
      link: "#",
      value: "Animation",
    },
    {
      label: "Adventure",
      link: "#",
      value: "Adventure",
    },
    {
      label: "Fantasy",
      link: "#",
      value: "Fantasy",
    },
    {
      label: "Family",
      link: "#",
      value: "Family",
    },
    {
      label: "Biography",
      link: "#",
      value: "Biography",
    },
    {
      label: "History",
      link: "#",
      value: "History",
    },
    {
      label: "War",
      link: "#",
      value: "War",
    },
    {
      label: "Documentary",
      link: "#",
      value: "Documentary",
    },
    {
      label: "Music",
      link: "#",
      value: "Music",
    },
    {
      label: "Sport",
      link: "#",
      value: "Sport",
    },
    {
      label: "Western",
      link: "#",
      value: "Western",
    },
    {
      label: "Short",
      link: "#",
      value: "Short",
    },
    {
      label: "Film-Noir",
      link: "#",
      value: "Filmnoir",
    },
    {
      label: "Talk-Show",
      link: "#",
      value: "Talkshow",
    },
    {
      label: "News",
      link: "#",
      value: "News",
    },
  ];

  const languageOptions = [
    {label: "English", value: "English"},
    {label: "French", value: "French"},
    {label: "Spanish", value: "Spanish"},
    {label: "German", value: "German"},
    {label: "Italian", value: "Italian"},
    {label: "Russian", value: "Russian"},
    {label: "Japanese", value: "Japanese"},
    {label: "Mandarin", value: "Mandarin"},
    {label: "Hindi", value: "Hindi"},
    {label: "Portuguese", value: "Portuguese"},
    {label: "Cantonese", value: "Cantonese"},
    {label: "Swedish", value: "Swedish"},
    {label: "Arabic", value: "Arabic"},
    {label: "Korean", value: "Korean"},
    {label: "Finnish", value: "Finnish"},
    {label: "Polish", value: "Polish"},
    {label: "Dutch", value: "Dutch"},
    {label: "Danish", value: "Danish"},
    {label: "Hebrew", value: "Hebrew"},
    {label: "Latin", value: "Latin"},
    {label: "Turkish", value: "Turkish"},
    {label: "Greek", value: "Greek"},
    {label: "Hungarian", value: "Hungarian"},
    {label: "Norwegian", value: "Norwegian"},
    {label: "Persian", value: "Persian"},
    {label: "Czech", value: "Czech"},
  ];
  // State to store fetched movies

  const fetchMovies = useCallback(async () => {
    try {
      const response = await axios.post("https://embed.popkorn.tech/fts_search_filter", {
        query: searchTerm,
        genre: genreSelections,
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
            <FuzzyCard
              key={index}
              movies={movie}
              basis={movie.highlights ? movie.highlights.sort((a, b) => b.score - a.score)[0].path : "plot"}
            />
          ))}
        </div>
      )}
      {!fuzzy && (
        <div className={styles.results_container}>
          {Array(18)
            .fill(null)
            .map((movie, index) => (
              <FuzzyCard key={index} movies={movie} />
            ))}
        </div>
      )}
      {/* {fuzzy?.length === 0 && (
        <div className={styles.results_container}>

        </div>
      )} */}
    </div>
  );
};
export default SearchPage;
