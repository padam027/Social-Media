import React from 'react';
import './Navbar.scss';
import Avatar from '../avatar/Avatar';
import {  useNavigate } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { axiosClient } from '../../Utils/axiosClient';
import { KEY__ACCESS_TOKEN, removeItem } from '../../Utils/localstroreManager';
import { showToast } from '../../redux/Slices/appConfigSlice';
import { TOAST_SUCCESS } from '../../App';



function Navbar() {


 const navigate = useNavigate();
 const dispatch = useDispatch();
 

const myProfile = useSelector(state => state.appConfigReducer.myProfile);


   


  async function handleLogout(){
    try{


       const yes = window.confirm(`Are you sure ${myProfile?.name}!`);

       if(yes){
    await axiosClient.post('/auth/logout');
    removeItem(KEY__ACCESS_TOKEN);

     dispatch(showToast({
 type: TOAST_SUCCESS,
  message: "Successfully Logout"

     }))
      
  
  

    }

  }
 catch (e){
   console.log("error during logout", e)

 }

 

  }

  return (

 
 <div className='navbar'>
 <div className='container' >
  <div className='logo' onClick={() => navigate("/")}>Social Media</div>
 <ul className='ul'>
  <li  onClick={()=> navigate(`/profile/${myProfile?._id}`)}>
    <Avatar src={myProfile?.avatar?.url} /> 
    </li>
  <li onClick={handleLogout}><IoMdLogOut className='logout' /> </li>
 </ul>

 </div>

 </div>
    
  )}

export default Navbar