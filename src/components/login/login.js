import React, { useState } from "react";
import "./style.css";
import Adddata from "../database/firestore";
import { useNavigate } from "react-router-dom";
import createUserDocument from "../database/createUserDocs";
import { Box, Grid, Button, TextField } from "@mui/material";
import { useUserAuth } from "../context/userContext";


function Login(props) {
  //formmhandling

  const [error, setError] = useState("");
  const { register, login } = useUserAuth();

  const navigate = useNavigate();
  const [loginform, setloginform] = useState({
    email: "",
    password: "",
  });
  function handleOnChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setloginform((previnfo) => {
      return { ...previnfo, [name]: value };
    });
  }
  //Authentication
  function Register() {
    register(loginform.email, loginform.password)
      .then((res) => {
        console.log(res);
     
        props.setUserIds(res.user.uid);
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
        alert(err);
      });
  }

  function signin() {
    // signInWithEmailAndPassword(loginform.email,loginform.password).then(res => {

    login(loginform.email, loginform.password)
      .then((res) => {
        alert("Login Sucessfull");
        // setUser(res);
        // Adddata(res);
        props.setUserIds(res.user.uid);

        navigate("/");
        
        // createUserDocument(res);
      })
      .catch((err) => {
        alert("Login UnSucessfull");
      });
  }

  return (
    <div>
      <Box type="form" className="login-page">
        <Grid
          container
          direction="column"
          spacing={5}
          sm={12}
          className="container"
        >
          <Grid item sm={6}>
            <TextField
              className="login-text"
              onChange={handleOnChange}
              type="email"
              name="email"
              placeholder="Enter Your mail"
              value={loginform.email}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              className="login-text"
              onChange={handleOnChange}
              type="password"
              name="password"
              placeholder="Enter Password"
              value={loginform.password}
            />
          </Grid>
          <Grid item sm={6}>
            <Button
              style={{ margin: "auto 5%" }}
              className="login-button"
              variant="contained"
              onClick={Register}
            >
              Register
            </Button>

            <Button
              className="login-button"
              variant="contained"
              onClick={signin}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Login;
