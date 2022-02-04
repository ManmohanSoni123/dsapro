import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomeSc from "./components/Home/HomeSc";
import Login from "./components/login/login";
import { UserAuthContextProvider } from "./components/context/userContext";
import PrivateRoutes from "./components/routers/privateRoutes";
import ProblemsList from "./components/problems/ProblemsList";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState("");
  const [addData,setAllData]=useState([]);
  const setUserIds = (id) => {
    console.log(id);
    setUserId(id);
  };
  const setData=(data)=>{
    setAllData(data);
  }

  return (
    <div className="App">
      <UserAuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Login setUserIds={setUserIds} />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/home" exact element={<HomeSc id={userId} />} />
              <Route
                path="/problems/:dsType"
                exact
                element={<ProblemsList id={userId} />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
