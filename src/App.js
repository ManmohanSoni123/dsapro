import "./App.css";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import HomeSc from "./components/Home/HomeSc";
import Login from "./components/login/login";
// import { UserAuthContextProvider } from "./components/context/userContext";
import PrivateRoutes from "./components/routers/privateRoutes";
import ProblemsList from "./components/problems/ProblemsList";

function App() {
  return (
    <div className="App">
      {/* <UserAuthContextProvider> */}
      <BrowserRouter>
        <Routes>
          <Route path="/problems" element={<Navigate replace to="/home" />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomeSc />} />
            <Route path="/problems/:dsType" element={<ProblemsList />} />
          </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      {/* </UserAuthContextProvider> */}
    </div>
  );
}

export default App;
