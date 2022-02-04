import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomeSc from "./components/Home/HomeSc";
import Login from "./components/login/login";
// import { UserAuthContextProvider } from "./components/context/userContext";
import PrivateRoutes from "./components/routers/privateRoutes";
import ProblemsList from "./components/problems/ProblemsList";
import { useSelector } from "react-redux";
function App() {
  // const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  // console.log(isLoggedIn);
  return (
    <div className="App">
      {/* <UserAuthContextProvider> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/home" exact element={<HomeSc />} />
            <Route path="/problems/:dsType" exact element={<ProblemsList />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* </UserAuthContextProvider> */}
    </div>
  );
}

export default App;
