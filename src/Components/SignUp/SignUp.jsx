import React from "react";
import instance from "../../axios";
import styles from "./SignUp.module.css";
import {useStateValue} from "../../MyContexts/StateProvider";
import {FaUser, FaEye, FaEyeSlash} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {MdEmail} from "react-icons/md";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import RejectedPopup from "../LoginAcceptedRejected/rejectedLogin";
import usernamegenerator from "./usernamegenerator.jsx";
import {GoogleLoginButton} from "../LoginForm/GoogleLoginButton.jsx";

function SignUp({setShowPopup}) {
  const [{token, premium}, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [isPasswordVisible1, setisPasswordVisible1] = useState(false);
  const [isPasswordVisible2, setisPasswordVisible2] = useState(false);
  const [err, setErrors] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup2, setShowPopup2] = useState(false);

  const handleChange = async e => {
    e.preventDefault();
    const newEmail = document.getElementById("email").value;
    const newPass = document.getElementById("password").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const confPass = document.getElementById("confirm").value;
    if (!emailRegex.test(newEmail)) {
      setErrors("Please enter a valid email address.");
    } else {
      if (newPass.length < 8) setErrors([...err, "Password must be at least 8 characters long."]);
      else {
        if (confPass === newPass) {
          setErrors("");
          let username = "";
          if (name.length) username = name;
          else username = usernamegenerator();
          try {
            const response = await instance.post(
              "/signup",
              {
                name: username,
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
            setShowPopup(true);
            setTimeout(() => {
              setShowPopup(false);
            }, 3000);
            navigate('/');
          } catch (error) {
            setErrors(error.response.data.detail);
            setShowPopup2(true);
            setTimeout(() => {
              setShowPopup2(false);
            }, 3000);
          }
        } else setErrors("Password does not match");
      }
    }
  };

  const handleGoogleClick = async () => {
    try {
      const response = await instance.get("/login/google");
      window.location.href = response.data.url;
    } catch (error) {
      setErrors(error.response.data.detail);
    }
  };

  const togglePasswordVisibility1 = () => {
    setisPasswordVisible1(!isPasswordVisible1);
  };

  const togglePasswordVisibility2 = () => {
    setisPasswordVisible2(!isPasswordVisible2);
  };

  return (
    <div className={styles.container}>
      {showPopup2 && <RejectedPopup message={err} />}
      <div className={styles.wrapper}>
        <form action="">
          <h1>Sign Up</h1>

          <GoogleLoginButton
            className={styles.GoogleLogin}
            setShowPopup={setShowPopup}
            setShowPopup2={setShowPopup2}
            showPopup2={showPopup2}
            register={true}
          />

          <hr className={styles.Or} />

          <div className={styles.text}>Full Name</div>

          <div className={styles.inputBox}>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
            <FaUser style={{width: "1.25rem", height: "1.25rem"}} className={styles.icon} />
          </div>

          <div className={styles.text}>
            Email<div className={styles.star}>*</div>
          </div>

          <div className={styles.inputBox}>
            <input type="email" id="email" required onChange={e => setEmail(e.target.value)} />
            <MdEmail style={{width: "1.25rem", height: "1.25rem"}} className={styles.icon}></MdEmail>
          </div>

          <div className={styles.text}>
            Password<div className={styles.star}>*</div>
          </div>

          <div className={styles.inputBox}>
            <input
              type={isPasswordVisible1 ? "text" : "password"}
              id="password"
              name="password"
              required
              onChange={e => setPassword(e.target.value)}
            />

            <div onClick={togglePasswordVisibility1} style={{cursor: "pointer"}}>
              {isPasswordVisible1 ? (
                <FaEye style={{width: "1.25rem", height: "1.25rem"}} className={styles.icon} />
              ) : (
                <FaEyeSlash style={{width: "1.25rem", height: "1.25rem"}} className={styles.icon} />
              )}
            </div>
          </div>
          <div className={styles.text}>
            Confirm Password<div className={styles.star}>*</div>
          </div>
          <div className={styles.inputBox}>
            <input type={isPasswordVisible2 ? "text" : "password"} id="confirm" name="confirm" required />

            <div onClick={togglePasswordVisibility2} style={{cursor: "pointer"}}>
              {isPasswordVisible2 ? (
                <FaEye style={{width: "1.25rem", height: "1.25rem"}} className={styles.icon} />
              ) : (
                <FaEyeSlash style={{width: "1.25rem", height: "1.25rem"}} className={styles.icon} />
              )}
            </div>
          </div>

          {err === "" ? (
            <></>
          ) : (
            <div className={styles.error}>
              <ul>
                <li>{err}</li>
              </ul>
            </div>
          )}

          <button type={err === "" ? "submit" : "button"} onClick={e => handleChange(e)} id={styles.loginButton}>
            Register
          </button>
          <div className={styles.registerLink}>
            <p>
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
