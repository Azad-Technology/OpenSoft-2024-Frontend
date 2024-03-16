import React, { useState,useEffect,useRef } from "react";
import styles from "./Search.module.css";
import { useDebounce } from "use-debounce";
import { SearchResults } from "./SearchResults.jsx";
import * as Realm from "realm-web";

export const Search = ({movies,searchBarRef}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 250);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [user,setUser]=useState(null);
  const[app,setApp]=useState(null);
  const [click,setClick]=useState(true);

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

  const searchRef=useRef(null);

  useEffect(()=>{
    function handleClickOutside(event){
      if(searchRef.current && !searchRef.current.contains(event.target)){
        setClick(false);
      }
    }
    document.addEventListener("mousedown",handleClickOutside);
    return ()=>{
      document.removeEventListener("mousedown",handleClickOutside);
    }
  },[])
  
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

  useEffect(()=>{
    function handleClickInside(event){
      if(searchRef.current && searchRef.current.contains(event.target)){
        setClick(true);
      }
    }
    document.addEventListener("mousedown",handleClickInside);
    return ()=>{
      document.removeEventListener("mousedown",handleClickInside);
    }
  },[])
  

  useEffect(() => {
    getData();
  }, [debouncedSearch]);

  return (
    <div ref={searchRef} className={styles.search}>
      <div className={styles.searchBox}>
        <i className={`fa fa-search ${styles.search__icon}`}></i>
        <input
          ref={searchBarRef}
          className={styles.search__input}
          type="text"
          placeholder="Titles, people, genres"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => {handleKeyPress(e,debouncedSearch)}}
        />
        {search && <i onClick={()=>setSearch('')} className={`fa fa-close ${styles.search__icon}`}></i>}
      </div>
      {click && autoCompleteResult && <SearchResults movies={autoCompleteResult} search={debouncedSearch}/>}
    </div>
  );
};
