import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import reducer, {initialState} from "./MyContexts/Reducer.jsx";
import {StateProvider} from "./MyContexts/StateProvider.jsx";
import {GoogleOAuthProvider} from "@react-oauth/google";

const clientID = "950287933882-5bvrs6br7a5ubeb1l2m8di6vgjgu7sco.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <GoogleOAuthProvider clientId={clientID}>
        <App />
      </GoogleOAuthProvider>
    </StateProvider>
  </React.StrictMode>
);
