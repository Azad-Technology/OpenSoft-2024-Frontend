import React, { useState, useEffect } from 'react'
import styles from './WatchListCards.module.css'
import instance from '../../axios';
import { useStateValue } from '../../MyContexts/StateProvider';
import { useNavigate } from 'react-router';

export const WatchListCards = ({name, id}) => {
    const [token, dispatch] = useStateValue();
    const navigate = useNavigate();
    let x=Math.round(0xffffff * Math.random()).toString(16);
    let y=(6-x.length);
    let z="000000";
    let z1 = z.substring(0,y);
    let rcolor= '#' + z1 + x;


    // console.log(rcolor);
  return (
    <div className={styles.card} style={{ backgroundColor: rcolor }} onClick={() => (navigate('/watchlist/' + id))}>
        <span>
            {name}
        </span>
    </div>
  )
}
