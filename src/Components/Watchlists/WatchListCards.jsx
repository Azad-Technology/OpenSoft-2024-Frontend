import React, {useState, useEffect} from "react";
import styles from "./WatchListCards.module.css";
import instance from "../../axios";
import {useStateValue} from "../../MyContexts/StateProvider";
import {useNavigate} from "react-router";
import deleteIcon from "../../assets/Delete_Icon.svg";

export const WatchListCards = ({name, id, isOdd}) => {
  const [token, dispatch] = useStateValue();
  const navigate = useNavigate();
  let x = Math.round(0xffffff * Math.random()).toString(16);
  let y = 6 - x.length;
  let z = "000000";
  let z1 = z.substring(0, y);
  let rcolor = "#" + z1 + x + "00";
  return (
    <div className={styles.cardcontainer}>
      {!isOdd ? (
        <div
          className={styles.card}
          style={{backgroundImage: "linear-gradient(to right, #26222266, #ffffff51)"}}
          onClick={() => navigate("/watchlist/" + id)}
        >
          <span>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path d="M11 14L3 14" stroke="#fe2a2a" stroke-width="1.5" stroke-linecap="round"></path>{" "}
                <path d="M11 18H3" stroke="#fe2a2a" stroke-width="1.5" stroke-linecap="round"></path>{" "}
                <path
                  d="M18.875 14.1183C20.5288 15.0732 21.3558 15.5506 21.4772 16.2394C21.5076 16.4118 21.5076 16.5881 21.4772 16.7604C21.3558 17.4492 20.5288 17.9266 18.875 18.8815C17.2212 19.8363 16.3942 20.3137 15.737 20.0745C15.5725 20.0147 15.4199 19.9265 15.2858 19.814C14.75 19.3644 14.75 18.4096 14.75 16.4999C14.75 14.5902 14.75 13.6354 15.2858 13.1858C15.4199 13.0733 15.5725 12.9852 15.737 12.9253C16.3942 12.6861 17.2212 13.1635 18.875 14.1183Z"
                  stroke="#fe2a2a"
                  stroke-width="1.5"
                ></path>{" "}
                <path d="M3 6L13.5 6M20 6L17.75 6" stroke="#fe2a2a" stroke-width="1.5" stroke-linecap="round"></path>{" "}
                <path d="M20 10L9.5 10M3 10H5.25" stroke="#fe2a2a" stroke-width="1.5" stroke-linecap="round"></path>{" "}
              </g>
            </svg>
            <span className={styles.titleofcard}>{name}</span>
          </span>
        </div>
      ) : (
        <div className={styles.card} onClick={() => navigate("/watchlist/" + id)}>
          <span>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path d="M11 14L3 14" stroke="#fe2a2a" stroke-width="1.5" stroke-linecap="round"></path>{" "}
                <path d="M11 18H3" stroke="#fe2a2a" stroke-width="1.5" stroke-linecap="round"></path>{" "}
                <path
                  d="M18.875 14.1183C20.5288 15.0732 21.3558 15.5506 21.4772 16.2394C21.5076 16.4118 21.5076 16.5881 21.4772 16.7604C21.3558 17.4492 20.5288 17.9266 18.875 18.8815C17.2212 19.8363 16.3942 20.3137 15.737 20.0745C15.5725 20.0147 15.4199 19.9265 15.2858 19.814C14.75 19.3644 14.75 18.4096 14.75 16.4999C14.75 14.5902 14.75 13.6354 15.2858 13.1858C15.4199 13.0733 15.5725 12.9852 15.737 12.9253C16.3942 12.6861 17.2212 13.1635 18.875 14.1183Z"
                  stroke="#fe2a2a"
                  stroke-width="1.5"
                ></path>{" "}
                <path d="M3 6L13.5 6M20 6L17.75 6" stroke="#fe2a2a" stroke-width="1.5" stroke-linecap="round"></path>{" "}
                <path d="M20 10L9.5 10M3 10H5.25" stroke="#fe2a2a" stroke-width="1.5" stroke-linecap="round"></path>{" "}
              </g>
            </svg>
            <span>{name}</span>
          </span>
        </div>
      )}

      {/* <button className={styles.delete_icon} onClick={deleteWatchlist}>
    <img src={deleteIcon} alt="delete icon"  />
    </button> */}
    </div>
  );
};
