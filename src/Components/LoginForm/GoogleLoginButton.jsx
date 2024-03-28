import React from "react";
import {GoogleLogin} from "react-google-login";
import {useStateValue} from "../../MyContexts/StateProvider";
import instance from "../../axios";
import styles from "./LoginForm.module.css"
const clientID = "950287933882-5bvrs6br7a5ubeb1l2m8di6vgjgu7sco.apps.googleusercontent.com";

export const GoogleLoginButton = () => {
  const [{}, dispatch] = useStateValue();

  const onSuccess = response => {
    console.log(response);
    const name = response.profileObj.name;
    const email = response.profileObj.email;
    const profilePic = response.profileObj.imageUrl;
    console.log(name, email);
    const res = instance
      .post("/auth/callback", {
        name: name,
        email: email,
        profilePic: profilePic,
      })
      .then(res => {
        dispatch({
          type: "SET_TOKEN",
          token: res.data.token,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onFailure = response => {
    console.log(response);
  };

  return <GoogleLogin clientId={clientID} buttonText="Login with Google" onSuccess={onSuccess} onFailure={onFailure} className={styles.GoogleLogin}/>;
};
