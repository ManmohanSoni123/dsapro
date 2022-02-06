import React, { useEffect, useState } from "react";
import Cards from "./cards";
import app from "../firebase";
import { getDatabase, ref, child, get } from "firebase/database";
import {
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  Paper,
  Box,
} from "@mui/material";
// import { useUserAuth } from "../context/userContext";
import { auth } from "../firebase";
import { WindMillLoading } from "react-loadingg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sheetDataActions } from "../redux/sheetData";
import { signOut } from "firebase/auth";
import { loginActions } from "../redux/auth";
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
    <div>
      {/* <Button onClick={sout} variant="contained">
        SignOut
      </Button> */}
      {loading && <WindMillLoading color="black" size="large" />}
      {!loading && (
        <div>
          <Box sx={{ marginX: "90.5%", width: "10%", marginTop: "1%" }}>
            <Button
              onClick={sout}
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #b380b9 30%, #7575b8 90%)",
                color: "black",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #b380b9 30%, #7575b8 90%)",
                  color: "black",
                },
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
              width: 350,
              height: 100,
              margin: "auto",
              color: "black",
              background: "linear-gradient(45deg, #b380b9 30%, #7575b8 90%)",
              color: "black",
            }}
          >
            <CardContent>
              <Typography variant="h4" sx={{ margin: "auto" }}>
                DSA Crackers
              </Typography>
            </CardContent>
          </Card>
          <Grid container align="center" sx={{ background: "focus.png", marginTop: "2%" }}>
            {topics.map((item) => (
              <Grid key={item.Topic} xl={12} sm={3} xs={6}>
                <Cards Topic={item.Topic} Total={item.Total} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
}

export default HomeSc;
