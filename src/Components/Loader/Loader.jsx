import styles from "./Loader.module.css";

function Loader() {
  return (
    <>
      <div className={styles.loaderContainer}>
        <div className={styles.container}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    </>
  );
}

export default Loader;
