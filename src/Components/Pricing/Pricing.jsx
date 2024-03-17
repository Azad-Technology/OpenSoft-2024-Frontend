
import { useState } from "react";
import bgBottom from "../../assets/bg-bottom.svg";
import bgTop from "../../assets/bg-top.svg";
import styles from "./styles.module.css";
// import plans from './data';
function Pricing() {
  const [annually, setAnnually] = useState(false);
  return (
    <>
      <div className={styles.bgTopImage}>
        <img src={bgTop} alt="" />
      </div>
      <section className={styles.section}>
        <h1 className={styles.heading}>
          Our Pricing
        </h1>
        <div className={styles.toggle}>
          <label className={styles.name}>Annually</label>
          <input
            type="checkbox"
            className={styles.checkbox}
            id="checkbox"
            checked={annually}
            onChange={() => setAnnually(!annually)}
          />
          <label htmlFor="checkbox" className={styles.label}>
            <div className={styles.ball}></div>
          </label>
          <label className={styles.name}>Monthly</label>
        </div>
{/* Pricing Cards */}
        <div className={styles.pricingCards}>
          <article className={styles.pricingCard}>
            <h2 className="text-slate-700 text-xl mb-5">Basic</h2>
            {annually && (
              <h3 className="flex items-center justify-center text-slate-700 text-5xl">
                <span className="text-3xl mr-3">₹</span> 19.99
              </h3>
            )}
            {!annually && (
              <h3 className="flex items-center justify-center text-slate-700 text-5xl">
                <span className="text-3xl mr-3">₹</span> 199.99
              </h3>
            )}
            <ul className="flex justify-center flex-col my-8">
              <li className="border-t border-slate-300 py-3 text-slate-600">
                500 GB Storage
              </li>
              <li className="border-t border-slate-300 py-3 text-slate-600">
                2 Users Allowed
              </li>
              <li className="border-y border-slate-300 py-3 text-slate-600">
                Send up to 3 GB
              </li>
            </ul>
            <button className="linear-gradient btn text-white py-3 w-full rounded-lg shadow uppercase cursor-pointer border-2 hover:border-2">
              Learn More
            </button>
          </article>
          <article className={`${styles.pricingCard} ${styles.featured}`}>
            <h2 className="text-xl mb-5 text-white">Professional</h2>
            {annually && (
              <h3 className="flex items-center justify-center text-white text-5xl">
                <span className="text-3xl mr-3">₹</span> 24.99
              </h3>
            )}
            {!annually && (
              <h3 className="flex items-center justify-center text-white text-5xl">
                <span className="text-3xl mr-3">₹</span> 249.99
              </h3>
            )}
            <ul className="flex justify-center flex-col my-8">
              <li className="text-white border-t border-white py-3">
                1 TB Storage
              </li>
              <li className="text-white border-t border-white py-3">
                5 Users Allowed
              </li>
              <li className="text-white border-y border-white py-3">
                Send up to 10 GB
              </li>
            </ul>
            <button className="bg-white text-slate-800 py-2 w-full rounded-lg shadow border-2 border-white uppercase cursor-pointer hover:bg-transparent hover:text-white transition-all duration-200">
              Learn More
            </button>
          </article>
          <article className={`${styles.pricingCard} ${styles.lastCard}`}>
            <h2 className="text-slate-700 text-xl mb-5">Master</h2>
            {annually && (
              <h3 className="flex items-center justify-center text-slate-700 text-5xl">
                <span className="text-3xl mr-3">₹</span> 39.99
              </h3>
            )}
            {!annually && (
              <h3 className="flex items-center justify-center text-slate-700 text-5xl">
                <span className="text-3xl mr-3">₹</span> 399.99
              </h3>
            )}
            <ul className="flex justify-center flex-col my-8">
              <li className="border-t border-slate-300 py-3 text-slate-600">
                2 TB Storage
              </li>
              <li className="border-t border-slate-300 py-3 text-slate-600">
                10 Users Allowed
              </li>
              <li className="border-y border-slate-300 py-3 text-slate-600">
                Send up to 20 GB
              </li>
            </ul>
            <button className="linear-gradient btn text-white py-3 w-full rounded-lg shadow uppercase cursor-pointer border-2 hover:border-2">
              Learn More
            </button>
          </article>
        </div>
      </section>
      <div className={styles.bgBottomImage}>
        <img src={bgBottom} alt="" />
      </div>
    </>
  );
}
export default Pricing;