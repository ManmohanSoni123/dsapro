import "./App.css";
import React, { Suspense } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { WindMillLoading } from "react-loadingg";
const PrivateRoutes = React.lazy(() =>
  import("./components/routers/privateRoutes")
);
const HomeSc = React.lazy(() => import("./components/Home/HomeSc"));
const Login = React.lazy(() => import("./components/login/login"));
const ProblemsList = React.lazy(() =>
  import("./components/problems/ProblemsList")
);
const PageNotFound = React.lazy(() =>
  import("./components/pageNotFound/PageNotFound")
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<WindMillLoading color="black" size="large" />}>
          <Routes>
            <Route path="/problems" element={<Navigate replace to="/" />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<HomeSc />} />
              <Route path="/problems/:dsType" element={<ProblemsList />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
