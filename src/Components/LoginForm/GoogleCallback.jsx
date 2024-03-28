import React, {useEffect} from "react";
import styles from "./GoogleCallback.module.css";

export const GoogleCallback = (setIsGoogle, googleWindow) => {
  const checkAuth = () => {
    if (googleWindow.location.href.includes("opensoft.eastasia.cloudapp.azure.com")) {
      let accessToken = googleWindow.document.body.innerHTML;
      console.log(accessToken);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      checkAuth();
    });
    return () => clearInterval(interval);
  });
  return (
    <div className={styles.contain}>
      <div className={styles.container}>
        <div className={styles.line}></div>
      </div>
      <div className={styles.heading}>Waiting for Log In Confirmation</div>
      <div className={styles.subheading}>
        Kindly log in using Google from the new tab. Do not refresh or close this page
      </div>
      {/* <div className={styles.buttonURL} onClick={()=>{navigate('/')}}>Home Page</div> */}
    </div>
  );
};
