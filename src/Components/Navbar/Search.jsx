import React, { useState,useEffect } from "react";
import styles from "./Search.module.css";
import { useDebounce } from "use-debounce";
import { SearchResults } from "./SearchResults.jsx";
import * as Realm from "realm-web";

export const Search = ({movies}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 250);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [user,setUser]=useState(null);
  const[app,setApp]=useState(null);

  useEffect(()=>{
    const currApp=new Realm.App({id:"application-0-gisfr"});
    setApp(currApp);
    const credentials=Realm.Credentials.anonymous();
    currApp.logIn(credentials).then((user)=>{
      setUser(user);
    }).catch((err)=>{
      console.error("Failed to log in",err);
    });
  },[])


  useEffect(() => {
    const getData = async () => {
      try{
        const results=await user.functions.auto_dave(debouncedSearch);
        setAutoCompleteResult(results);
      }
      catch(err){
        setAutoCompleteResult([]);
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
      {autoCompleteResult && <SearchResults movies={autoCompleteResult}/>}
    </div>
  );
};
