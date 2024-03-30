import React, {useEffect, useState, useRef, useCallback} from "react";
import styles from "./HomeSliders.module.css";
import Card from "../Card/Card.jsx";
import instance from "../../axios.jsx";
import MovieList from "../movieList/MovieList.jsx";
import Loader from "./../Loader/Loader.jsx";
import TopMovieList from "../movieList/TopMovieList.jsx";
import {useStateValue} from "../../MyContexts/StateProvider";

export const Slider = ({genre, id, setShowPopup3,setShowLikePopup}) => {
  const [movies, setMovies] = useState(null);
  const [{token}, dispatch] = useStateValue();

  const getData = useCallback(async () => {
    if (genre === "Handpicked") {
      const response = await instance.request("/recommend", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMovies(response.data);
      return;
    }
    if (genre === "Regional Hits") {
      const response = await instance.get(`my_country?count=18`);
      setMovies(response.data);

      return;
    }
    if (genre === "More Like This") {
      const response = await instance.get("/movies/" + id + "/related_movies?count=18");
      setMovies(response.data);
      return;
    }
    if (genre === "Top Movies") {
      const response = await instance.get("/top_movies?count=10");
      setMovies(response.data);
      return;
    }
    if (genre === "Top Series") {
      const response = await instance.get("/top_series?count=10");
      setMovies(response.data);
      return;
    }
    if (genre === "Recent") {
      const response = await instance.get("/recent_movies?count=18");
      setMovies(response.data);
      return;
    }
    const response = await instance.get(`/genre_top_movies/${genre}?count=18`);
    setMovies(response.data);
  }, [genre, id, token]);
  useEffect(() => {
    getData();
  }, [getData]);

  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);

  const scrollableDivRef = useRef(null);

  useEffect(() => {
    if (movies) {
      setShowRightBtn(
        scrollableDivRef.current.scrollWidth -
          scrollableDivRef.current.scrollLeft -
          scrollableDivRef.current.clientWidth >
          40 && scrollableDivRef.current.clientWidth < scrollableDivRef.current.scrollWidth
      );

      scrollableDivRef.current.addEventListener("scroll", () => {
        setShowLeftBtn(scrollableDivRef.current.scrollLeft > 40);
        setShowRightBtn(
          scrollableDivRef.current.scrollWidth -
            scrollableDivRef.current.scrollLeft -
            scrollableDivRef.current.clientWidth >
            40 && scrollableDivRef.current.clientWidth < scrollableDivRef.current.scrollWidth
        );
      });
    }
  }, [movies]);

  function handleLeftScroll() {
    scrollableDivRef.current.scrollLeft -= (80 * window.innerWidth) / 100;
  }
  function handleRightScroll() {
    scrollableDivRef.current.scrollLeft += (80 * window.innerWidth) / 100;
  }

  return (
    <>
      <div className={styles.slider}>
        <div className={styles.container}>
          <div className={styles.slider__movies} ref={scrollableDivRef}>
            <div className={styles.LeftbtnContainer}>
              {showLeftBtn && (
                <button onClick={handleLeftScroll}>
                  <svg
                    fill="#CCAA00"
                    height="25px"
                    width="25px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512.001 512.001"
                    xmlSpace="preserve"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <path d="M505.749,304.918L271.083,70.251c-8.341-8.341-21.824-8.341-30.165,0L6.251,304.918C2.24,308.907,0,314.326,0,320.001 v106.667c0,8.619,5.184,16.427,13.163,19.712c7.979,3.307,17.152,1.472,23.253-4.629L256,222.166L475.584,441.75 c4.075,4.075,9.536,6.251,15.083,6.251c2.752,0,5.525-0.512,8.171-1.621c7.979-3.285,13.163-11.093,13.163-19.712V320.001 C512,314.326,509.76,308.907,505.749,304.918z"></path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </button>
              )}
            </div>
            <div className={styles.RightbtnContainer}>
              {showRightBtn && (
                <button onClick={handleRightScroll}>
                  <svg
                    fill="#CCAA00"
                    height="25px"
                    width="25px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512.001 512.001"
                    xmlSpace="preserve"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <path d="M505.749,304.918L271.083,70.251c-8.341-8.341-21.824-8.341-30.165,0L6.251,304.918C2.24,308.907,0,314.326,0,320.001 v106.667c0,8.619,5.184,16.427,13.163,19.712c7.979,3.307,17.152,1.472,23.253-4.629L256,222.166L475.584,441.75 c4.075,4.075,9.536,6.251,15.083,6.251c2.752,0,5.525-0.512,8.171-1.621c7.979-3.285,13.163-11.093,13.163-19.712V320.001 C512,314.326,509.76,308.907,505.749,304.918z"></path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </button>
              )}
            </div>
            {genre === "Top Series" || genre === "Top Movies"
              ? movies && <TopMovieList setShowPopup3={setShowPopup3} movie={movies} setShowLikePopup={setShowLikePopup} />
              : movies && <MovieList setShowPopup3={setShowPopup3} movie={movies} setShowLikePopup={setShowLikePopup} />}
            {genre === "Top Series" || genre === "Top Movies"
              ? !movies && <TopMovieList movie={Array(18).fill(null)} />
              : !movies && <MovieList movie={Array(18).fill(null)} />}

            {/* {movies && <TopMovieList movie={movies} />} */}
            {/* {!movies && <TopMovieList movie={Array(18).fill(null)} />} */}
          </div>
        </div>
      </div>
    </>
  );
};
