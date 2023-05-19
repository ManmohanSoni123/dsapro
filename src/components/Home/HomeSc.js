import React, { useEffect, useState } from "react";
import Cards from "./cards";
import app from "../firebase";
import { getDatabase, ref, child, get } from "firebase/database";
import b2 from "../login/b2.jpg";
import {
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { auth } from "../firebase";
import { WindMillLoading } from "react-loadingg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sheetDataActions } from "../redux/sheetData";
import { signOut } from "firebase/auth";
import { loginActions } from "../redux/auth";
import Footer from "../Footer/Footer";

function HomeSc(props) {
  const db = getDatabase();
  const dbRef = ref(db);
  const [id, setId] = useState(props.id);
  const [loading, setLoading] = useState(true);
  // const [allData, setAllData] = useState([]);
  // const { logout } = useUserAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.Dsa450.Dsasheet);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  // console.log(isLoggedIn);

  if (isLoggedIn === false) {
    navigate("/login");
  }

  const fetchData = () => {
    // console.log("HI");
    setLoading(true);
    get(child(dbRef, "Sheet1/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          dispatch(sheetDataActions.setDsaData(snapshot.val()));

          setLoading(false);
        } else {
          console.log("snapshot dont exist");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  let topics = [];
  if (!loading) {
    let topicsSet = new Set();
    let topicMap = {};
    // for (let i = 0; i < allData.length; ++i) {
    for (const element of allData) {
      if (topicMap[element.Topic]) {
        topicMap[element.Topic] += 1;
      } else {
        topicMap[element.Topic] = 1;
      }
    }
    for (var key in topicMap) {
      topics.push({ Topic: key, Total: topicMap[key] });
    }
  }
  function sout() {
    signOut(auth);
    localStorage.removeItem("user");
    dispatch(loginActions.logout());
    navigate("/login");
  }
  return (
    <div
      style={{
        backgroundImage: `url(${b2})`,
        height: "99vh",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {loading && <WindMillLoading color="black" size="large" />}
      {!loading && (
        <div>
          <Box
            sx={{
              marginX: "45%",
              width: "10%",
              marginTop: "1%",
              marginBottom: "1%",
              width:"fullWidth"
            }}
          >
            <Button
              onClick={sout}
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #9c55a7 30%, #e273df 90%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #ddbadc 30%, #ccbbdb 90%)",
                  color: "black",
                },
                align:"center",
                width:"7rem"
              }}
            >
              Sign Out
            </Button>
          </Box>
            

           
          <Card
            component={Paper}
            elevation={15}
            sx={{
              borderRadius: "10px",
              width: "19rem",
              height: 100,
              margin: "auto",
              background: "linear-gradient(45deg, #9c55a7 30%, #e273df 90%)",
              color: "white",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                sx={{
                  margin: "auto",
                  // position: "absolute",
                  top: "11.3%",
                  left: "42.8%",
                  fontFamily: "'Arvo', serif",
                  align:"center"
                }}
              >
                DSA Cracker
              </Typography>
            </CardContent>
          </Card>
           
          <Grid
            container
            align="center"
            sx={{ background: "focus.png", marginTop: "2%" }}
            spacing={5}
          >
            {topics.map((item) => (
              <Grid key={item.Topic} xl={12} sm={6} xs={12} lg={3} md={3}>
                <Cards Topic={item.Topic} Total={item.Total} />
              </Grid>
            ))}
          </Grid>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default HomeSc;
