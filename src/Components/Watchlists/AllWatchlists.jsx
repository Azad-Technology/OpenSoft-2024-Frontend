import {useState, useRef, useEffect} from 'react'
import styles from './WatchListCards.module.css'
import instance from '../../axios'
import { WatchListCards } from './WatchListCards'
import { useStateValue } from '../../MyContexts/StateProvider'

export const AllWatchlists = () => {
    const [{token, user}, dispatch] = useStateValue();
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
    <>
    <h1>Watchlists</h1>
    {watchlists?.length==0 && <div className={styles.nothingToShow}>Nothing to show here</div>}
    
    <div className={styles.slider}>
      <div className={styles.container}>
        <div className={styles.slider__movies} ref={scrollableDivRef}>
          {watchlists?.map((watchlist, index) => (
            <WatchListCards key={index} name={watchlist.name} id={watchlist._id} />
          ))}
        </div>
      </div>
    </div>
    </>
  )
}
