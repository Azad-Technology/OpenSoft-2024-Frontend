import React from 'react'
import { PricingCard } from './PricingCard'
import styles from './Pricing.module.css'

export const Pricing = () => {
    const plans = [
        {
            name: "Free",
            price: 12,
            features: [
                "Curabitur faucibus",
                "massa ut pretium maximus",
                "Sed posuere nisi",
                "Pellentesque eu nibh et neque",
                "Suspendisse a leo",
                "Praesent quis venenatis ipsum",
                "Duis non diam vel tortor",

            ],
        },
        {
            name: "Standard",
            price: 35,
            features: [
                "Curabitur faucibus",
                "massa ut pretium maximus",
                "Sed posuere nisi",
                "Pellentesque eu nibh et neque",
                "Suspendisse a leo",
                "Praesent quis venenatis ipsum",
                "Duis non diam vel tortor",
            ],
        },
        {
            name: "Premium",
            price: 60,
            features: [
                "Curabitur faucibus",
                "massa ut pretium maximus",
                "Sed posuere nisi",
                "Pellentesque eu nibh et neque",
                "Suspendisse a leo",
                "Praesent quis venenatis ipsum",
                "Duis non diam vel tortor",
            ],
        },
    ];
  return (
    <div className={`${styles.pricing}`}>
        {plans.map((plan, index) => {
            return <PricingCard key={index} plan={plan} />
        })}
    </div>
  )
}
