import React from 'react'
import styles from './PricingCard.module.css'

export const PricingCard = () => {
  return (
    <div className={`${styles.pricing__card}`}>
        <div className={`${styles.pricing__card__header}`}>
            <h3>Basic</h3>
            <p>For beginners</p>
        </div>
        <div className={`${styles.pricing__card__body}`}>
            <h2>$0</h2>
            <p>per month</p>
        </div>
        <div className={`${styles.pricing__card__footer}`}>
            <button>Get Started</button>
        </div>
    </div>
  )
}
