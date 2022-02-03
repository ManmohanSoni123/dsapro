import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Login from '../login/login';
// import { auth } from '../login/login';
import { useUserAuth } from '../context/userContext';
const PrivateRoutes = ( {children})  => {
  let user = localStorage.getItem('user');  
 if(!user){
  alert("Login First");
return( 
     <Navigate to="/" />  

  );
}else
return      <Outlet/>;



}

export default PrivateRoutes;
