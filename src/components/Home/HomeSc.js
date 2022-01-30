import React, { useEffect, useState } from "react";
import Cards from "./cards";
import app from "../firebase";
import { getDatabase, ref, child, get } from "firebase/database";
import { Grid } from "@mui/material";
function HomeSc(props) {
  const db = getDatabase();
  const dbRef = ref(db);
  const [id, setId] = useState(props.id);
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);
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
          console.log("snapshot dont exise");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading && <p>Loading</p>}
      {!loading && (
        <div>
          <h1>DSA 450 Cracker </h1>
          {/* <Grid container sm={4}>
            <Grid items>
              <Cards />
            </Grid>
          </Grid> */}
          {allData.map((item) => (
            <Cards item={item}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeSc;
