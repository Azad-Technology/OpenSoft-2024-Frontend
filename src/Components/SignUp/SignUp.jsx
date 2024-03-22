import React from 'react';
import instance from '../../axios';
import styles from './SignUp.module.css';
import { useStateValue } from '../../MyContexts/StateProvider';
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { useState, useNavigate } from 'react';

function SignUp() {
    const [{token,premium},dispatch]=useStateValue();
    const navigate=useNavigate;
    const [isPasswordVisible1, setisPasswordVisible1] = useState(false);
    const [isPasswordVisible2, setisPasswordVisible2] = useState(false);
    const [err, setErrors] = useState("")
    const [email, setEmail] = useState("");
    const [password,setPassword]=useState("");
    
    const handleChange = async(e) => {
      e.preventDefault();
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

          try{
            const response=await instance.post('/signup/',{
              name:"Dummy",
              email:email,
              password:password
            },
            {
              headers:{
                'Content-Type':'application/json'
              }
            });
            // console.log(response.data);
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
  };

  

  const handleGoogleClick = async () => {
    try{
      const response=await instance.get('/login/google');
      console.log(response);
      window.location.href = response.data.url;
    }
    catch(err){
      console.log(err);
    }
  }

    const togglePasswordVisibility1 = () => {
      setisPasswordVisible1(!isPasswordVisible1);
    };

    const togglePasswordVisibility2 = () => {
      setisPasswordVisible2(!isPasswordVisible2);
    };
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <form action="">
        <h1>Sign Up</h1>

        <div className={styles.OAuth}>
        <button type='submit' className={styles.google} onClick={handleGoogleClick}><FcGoogle style={{width: '1.25rem', height: '1.25rem'}} className={styles.googleIcon}/>Sign up with Google</button>
        </div>

        <hr className={styles.Or}/>

        {/* <div className={styles.text}>Full Name</div>

        <div className={styles.inputBox}>
            <input type="text" id='name'required />
            <FaUser style={{width: '1.25rem', height: '1.25rem'}} className={styles.icon}/>
        </div> */}

        <div className={styles.text}>Email<div className={styles.star}>*</div></div>

        <div className={styles.inputBox}>
            <input type="email" id='email'required 
            onChange={(e) => setEmail(e.target.value)}
            />
            {/* <MdEmail style={{width: '1.25rem', height: '1.25rem'}} className={styles.icon}></MdEmail> */}
        </div>

        <div className={styles.text}>Password<div className={styles.star}>*</div></div> 

        <div className={styles.inputBox}>
          <input
          type={isPasswordVisible1 ? 'text' : 'password'}
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        
          <div onClick={togglePasswordVisibility1} style={{cursor: 'pointer'}}>{isPasswordVisible1 ? <FaEye style={{width: '1.25rem', height: '1.25rem'}} className={styles.icon} />:<FaEyeSlash style={{width: '1.25rem', height: '1.25rem'}} className={styles.icon}/>}</div>
        </div>
        <div className={styles.text}>Confirm Password<div className={styles.star}>*</div></div>
        <div className={styles.inputBox}>
          <input
          type={isPasswordVisible2 ? 'text' : 'password'}
          id="confirm"
          name="confirm"
          required
        />
        
          <div onClick={togglePasswordVisibility2} style={{cursor: 'pointer'}}>{isPasswordVisible2 ? <FaEye style={{width: '1.25rem', height: '1.25rem'}} className={styles.icon} />:<FaEyeSlash style={{width: '1.25rem', height: '1.25rem'}} className={styles.icon}/>}</div>
        </div>
        
        {err===""?<></>:<div className={styles.error}>{err}</div>}

        <button type={err===""?'submit':'button'} onClick={(e) => (handleChange(e))} id='loginButton'>Register</button>
        <div className={styles.registerLink}>
            <p>Already have an account? <a href="/login">Sign in</a></p>
        </div>
      </form>
    </div>
    </div>
  )
}

export default SignUp
