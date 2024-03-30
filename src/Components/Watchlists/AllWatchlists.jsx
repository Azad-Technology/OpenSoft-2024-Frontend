import {useState, useRef, useEffect} from "react";
import styles from "./WatchListCards.module.css";
import {WatchListCards} from "./WatchListCards";
import {useStateValue} from "../../MyContexts/StateProvider";

export const AllWatchlists = () => {
  const [{token, user}, dispatch] = useStateValue();
  const watchlists = user?.watchlist;
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);

  const scrollableDivRef = useRef(null);

  useEffect(() => {
    if(watchlists && scrollableDivRef.current){
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
    
  }, [watchlists]);

  function handleLeftScroll() {
    scrollableDivRef.current.scrollLeft -= (80 * window.innerWidth) / 100;
  }
  function handleRightScroll() {
    scrollableDivRef.current.scrollLeft += (80 * window.innerWidth) / 100;
  }

  return (
    <div className={styles.mainSliders} >
      {watchlists && watchlists.length > 0 && (
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
    </div>
  );
};
