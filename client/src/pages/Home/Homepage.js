/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect}  from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getMyInfo } from '../../redux/Slices/appConfigSlice'

function Homepage() {
  const dispatch = useDispatch();


  useEffect(() => {
    
    dispatch(getMyInfo());

  
  },[dispatch]);
  return (
    <>
   <Navbar />
   
   <Outlet />
    </>
  )
}

export default Homepage
