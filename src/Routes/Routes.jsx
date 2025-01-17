import React from "react";
import { useRoutes } from "react-router-dom";
import Homepage from "../Pages/Homepage/Homepage";
import About from "../Pages/About/About";
import Product from "../Pages/Product/Product";
import Unknowm from "../Components/Unknown_Route/Unknown";

const Routes = () => {
    const Route = useRoutes([
        {element:<Homepage/>,path:"/"},
        {element:<About/>,path:"/About"},
        {element:<Product/>,path:"/Product/:id"},
        {element:<Unknowm/>,path:"*"}
    ])
    
    return Route;
}

export default Routes;