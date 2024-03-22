import React, { useState, useEffect } from 'react'
import styles from './WatchListCards.module.css'
import instance from '../../axios';
import { useStateValue } from '../../MyContexts/StateProvider';
import { useNavigate } from 'react-router';

export const WatchListCards = ({id}) => {
    const [token, dispatch] = useStateValue();
    const navigate = useNavigate();
    let x=Math.round(0xffffff * Math.random()).toString(16);
    let y=(6-x.length);
    let z="000000";
    let z1 = z.substring(0,y);
    let rcolor= '#' + z1 + x;

    const [watchlist, setWatchlist] = useState(null);
    useEffect(()=>{
        const getWatchlist = async () => {
            const res = await instance.get('/watchlist/'+id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data);
            setWatchlist(res.data);
        }
        getWatchlist();
    }, [])
    // console.log(rcolor);
  return (
    <div className={styles.card} style={{ backgroundColor: rcolor }} onClick={() => (navigate('/watchlist/' + watchlist?._id))}>
        <span>
            {watchlist?.name}
        </span>
    </div>
  )
}
