import React, {useEffect} from "react";
import styles from "./LoginForm.module.css";
import {FaBeer} from "react-icons/fa";
import {FaUser, FaEye, FaEyeSlash} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {useState} from "react";
import instance from "../../axios";
import {useStateValue} from "../../MyContexts/StateProvider";
import {useNavigate} from "react-router-dom";
import RejectedPopup from "../LoginAcceptedRejected/rejectedLogin";
import {GoogleCallback} from "./GoogleCallback";
import {GoogleLoginButton} from "./GoogleLoginButton";
import {gapi} from "gapi-script";

const clientID = "950287933882-5bvrs6br7a5ubeb1l2m8di6vgjgu7sco.apps.googleusercontent.com";

function LoginForm({register, setShowPopup}) {
  const [{token, premium}, dispatch] = useStateValue();
  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [err, setErrors] = useState("");
  const [showPopup2, setShowPopup2] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGoogle, setIsGoogle] = useState(false);
  const [googleWindow, setGoogleWindow] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const newEmail = document.getElementById("email").value;
    const newPass = document.getElementById("password").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setErrors("Please enter a valid email address.");
    } else {
      setErrors("");
      try {
        const response = await instance.post(
          "/login",
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        dispatch({
          type: "SET_TOKEN",
          token: response.data.token,
        });
        {
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 4000);
        }
        navigate(-1);
      } catch (error) {
        console.log(error);
        setErrors(error.response.data.detail);
        setShowPopup2(true);
        setTimeout(() => {
          setShowPopup2(false);
        }, 3000);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleGoogleClick = async () => {
    try {
      const response = await instance.get("/login/google");
      console.log(response.data);
      // setIsGoogle(true);
      let newWindow = window.open(response.data.url, "name", "height=600,width=450");
      setGoogleWindow(newWindow);
      console.log(newWindow);
      if (window.focus) newWindow.focus();
      setIsGoogle(true);
    } catch (error) {
      // console.log(error);
      setErrors(error.response.data.detail);
    }
  };

  useEffect(() => {
    if (token && token !== "null" && token !== "undefined") {
      navigate("/");
    }
  }, [token]);

  return (
    <div className={styles.login}>
      {showPopup2 && <RejectedPopup message={err} />}
      {isGoogle && <GoogleCallback setIsGoogle={setIsGoogle} googleWindow={googleWindow} />}
      {!isGoogle && (
        <div className={styles.wrapper}>
          <form action="">
            <h1>Welcome Back.</h1>
            <div className="OAuth">
              <GoogleLoginButton />
            </div>
            <hr className={styles.Or} />
            <div>
              <div className={styles.Oth}>Sign {register === "register" ? "up" : "in"} with your email</div>
            </div>

            <div className={styles.signup}>
              <input
                type="email"
                placeholder="name@email.com"
                id="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.input_box}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <div onClick={togglePasswordVisibility} style={{cursor: "pointer"}} className={styles.eyeIcon}>
                {isPasswordVisible ? <FaEye className={styles.icon} /> : <FaEyeSlash className={styles.icon} />}
              </div>
            </div>

            <button type={err === "" ? "submit" : "button"} onClick={e => handleSubmit(e)} id="loginButton">
              Login
            </button>
            <div className={styles.register_link}>
              <p>
                Don't have an account? <a href="/signup">Register</a>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
