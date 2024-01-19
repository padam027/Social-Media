import React, { useRef, useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from '../../Utils/axiosClient';
import { KEY__ACCESS_TOKEN, setItem } from '../../Utils/localstroreManager';
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/Slices/appConfigSlice';
import { TOAST_SUCCESS } from '../../App';
import { FaEye, FaEyeSlash} from "react-icons/fa";


function Login() {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();
   const dispatch = useDispatch();
   

   
   async  function handleSubmit(e){

    try{
      e.preventDefault();
     const response = await axiosClient.post("auth/login", {email, password});
     setItem(KEY__ACCESS_TOKEN, response.result.accessToken);
     
 dispatch(showToast({
   type: TOAST_SUCCESS,
   message:"Successfully Login"
 }))
     
     navigate('/');
    
    }


    catch (e) {
      return Promise.reject(e);
    }

   }


       const  myInputRef = useRef(null);
        const [eye, setEye] = useState(true)
        
          

        function handlOpeneye (){
         
          if(myInputRef?.current?.type === "password"){
            myInputRef.current.type = "text";
            setEye(false);
          }  else{
            myInputRef.current.type = "password";
            setEye(true)
          }
        
           
        }

  return (
    <div className='Login'>
      <div className='Login-box'>
        <h3 className='header'>Login</h3>


        <form className='Login-form'   onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' className='email' placeholder='Enter Your Email' required  onChange={(e)=>{
            setEmail(e.target.value) }}/>

          <label htmlFor='password'>Password</label>
          <input type='password' id='password' className='password' placeholder='Enter Your Password' required ref={myInputRef}  onChange={(e)=>{
            setPassword(e.target.value)}} /> 
          <p className='eye' onClick={handlOpeneye}>{eye ? <FaEyeSlash /> : <FaEye />}</p>
            
            

          <input type='submit' value="Login" className='submit' id='sumbit' />
        </form>

        <p className='Login-para'> Do not have an Account?<Link to='/signup'className='link'> Sign-up</Link></p>


      </div>
        
        
        </div>
  )
}

export default Login