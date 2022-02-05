import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Login from "../login/login";
// import { auth } from '../login/login';
import { useDispatch } from "react-redux";
import { useUserAuth } from "../context/userContext";
import { loginActions } from "../redux/auth";
const PrivateRoutes = ({ children }) => {
  const dispatch = useDispatch();
  let user = localStorage.getItem("user");
  console.log(user);
  if (user === null) {
    alert("Login First");
    return <Navigate to="/" />;
  } else {
    console.log("else");
    dispatch(loginActions.login(user));
    return <Outlet />;
  }
};

export default PrivateRoutes;
