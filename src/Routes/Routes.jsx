import React from "react";
import { useRoutes } from "react-router-dom";
import Homepage from "../Pages/Homepage/Homepage";
import About from "../Pages/About/About";

const Routes = () => {
    const Route = useRoutes([
        {element:<Homepage/>,path:"/"},
        {element:<About/>,path:"/About"}
    ])
    
    return Route;
}

export default Routes;