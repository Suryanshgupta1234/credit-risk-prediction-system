import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

import Home from "./pages/Home";
import BankerDashboard from "./pages/BankerDashboard";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/banker"
          element={<BankerDashboard />}
        />

      </Routes>

    </BrowserRouter>

  </React.StrictMode>
);