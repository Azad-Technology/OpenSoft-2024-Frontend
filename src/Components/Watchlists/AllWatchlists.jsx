import {useState, useRef, useEffect} from 'react'
import styles from './WatchListCards.module.css'
import instance from '../../axios'
import { WatchListCards } from './WatchListCards'
import { useStateValue } from '../../MyContexts/StateProvider'

export const AllWatchlists = () => {
    const [{token, user}, dispatch] = useStateValue();
    // console.log(token);
    const watchlists = user?.watchlist;
    const [showLeftBtn, setShowLeftBtn] = useState(false);
    const [showRightBtn, setShowRightBtn] = useState(true);
    const scrollableDivRef = useRef(null);
    const [movies, setMovies] = useState(null);
    
    function handleLeftScroll() {
    scrollableDivRef.current.scrollLeft -= 80 * window.innerWidth / 100;
    }
    function handleRightScroll() {
    scrollableDivRef.current.scrollLeft += 80 * window.innerWidth / 100;
    }
    
  return (
    <div className={styles.slider}>
      <div className={styles.container}>
        <div className={styles.slider__movies} ref={scrollableDivRef}>
          {/* <WatchListCards title={"My WatchList #1"} />
          <WatchListCards title={"My WatchList #1"} />
          <WatchListCards title={"My WatchList #1"} />
          <WatchListCards title={"My WatchList #1"} />
          <WatchListCards title={"My WatchList #1"} />
          <WatchListCards title={"My WatchList #1"} />
          <WatchListCards title={"My WatchList #1"} />
          <WatchListCards title={"My WatchList #1"} /> */}
          {watchlists?.map((watchlist, index) => (
            <WatchListCards key={index} id={watchlist} />
          ))}
        </div>
      </div>
    </div>
  )
}
