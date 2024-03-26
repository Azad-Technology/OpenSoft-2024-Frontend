import styles from "./Login.module.css";

export const SuccessPopup = ({message}) => {
  return <div className={styles.successPopup}>{message}</div>;
};

export default SuccessPopup;
