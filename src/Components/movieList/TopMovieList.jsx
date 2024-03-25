import React, {useEffect, useState, useRef} from "react";
import styles from "./MovieList.module.css";
import TopCard from "../Card/TopCard";

const TopMovieList = ({movie}) => {
  const length = movie.length;
  return (
    <>
      {movie.map((m, i) => {
        return <TopCard movies={m} val={i} length={length} />;
      })}
    </>
  );
};

export default TopMovieList;
