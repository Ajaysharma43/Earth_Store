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
import Checkout_Product_Page from "../Pages/Checkout_Product/Checkout_Product";
import Payment_Status from "../Pages/Payment_Status/Payment_Status";
import Order_History from "../Pages/Order_History/Order_History";
import Order_History_Status from "../Pages/Order_HIstory_Status/Order_HIstory_Status";
import DashboardUsersPage from "../Components/DashBoardPages/DashboardUsersPage/DashBoardUsersPage";
import DashBoardProductDetails from "../Components/DashBoard/DashBoardUsersComponent/DashboardProductDetails";
import RoleVerifyMiddleware from "../../Middlewares/RoleVerify";
import AuthMiddleware from "../../Middlewares/AuthMiddleware";
import BlockedUserPage from "../Pages/BlockedPage/BlockedPage";
import BlockCheckMiddleware from "../../Middlewares/BlockCheckMiddleware";

const Routes = () => {
  const Route = useRoutes([
    {
      element: (
        <BlockCheckMiddleware>
        <AuthMiddleware>
          <Homepage />
        </AuthMiddleware>
        </BlockCheckMiddleware>
      ),
      path: "/",
    },
    {
      element: (
        <AuthMiddleware>
          <About />
        </AuthMiddleware>
      ),
      path: "/About",
    },
    {
      element: (
        <AuthMiddleware>
          <Product />
        </AuthMiddleware>
      ),
      path: "/Product/:id",
    },
    {
      element: (
        <AuthMiddleware>
          <Cart />
        </AuthMiddleware>
      ),
      path: "/cart",
    },
    {
      element: (
        <AuthMiddleware>
          <Shop />
        </AuthMiddleware>
      ),
      path: "/Shop",
    },
    {
      element: <Login />,
      path: "/login",
    },
    {
      element: <Signup />,
      path: "/Signup",
    },
    {
      element: (
        <AuthMiddleware>
          <Checkout />
        </AuthMiddleware>
      ),
      path: "/Checkout",
    },
    {
      element: (
        <AuthMiddleware>
          <ORDERS />
        </AuthMiddleware>
      ),
      path: "/Orders",
    },
    {
      element: (
        <AuthMiddleware>
          <User_Profile />
        </AuthMiddleware>
      ),
      path: "/userProfile",
    },
    {
      element: (
        <AuthMiddleware>
          <Checkout_Product_Page />
        </AuthMiddleware>
      ),
      path: "/CheckoutProduct/:id",
    },
    {
      element: (
        <AuthMiddleware>
          <Payment_Status />
        </AuthMiddleware>
      ),
      path: "/Payment_Status/:id",
    },
    {
      element: (
        <AuthMiddleware>
          <Order_History />
        </AuthMiddleware>
      ),
      path: "/Order_History",
    },
    {
      element: (
        <AuthMiddleware>
          <Order_History_Status />
        </AuthMiddleware>
      ),
      path: "/Order_History_Status/:id",
    },
    // {Unkown Routes}
    { element: <Unknowm />, path: "*" },
    {element : <BlockedUserPage/> , path:"/BlockedUserpage"},

    // {Dashboard Routers}
    {
      element: (
        <AuthMiddleware>
          <RoleVerifyMiddleware>
            <DashboardHomepage />
          </RoleVerifyMiddleware>
        </AuthMiddleware>
      ),
      path: "/dashboard",
    },
    {
      element: (
        <AuthMiddleware>
          <RoleVerifyMiddleware>
            <UploadPage />
          </RoleVerifyMiddleware>
        </AuthMiddleware>
      ),
      path: "/dashboard/upload",
    },
    {
      element: (
        <AuthMiddleware>
          <RoleVerifyMiddleware>
            <DashBoardProducts />
          </RoleVerifyMiddleware>
        </AuthMiddleware>
      ),
      path: "/dashboard/products",
    },
    {
      element: (
        <AuthMiddleware>
          <RoleVerifyMiddleware>
            <DashboardUsersPage />
          </RoleVerifyMiddleware>
        </AuthMiddleware>
      ),
      path: "/dashboard/Users",
    },
    {
      element: (
        <AuthMiddleware>
          <RoleVerifyMiddleware>
            <DashBoardProductDetails />
          </RoleVerifyMiddleware>
        </AuthMiddleware>
      ),
      path: "/dashboard/User/:id",
    },

    // {test component}
    { element: <Loader />, path: "/Loader" },
  ]);

  return Route;
};

export default Routes;
