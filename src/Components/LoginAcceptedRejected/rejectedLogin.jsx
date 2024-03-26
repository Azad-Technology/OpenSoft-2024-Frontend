import styles from "./Login.module.css";

const RejectedPopup = ({message}) => {
  return <div className={styles.rejectedPopup}>{message}</div>;
};

export default RejectedPopup;
