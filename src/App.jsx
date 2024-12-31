import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes/Routes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default App;
