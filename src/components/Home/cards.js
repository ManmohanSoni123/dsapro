import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { getDatabase, ref, child, get, set } from "firebase/database";

import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

function Cards(props) {
  const navigate = useNavigate();
  const [doneQuestions, setdoneQuestions] = useState(0);
  const [isStarted, setisStarted] = useState(true);
  // const [isStartedQues,setisStartedQues] = useState("Started");

  const db = getDatabase();
  const dbRef = ref(db);
  const [userId, setUserId] = useState(
    useSelector((state) => state.login.loginId)
  );
  const fetchSolvedQnsOfUser = () => {
    // setLoading(true);
    get(child(dbRef, `user/${userId}/${props.Topic}/done`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setdoneQuestions(snapshot.size);

          // setLoading(false);
        } else {
          setisStarted(false);
          // console.log("snapshot dont exist");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchSolvedQnsOfUser();
  });
  return (
    <div style={{ margin: "2%" }}>
      <CardActionArea
        sx={[
          {
            width: 230,
            height: 300,
            "&:hover": {
              boxShadow: "0 6px 12px 0 #d4a5d0",
              transform: "scale(1.04)",
            },
          },
        ]}
        onClick={() => {
          navigate(`/problems/${props.Topic}`);
        }}
      >
        <Card sx={[{
          width: 230, height: 303, background: 'linear-gradient(45deg, #9c55a7 30%, #e273df 90%)', color: 'black', cursor: "pointer",
        },]}>
          <CardMedia
            sx={[
              {
                width: 180,
                height: 175,
                margin: "auto auto 5px auto",
              },
            ]}
            component="png"
            image={require("./structureddata.png")}
          />
          <CardContent
            sx={{
              background: "linear-gradient(45deg, #b380b9 30%, #7575b8 90%)",
              color: "black",
            }}
          >
            <Typography variant="h6" sx={{fontFamily:"'Roboto Slab', serif" }}>{props.Topic}</Typography>
            <Typography variant="body2"  sx={{fontFamily: "'Poppins', sans-serif" }}>
              Done Questions: {doneQuestions}/{props.Total}
            </Typography>
            <Typography variant="body2" color={isStarted ? "green" : "red"}  sx={{fontFamily: "'Poppins', sans-serif" }}>
              {" "}
              {isStarted ? "Started" : "Not Yet Started"}{" "}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </div>
  );
}

export default Cards;
