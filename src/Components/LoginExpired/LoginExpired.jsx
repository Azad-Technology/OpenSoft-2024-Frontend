import styles from "./LoginExpired.module.css";
import {useNavigate} from "react-router-dom";

const LoginExpired = () => {
  const navigate = useNavigate();
  localStorage.removeItem("token");


  return (
    <>
      <div className={styles.container}>
        <div className={styles.fourOfour}>LOGIN EXPIRED</div>
        <div className={styles.heading}>Oops!</div>
        <div className={styles.subheading}>
          Sorry but it seems that you are not logged in currently, kindly log in to view this page.
        </div>
        <div
          className={styles.LoginExpired}
          onClick={() => {
            navigate("/", {replace: true});
          }}
        >
          Log In
        </div>
      </div>
    </>
  );
};

export default LoginExpired;
