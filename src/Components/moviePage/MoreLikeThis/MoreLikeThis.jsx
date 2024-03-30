import {Slider} from "../../HomeSliders/Slider";
import styles from "./MoreLikeThis.module.css";

import React from "react";

const MoreLikeThis = ({id,setShowLikePopup}) => {
  const numberOfCards = 10;
  const cards = [];
  for (let i = 1; i <= numberOfCards; i++) {
    cards.push(
      <div key={i} className={styles.card}>
        Card {i}
      </div>
    );
  }
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <hr style={{borderColor: "yellow", marginRight: "1rem"}} />
        <span>More Like This</span>
      </div>
      <div>
        <Slider setShowLikePopup={setShowLikePopup} genre={"More Like This"} id={id} />
      </div>
    </section>
  );
};

export default MoreLikeThis;
