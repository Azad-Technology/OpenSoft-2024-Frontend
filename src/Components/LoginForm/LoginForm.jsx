import React from 'react'
import './LoginForm.css'
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';

function LoginForm() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [err, setErrors] = useState("")

    const handleChange = () => {
      const newEmail = document.getElementById("email").value
      const newPass = document.getElementById("password").value
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newEmail)){
        setErrors("Please enter a valid email address.")
      }
      else {
        if (newPass.length < 8) {
          setErrors('Password must be at least 8 characters long.');
        } else if (!/[A-Z]/.test(newPass)) {
          setErrors('Password must contain at least one uppercase letter.');
        } else if (!/[a-z]/.test(newPass)) {
          setErrors('Password must contain at least one lowercase letter.');
        } else if (!/\d/.test(newPass)) {
          setErrors('Password must contain at least one digit.');
        } else if (!/[!@#$%&*-]/.test(newPass)) {
          setErrors('Password must contain at least one special character.');
        }
        else setErrors("")
      }

  };

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
  
  return (
    <div className='wrapper'>
      <form action="">
        <h1>Welcome Back.</h1>
        <div className='OAuth'>
        <button type='submit' className='google'><FcGoogle className='google-icon'/>Login with Google</button>
        </div>
        <div className='Or'><div>Or, sign in with your email</div>
        </div>

        <div className="input-box">
            <input type="email" placeholder='name@email.com' id='email'required />
            <FaUser className='icon'/>
        </div>
        
        <div className="input-box">
        <input
        type={isPasswordVisible ? 'text' : 'password'}
        id="password"
        name="password"
        placeholder='Password'
        required
      />
      
        <div onClick={togglePasswordVisibility} style={{cursor: 'pointer'}}>{isPasswordVisible ? <FaEye className='icon' />:<FaEyeSlash className='icon'/>}</div>
        </div>
        
        {err===""?<></>:<div id='error'>{err}</div>}

        <button type={err===""?'submit':'button'} onClick={handleChange} id='loginButton'>Login</button>
        <div className="register-link">
            <p>Don't have an account? <a href="#">Register</a></p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
