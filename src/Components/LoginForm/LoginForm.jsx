import React from 'react'
import './LoginForm.css'
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';


function LoginForm() {

  const [inputType, setInputType] = useState('password');
  const [isLocked, setIsLocked] = useState(true);

  const toggleIcon = () => {
    setIsLocked(!isLocked);
  };

  const toggleInputType = () => {
    setInputType(currentType => currentType === 'password' ? 'text' : 'password');
  };

  return (
    <div className='login'>
      <div className='wrapper'>
      <form action="">
        <h1>Welcome Back.</h1>
        <div className='OAuth'>
        <button type='submit' className='google'><FcGoogle className='google-icon'/>Login with Google</button>
        </div>
        <div className='Or'>Or, sign in with your email
        </div>

        <div className="input-box">
            <input type="text" placeholder='name@email.com' required />
            <FaUser className='icon'/>
        </div>
        
        <div className="input-box">
            <input type={inputType} placeholder='Password' required />
            <div onClick={toggleInputType} style={{cursor: 'pointer'}}>{setInputType==="password"?<FaEye className='icon' />:<FaEyeSlash className='icon'/>}</div>
        </div>
        <button type='submit'>Login</button>
        <div className="register-link">
            <p>Don't have an account? <a href="#">Register</a></p>
        </div>
      </form>
    </div>
    </div>
  )
}

export default LoginForm
