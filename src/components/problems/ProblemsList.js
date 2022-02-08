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
import LinkIcon from "@mui/icons-material/Link";
import b2 from "../login/b2.jpg";
import { loginActions } from "../redux/auth";
import SearchIcon from "@mui/icons-material/Search";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useParams, useNavigate } from "react-router-dom";
import app from "../firebase";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sheetDataActions } from "../redux/sheetData";
import { WindMillLoading } from "react-loadingg";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Filters from "./Filters";

function ProblemsList() {
  const param = useParams();
  const navigate = useNavigate();
  const db = getDatabase();
  const dbRef = ref(db);
  const [loading, setLoading] = useState(true);
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [searchItem, setsearchItem] = useState("");
  const [filter, setFilter] = useState("all");
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
          //  console.log(snapshot.size);
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
  let totalQns = toPrintData.length;

  if (filter === "solved") {
    let index = 1;
    let tempArray = [];
    for (let i = 0; i < toPrintData.length; ++i) {
      if (toPrintData[i].solved === true) {
        tempArray.push({
          ...toPrintData[i],
          sNo: index,
        });
        ++index;
      }
    }
    toPrintData = [...tempArray];
  } else if (filter === "unsolved") {
    let index = 1;
    let tempArray = [];
    for (let i = 0; i < toPrintData.length; ++i) {
      if (toPrintData[i].solved === false) {
        tempArray.push({
          ...toPrintData[i],
          sNo: index,
        });
        ++index;
      }
    }
    toPrintData = [...tempArray];
  }

  const filterHandler = (filter) => {
    setFilter(filter);
  };

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
  const resetHandler = () => {
    setSolvedQuestions([]);
    pushSolvedInDatabase([]);
  };
  const sout = () => {
    signOut(auth);
    localStorage.removeItem("user");
    dispatch(loginActions.logout());
    navigate("/login");
  };
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
        <div style={{ marginTop: "3%" }}>
          <Box sx={{   width:"fullWidth"}}>
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

          <div style={{ marginBottom: "2%" }}>
            <Typography
              variant="h3"
              align="center"
              sx={{ color: "#431e42", fontFamily: "'Arvo', serif" }}
            >
              <AutoAwesomeIcon />
              {param.dsType}
            </Typography>
            <Typography variant="body1" align="center">
              <Link to="/"> Topics/ </Link>
              <Link to={"/problems/" + param.dsType}> {param.dsType} </Link>
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
                width: "60vw",
                margin: "auto",
              }}
            >
              <IconButton>
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 30, m: 0.5 }} orientation="vertical" />
              <InputBase
                name="title"
                sx={{ width: "90%" }}
                placeholder="Search Problem"
                color="#212121"
                value={searchItem}
                onChange={(event) => {
                  setsearchItem(event.target.value);
                }}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <Button onClick={resetHandler}>Reset</Button>
            </Paper>
          </div>
          <div style={{ marginTop: "2%" }}>
            <Filters filter={filterHandler} filterName={filter} />
            <Paper
              component="div"
              elevation="2"
              sx={{ width: "98%", overflow: "hidden", margin: "auto" }}
            >
              <TableContainer sx={{ backgroundColor: "#C993C7" }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#975EAB", color: "white" }}
                      >
                        ID
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#975EAB", color: "white" }}
                      >
                        Question(s)
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#975EAB", color: "white" }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#975EAB", color: "white" }}
                      >
                        Done({solvedQuestions.length}/{totalQns})
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {toPrintData
                      .filter((item) => {
                        if (searchItem == "") return item.Problem;
                        else if (
                          item.Problem.toLowerCase().includes(
                            searchItem.toLowerCase()
                          )
                        )
                          return item;
                      })
                      .map((item) => (
                        <TableRow key={item.sNo}>
                          <TableCell align="center">{item.sNo}</TableCell>
                          <TableCell align="center" style={{ color: "white" }}>
                            <a
                              href={item.URL}
                              style={{
                                color: "white",
                                textDecoration: "none",
                              }}
                              target="_blank"
                            >
                              <Typography
                                sx={{ fontFamily: "'Poppins', sans-serif" }}
                              >
                                {item.Problem}
                                <LinkIcon fontSize="large" />
                              </Typography>
                            </a>
                          </TableCell>
                          <TableCell align="center">
                            <h4
                              style={{
                                color: item.solved ? "green" : "red",
                                fontSize: "1rem",
                              }}
                            >
                              {item.solved ? "Solved" : "Unsolved"}
                            </h4>
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
          <Footer />
        </div>
      )}
    </div>
  );
}
export default ProblemsList;
