import React, { useEffect, useState } from "react";
import Cards from "./cards";
import app from "../firebase";
import { getDatabase, ref, child, get } from "firebase/database";
import { Grid, Button } from "@mui/material";
// import { useUserAuth } from "../context/userContext";
import { WindMillLoading } from 'react-loadingg';
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
function HomeSc(props) {
  const db = getDatabase();
  const dbRef = ref(db);
  const [id, setId] = useState(props.id);
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  // const { logout } = useUserAuth();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  console.log(isLoggedIn);
  if (isLoggedIn === false) {
    navigate("/");
  }

  

  const fetchData = () => {
    // console.log("HI");
    setLoading(true);
    get(child(dbRef, "Sheet1/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setAllData(snapshot.val());
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
    for (let i = 0; i < allData.length; ++i) {
      topicsSet.add(allData[i].Topic);
      // console.log(allData[i].Topic);
    }

    topics = [...topicsSet];
    console.log(topicsSet);
  }
  // function sout() {
  //   logout();
  //   navigate("/");
  // }
  return (
    <div>
      {/* <Button onClick={sout} variant="contained">
        SignOut
      </Button> */}
      {loading &&<WindMillLoading color="black"/>}
      {!loading && (
        <div>
          <h1>DSA 450 Cracker </h1>
          <Grid container>
            {topics.map((item) => (
              <Grid key={item} sm={3} xs={16}>
                <Cards Topic={item} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
}

export default HomeSc;
