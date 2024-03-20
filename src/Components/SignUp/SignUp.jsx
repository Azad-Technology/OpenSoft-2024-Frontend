import React from 'react'
import './SignUp.css'
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
    <div className='wrapper'>
      <form action="">
        <h1>Sign Up</h1>
        <div className='OAuth'>
        <button type='submit' className='google'><FcGoogle className='google-icon'/>Sign up with Google</button>
        </div>
        <div className="text">Full Name</div>
        <div className="input-box">
            <input type="text" id='name'required />
            <FaUser className='icon'/>
        </div>
        <div className="text">Email</div>
        <div className="input-box">
            <input type="email" id='email'required />
            <MdEmail className='icon'></MdEmail>
        </div>
        <div className="text">Password</div>  
        <div className="input-box">
        <input
        type={isPasswordVisible1 ? 'text' : 'password'}
        id="password"
        name="password"
        required
      />
      
        <div onClick={togglePasswordVisibility1} style={{cursor: 'pointer'}}>{isPasswordVisible1 ? <FaEye className='icon' />:<FaEyeSlash className='icon'/>}</div>
        </div>
        <div className="text">Confirm Password</div>
        <div className="input-box">
        <input
        type={isPasswordVisible2 ? 'text' : 'password'}
        id="confirm"
        name="confirm"
        required
      />
      
        <div onClick={togglePasswordVisibility2} style={{cursor: 'pointer'}}>{isPasswordVisible2 ? <FaEye className='icon' />:<FaEyeSlash className='icon'/>}</div>
        </div>
        
        {err===""?<></>:<div id='error'>{err}</div>}

        <button type={err===""?'submit':'button'} onClick={handleChange} id='loginButton'>Register</button>
        <div className="register-link">
            <p>Already have an account? <a href="#">Sign in</a></p>
        </div>
      </form>
    </div>
  )
}

export default SignUp
