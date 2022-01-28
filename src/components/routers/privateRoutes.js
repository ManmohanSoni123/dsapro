import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Login from '../login/login';
// import { auth } from '../login/login';
import { useUserAuth } from '../context/userContext';
const PrivateRoutes = ( {children})  => {
  let {user} = useUserAuth();
 if(user){
  
  return      <Outlet/>;
}else

alert("Login First");
return( 
     <Navigate to="/" />  

  );
}

export default PrivateRoutes;
