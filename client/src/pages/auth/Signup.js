import React,{useRef, useState} from'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.scss'
import { axiosClient } from '../../Utils/axiosClient';
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/Slices/appConfigSlice';
import { TOAST_SUCCESS } from '../../App';
import { FaEye, FaEyeSlash} from "react-icons/fa";

function Signup() {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();
   const dispatch = useDispatch();

   async  function handleSubmit(e){
    
  
    try{
      e.preventDefault();
     
      await axiosClient.post('/auth/register', { email, password, name, phone});

   dispatch(showToast({
      type:TOAST_SUCCESS,
       message: "Successfully Registered"

   }))

     navigate('/login')
      
    
    
    }
    catch (err) {
      console.log(" Error during register :", err);
    }

   }


   const  myInputRef = useRef(null);
        const [eye, setEye] = useState(true)
        
          

        function handlOpeneye (){
         
          if(myInputRef?.current?.type === "password"){
            myInputRef.current.type = "text";
            setEye(false); 
          } else{
            myInputRef.current.type = "password";
            setEye(true)
        
          }
        }


  return (
    <div className='Signup'>
<div className='Signup-box'>
        <h3 className='header'>Signup</h3>

        <form className='Signup-form' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
          <input type='text' id='name' className='name' placeholder='Set Your Name' required 
          onChange={(e) => setName(e.target.value)} />

          <label htmlFor='phone'>Phone</label>
          <input type='text' id='phone' className='phone' placeholder='Set Your Phone Number' required
          onChange={(e) => setPhone(e.target.value)} />

          <label htmlFor='email'>Email</label>
          <input type='email' id='email' className='email' placeholder='Set Your Email' required 
          onChange={(e) => setEmail(e.target.value)}/>

          <label htmlFor='password'>Password</label>
          <input type='password' id='password' className='password' placeholder='Set Your Password' required
          onChange={(e) => setPassword(e.target.value)}  ref={myInputRef} ></input> 

           <p className='eye' onClick={handlOpeneye}>{eye ? <FaEyeSlash /> : <FaEye />}</p>

          <input type='submit' className='submit' id='sumbit' />
        </form>

        <p className='Signup-para'> Already Have an Account?<Link to='/login'className='link'> Log-in</Link></p>


      </div>




    </div>
  )
}

export default Signup