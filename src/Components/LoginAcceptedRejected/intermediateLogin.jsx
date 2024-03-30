import styles from "./Login.module.css";

const IntermediatePopup = ({message}) => {
  return <div className={styles.intermediatePopup}>{message}</div>;
};

export default IntermediatePopup;
