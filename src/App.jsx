import React, { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes/Routes";
import DashBoardRoutes from "./Routes/DashBoardRoutes";

function App() {

  return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
  );
}

export default App;
