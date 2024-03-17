import styles from "./MoreLikeThis.module.css"

import React from 'react'

const MoreLikeThis = () => {
    const numberOfCards = 10;
    const cards = [];
    for (let i = 1; i <= numberOfCards; i++) {
      cards.push(<div key={i} className={styles.card}>Card {i}</div>);
    }
  return (
    <section className={styles.container}>
        <div className={styles.title}>
            <span>More Like This</span>
        </div>
        <div className={styles.gridcontainer}>
            {cards}
        </div>
    </section>
  )
}

export default MoreLikeThis