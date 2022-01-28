import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomeSc from "./components/Home/HomeSc";
import Login from "./components/login/login";
import { UserAuthContextProvider } from "./components/context/userContext";
import PrivateRoutes from "./components/routers/privateRoutes";

function App() {
  
  return (
    <div className="App">
      <UserAuthContextProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<HomeSc />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
