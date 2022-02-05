import React, { useState, useEffect } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Typography,
  Button,
  IconButton,
  Divider,
  InputBase,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useParams } from "react-router-dom";
import app from "../firebase";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sheetDataActions } from "../redux/sheetData";
import { WindMillLoading } from "react-loadingg";

function ProblemsList() {
  const param = useParams();

  const db = getDatabase();
  const dbRef = ref(db);
  const [loading, setLoading] = useState(true);
  const [solvedQuestions, setSolvedQuestions] = useState([]);

  const dispatch = useDispatch();
  // console.log(param.dsType);
  const allData = useSelector((state) => state.Dsa450.Dsasheet);
  const [userId, setUserId] = useState(
    useSelector((state) => state.login.loginId)
  );
  const fetchTopicData = () => {
    setLoading(true);
    get(child(dbRef, "Sheet1/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          // console.log("insede frtchtopic data");
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

  const fetchSolvedQnsOfUser = () => {
    setLoading(true);
    get(child(dbRef, `user/${userId}/${param.dsType}/done`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setSolvedQuestions(snapshot.val());

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
    fetchTopicData();
    fetchSolvedQnsOfUser();
  }, [userId]);

  let toPrintData = [];
  let index = 1;
  for (let i = 0; i < allData.length; ++i) {
    if (allData[i].Topic === param.dsType) {
      let flag = false;
      for (let j = 0; j < solvedQuestions.length; ++j) {
        if (solvedQuestions[j] == i) {
          flag = true;
          break;
        }
      }
      if (flag === true) {
        toPrintData.push({
          ...allData[i],
          sNo: index,
          idOfQn: i,
          solved: true,
        });
      } else {
        toPrintData.push({
          ...allData[i],
          sNo: index,
          idOfQn: i,
          solved: false,
        });
      }

      ++index;
    }
  }
  // console.log(toPrintData);
  const pushSolvedInDatabase = (tempArray) => {
    // console.log("I amcc");
    // console.log(tempArray);
    set(ref(db, `user/${userId}/${param.dsType}`), {
      done: tempArray,
    });
  };
  const changeHandler = (idOfQn, sno) => {
    let temp = false;
    let tempArray = [];
    for (let i = 0; i < solvedQuestions.length; ++i) {
      if (solvedQuestions[i] === idOfQn) {
        temp = true;
      } else {
        tempArray.push(solvedQuestions[i]);
      }
    }
    if (temp === false) tempArray.push(idOfQn);
    setSolvedQuestions(tempArray);
    pushSolvedInDatabase(tempArray);
  };
  // console.log(userId);
  return (
    <>
      {loading && <WindMillLoading color="black" size="small" />}
      {!loading && (
        <div style={{ marginTop: "7%" }}>
          <div style={{ marginBottom: "2%" }}>
            <Typography variant="h3" align="center">
              <AutoAwesomeIcon />
              Topic_Name
            </Typography>
            <Typography variant="body1" align="center">
              Topics/Topic_Name
            </Typography>
          </div>
          <div>
            <Paper
              component="form"
              elevation={10}
              sx={{
                p: "2px 4px",
                mt: 2,
                display: "flex",
                width: 600,
                margin: "auto",
              }}
            >
              <IconButton>
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 30, m: 0.5 }} orientation="vertical" />
              <InputBase
                name="title"
                sx={{ width: 600 }}
                placeholder="Search Problem"
                color="#212121"
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <Button>Reset</Button>
            </Paper>
          </div>
          <div style={{ marginTop: "2%" }}>
            <Paper
              component="div"
              elevation="2"
              sx={{ width: "70%", overflow: "hidden", margin: "auto" }}
            >
              <TableContainer
                sx={{ maxHeight: 440, backgroundColor: "#455a64" }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#37474f", color: "white" }}
                      >
                        ID
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#37474f", color: "white" }}
                      >
                        Question(s)
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#37474f", color: "white" }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#37474f", color: "white" }}
                      >
                        Done
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {toPrintData.map((item) => (
                      <TableRow key={item.sNo}>
                        <TableCell align="center">{item.sNo}</TableCell>
                        <TableCell align="center" style={{ color: "white" }}>
                          <a
                            href={item.URL}
                            style={{ color: "white", textDecoration: "none" }}
                            target="_blank"
                          >
                            {item.Problem}
                          </a>
                        </TableCell>
                        <TableCell align="center">
                          {item.solved ? "Solved" : "Unsolved"}
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={item.solved}
                            onChange={(e) =>
                              changeHandler(item.idOfQn, item.sNo)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
      )}
    </>
  );
}
export default ProblemsList;
