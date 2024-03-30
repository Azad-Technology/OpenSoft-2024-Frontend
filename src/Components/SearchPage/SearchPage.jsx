import React, {useState, useEffect, useCallback} from "react";
import CustomDropdown from "./CustomDropdown.jsx";
import axios from "axios";
import styles from "./CustomDropdown.module.css";
import {useParams} from "react-router-dom";
import MovieModalList from "../GenreModal/MovieModalList.jsx";
import FuzzyCard from "../Card/FuzzyCard.jsx";
import  Card  from '../Card/Card.jsx';
import GeneralSlider from "../HomeSliders/GeneralSlider.jsx";
import MovieList from "../movieList/MovieList.jsx";

const SearchPage = ({setShowLikePopup}) => {
  const {searchTerm} = useParams();

  const [fuzzy, setFuzzy] = useState(null);
  const [movies, setMovies] = useState([]);
  const [genreSelections, setGenreSelections] = useState([]);
  const [languageSelections, setLanguageSelections] = useState([]);
  const [nlp,setNlp]=useState([]);
  
  const getData = useCallback(async () => {
    setFuzzy(null);
    setNlp([]);
    try {
      const response = await axios.post("https://embed.popkorn.tech/rrf", {
        query: searchTerm,
      });
      setFuzzy(response.data);
      setGenreSelections([]);
      setLanguageSelections([]);
      const response1=await axios.post("https://embed.popkorn.tech/nlp", {
        query: searchTerm,
      });
      setNlp(response1.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }, [searchTerm]);
  useEffect(() => {
    getData();
  }, [searchTerm]);

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

  const fetchMovies = useCallback(async () => {
    if(genreSelections.length===0 && languageSelections.length===0) return;
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
  }, [genreSelections, languageSelections]);

  return (
    <div className={styles.maincontentwrapper}>
      <div className={styles.dropdownscontainer} style={{display: "flex", gap: "2rem", marginLeft: "1.8rem"}}>
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
          {fuzzy?.map((movie, index) => {
            const paths = movie.highlights
              ? Array.from(new Set(movie.highlights.map(highlight => highlight.path)))
              : [];

            let basisText =
              paths.length > 0
                ? paths
                    .slice(0, -1)
                    .join(", ")
                    .concat(paths.length > 1 ? ` and ${paths.slice(-1)}` : "")
                : "plot";
            paths.length === 1 ? (basisText = paths[0]) : basisText;
            return <FuzzyCard setShowLikePopup={setShowLikePopup} key={index} movies={movie} basis={basisText} />;
          })}
        </div>
      )}
      {fuzzy && fuzzy.length === 0 && 
      <div className={styles.results_container}>
        <div className={styles.no_results}>
          <h1>No results found</h1>
        </div>
      </div>
      }
      {!fuzzy && (
        <div className={styles.results_container}>
          {Array(18)
            .fill(null)
            .map((movie, index) => (
              <FuzzyCard key={index} movies={movie} />
            ))}
        </div>
      )}
      {nlp?.length?<div className={styles.nlp}>
      <div className="moviescontainer">
        <section className={styles.container}>
          <div className={styles.title}>
            <span>Natural Language Search Results</span>
          </div>
          <div className={styles.gridcontainer}></div>
        </section>
      </div>
      <div className={styles.results_container}>
        {nlp.map((movie, index) => {
          return <Card setShowLikePopup={setShowLikePopup} key={index} movies={movie} />;
        })
      }
      </div>
      </div>
      :null
      }
    </div>
  );
};
export default SearchPage;
