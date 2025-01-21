import React from "react";
import { useRoutes } from "react-router-dom";
import Homepage from "../Pages/Homepage/Homepage";
import About from "../Pages/About/About";
import Product from "../Pages/Product/Product";
import Unknowm from "../Components/Unknown_Route/Unknown";
import Cart from "../Pages/Cart/Cart";
import DashboardHomepage from "../Components/DashBoardPages/HomePage/HomePage";
import UploadPage from "../Components/DashBoardPages/UploadPage/Upload";
import Shop from "../Pages/Shop/Shop";

const Routes = () => {
    const Route = useRoutes([
        {element:<Homepage/>,path:"/"},
        {element:<About/>,path:"/About"},
        {element:<Product/>,path:"/Product/:id"},
        {element:<Cart/>,path:"/cart"},
        {element:<DashboardHomepage/>,path:"/dashboard"},
        {element:<UploadPage/>,path:"/dashboard/upload"},
        {element:<Unknowm/>,path:"*"},
        {element:<Shop/>,path:"/Shop"}
    ])
    
    return Route;
}

export default Routes;