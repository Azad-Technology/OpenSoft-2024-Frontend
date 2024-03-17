import React from 'react'
import { PricingCard } from './PricingCard'
import styles from './Pricing.module.css'

export const Pricing = () => {
  return (
    <div className={`${styles.pricing}`}>
        <PricingCard />
    </div>
  )
}
