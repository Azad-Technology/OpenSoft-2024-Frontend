import React from 'react'
import { PricingCard } from './PricingCard'
import styles from './Pricing.module.css'

export const Pricing = () => {
    
  return (
    <div className={`${styles.pricing}`}>
        {plans.map((plan, index) => {
            return <PricingCard key={index} plan={plan} />
        })}
    </div>
  )
}
