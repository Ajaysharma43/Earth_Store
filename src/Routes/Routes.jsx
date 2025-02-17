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
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Loader from "../Components/Loaders/Loader";
import DashBoardProducts from "../Components/DashBoardPages/DashboardProductsPage/DashBoardProductsPage";
import Checkout from "../Pages/Checkout/Checkout";
import ORDERS from "../Pages/Orders/Orders";
import User_Profile from "../Pages/User_Profile/User_Profile";
import Checkout_Product from "../Components/CheckoutProduct/CheckoutProduct";
import Checkout_Product_Page from "../Pages/Checkout_Product/Checkout_Product";
import Payment_Status from "../Pages/Payment_Status/Payment_Status";

const Routes = () => {
    const Route = useRoutes([
        {element:<Homepage/>,path:"/"},
        {element:<About/>,path:"/About"},
        {element:<Product/>,path:"/Product/:id"},
        {element:<Cart/>,path:"/cart"},
        {element:<Shop/>,path:"/Shop"},
        {element:<Login/> , path:"/login"},
        {element:<Signup/>,path:"/Signup" },
        {element:<Checkout/>,path:"/Checkout"},
        {element:<ORDERS/>,path:"/Orders"},
        {element:<User_Profile/>,path:"/userProfile"},
        {element:<Checkout_Product_Page/> , path:"/CheckoutProduct/:id"},
        {element:<Payment_Status/> , path:"/Payment_Status/:id"},
        // {Unkown Routes}
        {element:<Unknowm/>,path:"*"},

        // {Dashboard Routers}
        {element:<DashboardHomepage/>,path:"/dashboard"},
        {element:<UploadPage/>,path:"/dashboard/upload"},
        {element:<DashBoardProducts/> , path:"/dashboard/products"},

        // {test component}
        {element:<Loader/> , path:"/Loader"}
    ])
    
    return Route;
}

export default Routes;