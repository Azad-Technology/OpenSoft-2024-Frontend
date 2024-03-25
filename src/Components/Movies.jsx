import React from "react";
export const Movies = ({movies}) => {
  return (
    <div>
      {movies
        .filter((_, index) => index >= 0)
        .map(movie => {
          return (
            <>
              <img
                style={{width: "100vw"}}
                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                alt={movie.title}
              />
            </>
          );
        })}
    </div>
  );
};
