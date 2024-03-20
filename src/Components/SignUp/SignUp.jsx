import React from 'react'
import styles from './SignUp.module.css'
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { useState } from 'react';

function SignUp() {
    const [isPasswordVisible1, setisPasswordVisible1] = useState(false);
    const [isPasswordVisible2, setisPasswordVisible2] = useState(false);
    const [err, setErrors] = useState("")

    const handleChange = () => {
      const newEmail = document.getElementById("email").value
      const newPass = document.getElementById("password").value
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const confPass = document.getElementById("confirm").value
      if (!emailRegex.test(newEmail)){
        setErrors("Please enter a valid email address.")
      }
      else {
        if(newPass.length<8) setErrors('Password must be at least 8 characters long.');
        else{
          if(confPass === newPass) setErrors("")
          else setErrors("Password does not match")
        }
      }
  };

    const togglePasswordVisibility1 = () => {
      setisPasswordVisible1(!isPasswordVisible1);
    };

    const togglePasswordVisibility2 = () => {
      setisPasswordVisible2(!isPasswordVisible2);
    };
  
  return (
    <div className={styles.container}><div className={styles.wrapper}>
      <form action="">
        <h1>Sign Up</h1>
        <div className={styles.OAuth}>
        <button type='submit' className={styles.google}><FcGoogle className={styles.googleIcon}/>Sign up with Google</button>
        </div>
        <div className={styles.text}>Full Name</div>
        <div className={styles.inputBox}>
            <input type="text" id='name'required />
            <FaUser className={styles.icon}/>
        </div>
        <div className={styles.text}>Email<div className={styles.star}>*</div></div>
        <div className={styles.inputBox}>
            <input type="email" id='email'required />
            <MdEmail className={styles.icon}></MdEmail>
        </div>
        <div className={styles.text}>Password<div className={styles.star}>*</div></div>  
        <div className={styles.inputBox}>
        <input
        type={isPasswordVisible1 ? 'text' : 'password'}
        id="password"
        name="password"
        required
      />
      
        <div onClick={togglePasswordVisibility1} style={{cursor: 'pointer'}}>{isPasswordVisible1 ? <FaEye className={styles.icon} />:<FaEyeSlash className={styles.icon}/>}</div>
        </div>
        <div className={styles.text}>Confirm Password<div className={styles.star}>*</div></div>
        <div className={styles.inputBox}>
        <input
        type={isPasswordVisible2 ? 'text' : 'password'}
        id="confirm"
        name="confirm"
        required
      />
      
        <div onClick={togglePasswordVisibility2} style={{cursor: 'pointer'}}>{isPasswordVisible2 ? <FaEye className={styles.icon} />:<FaEyeSlash className={styles.icon}/>}</div>
        </div>
        
        {err===""?<></>:<div className={styles.error}>{err}</div>}

        <button type={err===""?'submit':'button'} onClick={handleChange} id='loginButton'>Register</button>
        <div className={styles.registerLink}>
            <p>Already have an account? <a href="#">Sign in</a></p>
        </div>
      </form>
    </div>
    </div>
  )
}

export default SignUp
