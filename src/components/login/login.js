import React from "react";
import { Box, Paper, Button } from '@mui/material';
import app from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginActions } from "../redux/auth";
import { useNavigate } from "react-router-dom";
import b2 from './b2.jpg';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Checking if user already exist in localstorage
  const userId = localStorage.getItem("user");
  console.log(userId);
  if (userId !== null) {
    console.log("inside if");
    dispatch(loginActions.login(userId));
    navigate("/home");
  }

  const handleSignup = () => {
    const provider = new GoogleAuthProvider();

    console.log("signup");
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user.uid);
        localStorage.setItem("user", user.uid);

        dispatch(loginActions.login(user.uid));
        navigate("/");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        console.log(errorMessage);
        console.log("Error");
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div>
      <div style={{
        backgroundImage: `url(${b2})`, height: '99vh', backgroundPosition: 'center', backgroundSize: 'cover',
      }} />
      <Box component={Paper} elevation={15} sx={{ width: 'fit-content', position: 'absolute', top: '50%', left: '50%', margin: '-25px 0 0 -25px' }} > <Button onClick={handleSignup} size='large' variant='contained' sx={{
        background: '#b380b9', '&:hover': {
          background: '#7575b8',
          transform: 'scale(1.5)'
        }
      }} >Sign In</Button></Box>
    </div>
  );
}

export default Login;
