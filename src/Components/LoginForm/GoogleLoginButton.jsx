import React from "react";
import {useGoogleLogin} from "@react-oauth/google";
import {useStateValue} from "../../MyContexts/StateProvider";
import instance from "../../axios";
import styles from "./LoginForm.module.css";
import axios from "axios";

const clientID = "950287933882-5bvrs6br7a5ubeb1l2m8di6vgjgu7sco.apps.googleusercontent.com";

export const GoogleLoginButton = () => {
  const [{}, dispatch] = useStateValue();

  const login = useGoogleLogin({
    onSuccess: async codeResponse => {
      console.log("codeResponse", codeResponse);
      const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${codeResponse.access_token}`,
        },
      });
      console.log(response);
      const email = response.data.email;
      const name = response.data.name;
      const profilePic = response.data.picture;
      await instance
        .post("/auth/callback", {
          email: email,
          name: name,
          profilePic: profilePic,
        })
        .then(response => {
          console.log(response);
          dispatch({
            type: "SET_TOKEN",
            token: response.data.token,
          });
        });
    },
  });

  return <button onClick={() => login()}>Login</button>;
};
