import styles from "./NotFound.module.css";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.fourOfour}>404</div>
        <div className={styles.heading}>Oops! This page could not be found</div>
        <div className={styles.subheading}>
          Sorry but the page you are looking for does not exist, have been removed, had its name changed or is temporary
          unavailable
        </div>
        <div
          className={styles.homeNotFound}
          onClick={() => {
            navigate("/");
          }}
        >
          Home Page
        </div>
      </div>
    </>
  );
};

export default NotFound;
