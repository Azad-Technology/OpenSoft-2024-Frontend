import React, { useState,useEffect, useRef } from "react";
import styles from "./Search.module.css";
import { useDebounce } from "use-debounce";
import { SearchResults } from "./SearchResults.jsx";
import * as Realm from "realm-web";

export const Search = ({movies}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const searchRef=useRef(null);
  useEffect(()=>{
    function handleClickOutside(event){
      if(searchRef.current && !searchRef.current.contains(event.target)){
        setAutoCompleteResult([]);
      }
    }
    document.addEventListener("mousedown",handleClickOutside);
    return ()=>{
      document.removeEventListener("mousedown",handleClickOutside);
    }
  },[])

  useEffect(() => {
    const getData = async () => {
      const app=new Realm.App({id:"application-0-gisfr"});
      const credentials=Realm.Credentials.anonymous();
      try{
        const user=await app.logIn(credentials);
        const results=await user.functions.auto_dave();
        console.log(results);
      }
      catch(err){
        console.error("Failed to log in",err);
      }
    }
    getData();
  }, [debouncedSearch]);

  return (
    <div className={styles.search}>
      <div className={styles.searchBox}>
        <i className={`fa fa-search ${styles.search__icon}`}></i>
        <input
          className={styles.search__input}
          type="text"
          placeholder="Titles, people, genres"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && <i onClick={()=>setSearch('')} className={`fa fa-close ${styles.search__icon}`}></i>}
      </div>
      {debouncedSearch && <SearchResults movies={movies}/>}
    </div>
  );
};
