import React from 'react'
import { KEY__ACCESS_TOKEN, getItem } from '../Utils/localstroreManager'
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoute() {

    const user = getItem(KEY__ACCESS_TOKEN);
  return (
    !user?  <Outlet /> : <Navigate to ='/' />  
    
  )
}

export default PublicRoute;