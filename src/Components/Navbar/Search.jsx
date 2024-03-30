import React, {useState, useEffect, useRef} from "react";
import styles from "./Search.module.css";
import {useDebounce} from "use-debounce";
import {SearchResults} from "./SearchResults.jsx";
import {useNavigate} from "react-router-dom";
import instance from "../../axios.jsx";

export const Search = ({movies, searchBarRef,setShowSearchBar}) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 250);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [click, setClick] = useState(true);

  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setClick(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getData = async () => {
    try {
      if (debouncedSearch.length) {
        const response = await instance.get(`/autosearch/${debouncedSearch}`);
        setAutoCompleteResult(response.data);
      }
      else{
        setAutoCompleteResult([]);
      }
    } catch (err) {
      setAutoCompleteResult([]);
    }
  };

  useEffect(() => {
    function handleClickInside(event) {
      if (searchRef.current && searchRef.current.contains(event.target)) {
        setClick(true);
      }
    }
    document.addEventListener("mousedown", handleClickInside);
    return () => {
      document.removeEventListener("mousedown", handleClickInside);
    };
  }, []);

  useEffect(() => {
    getData();
  }, [debouncedSearch]);

  const handleKeyPress = (e, search) => {
    if (e.key === "Enter") {
      if (debouncedSearch) {
        navigate(`/search/${search}`);
      }
    }
  };

  return (
    <div ref={searchRef} className={styles.search}>
      <div className={styles.searchBox}>
        <i onClick={()=>{navigate(`/search/${search}`); setShowSearchBar(false)}} className={`fa fa-search ${styles.search__icon}`}></i>
        <input
          ref={searchBarRef}
          className={styles.search__input}
          type="text"
          placeholder="Titles, people, genres"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyPress={e => {
            handleKeyPress(e, search);
          }}
        />
        {search && <i onClick={() => {navigate(`/search/${search}`);setSearch("")}} className={`fa fa-close ${styles.search__icon}`}></i>}
      </div>
      {click && autoCompleteResult && <SearchResults setShowSearchBar={setShowSearchBar} setSearch={setSearch} movies={autoCompleteResult} search={debouncedSearch} />}
    </div>
  );
};
