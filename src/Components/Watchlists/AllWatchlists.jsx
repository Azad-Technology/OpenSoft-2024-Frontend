import {useState, useRef, useEffect} from "react";
import styles from "./WatchListCards.module.css";
import instance from "../../axios";
import {WatchListCards} from "./WatchListCards";
import {useStateValue} from "../../MyContexts/StateProvider";

export const AllWatchlists = () => {
  const [{token, user}, dispatch] = useStateValue();
  const watchlists = user?.watchlist;
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);
  const scrollableDivRef = useRef(null);
  const [movies, setMovies] = useState(null);

  function handleLeftScroll() {
    scrollableDivRef.current.scrollLeft -= (80 * window.innerWidth) / 100;
  }
  function handleRightScroll() {
    scrollableDivRef.current.scrollLeft += (80 * window.innerWidth) / 100;
  }

  return (
    <>
      {watchlists && watchlists.length > 0 && (
        <>
          <div className={styles.slider}>
            <div className={styles.container}>
              <div className={styles.slider__movies} ref={scrollableDivRef}>
                {watchlists.map((watchlist, index) => (
                  <WatchListCards key={index} isOdd={index % 2} name={watchlist.name} id={watchlist._id} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {(!watchlists || watchlists.length === 0) && (
        <div className={styles.favorites_card}>
          <div className={styles.nothingToShow}>
            <div>
              {" "}
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M15 18.5L20 13.5M20 18.5L15 13.5"
                    stroke="#ff2e2e"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path opacity="0.5" d="M21 6L3 6" stroke="#ff2e2e" stroke-width="1.5" stroke-linecap="round"></path>{" "}
                  <path opacity="0.5" d="M21 10L3 10" stroke="#ff2e2e" stroke-width="1.5" stroke-linecap="round"></path>{" "}
                  <path opacity="0.5" d="M11 14L3 14" stroke="#ff2e2e" stroke-width="1.5" stroke-linecap="round"></path>{" "}
                  <path opacity="0.5" d="M11 18H3" stroke="#ff2e2e" stroke-width="1.5" stroke-linecap="round"></path>{" "}
                </g>
              </svg>
            </div>
            <div>No watchlist created.</div>
          </div>
        </div>
      )}
    </>
  );
};
