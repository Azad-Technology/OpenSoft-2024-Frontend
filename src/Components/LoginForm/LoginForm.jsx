import React from 'react'
import styles from './LoginForm.module.css'
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import instance from '../../axios';
import { useStateValue } from '../../MyContexts/StateProvider';
import { useNavigate } from 'react-router-dom';

function LoginForm({register}) {

  const [{token,premium},dispatch]=useStateValue();
  const navigate=useNavigate();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [err, setErrors] = useState("")
    
    const [email, setEmail] = useState("");
    const [password,setPassword]=useState("");
    const handleSubmit = async (e) => {
      e.preventDefault();
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
        else if(register!=="register"){
          setErrors("");
          try{
            const response=await instance.post('/login',{
              email:email,
              password:password
            },
            {
              headers:{
                'Content-Type':'application/json'
              }
            });
            dispatch({
              type:'SET_TOKEN',
              token:response.data.token,
              premium:response.data.type
            });
            navigate(-1);
          }
          catch(err){
            console.log(err);
          }
        }
        else{
          setErrors("");
          try{
            const response=await instance.post('/signup',{
              name:"Dummy",
              email:email,
              password:password
            },
            {
              headers:{
                'Content-Type':'application/json'
              }
            });
            dispatch({
              type:'SET_TOKEN',
              token:response.data.token,
              premium:"Basic"
            });
            navigate('/');
          }
          catch(err){
            console.log(err);
          }
        }
      }
  };

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

  
  return (
    <div className={styles.login}>
      <div className={styles.wrapper}>
      <form action="">
        <h1>Welcome Back.</h1>
        <div className='OAuth'>
        <button type='submit' className='google'><FcGoogle className='google-icon'/>{register==="register"?"Sign Up":"Login"} with Google</button>
        </div>
        <div className='Or'><div>Or, sign {register==="register"?"up":"in"} with your email</div>
        </div>

        <div className="input-box">
            <input type="email" placeholder='name@email.com' id='email'required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className='icon'/>

        </div>
        
        <div className={styles.input_box}>
        <input
        type={isPasswordVisible ? 'text' : 'password'}
        id="password"
        name="password"
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
        <div onClick={togglePasswordVisibility} style={{cursor: 'pointer'}}>{isPasswordVisible ? <FaEye className={styles.icon} />:<FaEyeSlash className={styles.icon}/>}</div>
        </div>
        
        {err===""?<></>:<div id='error'>{err}</div>}


        {register!=="register" && <button type={err===""?'submit':'button'} onClick={(e)=>handleSubmit(e)} id='loginButton'>Login</button>}
        {register==="register" && <button type={err===""?'submit':'button'} onClick={(e)=>handleSubmit(e)} id='loginButton'>Register</button>}
        {!register==="register" && <div className="register-link">

            <p>Don't have an account? <a href="#">Register</a></p>
        </div>}
      </form>
    </div>
    </div>
  )
}

export default LoginForm
