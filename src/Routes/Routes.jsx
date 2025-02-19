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
        <BlockCheckMiddleware>
        <AuthMiddleware>
          <About />
        </AuthMiddleware>
        </BlockCheckMiddleware>
      ),
      path: "/About",
    },
    {
      element: (
        <BlockCheckMiddleware>
        <AuthMiddleware>
          <Product />
        </AuthMiddleware>
        </BlockCheckMiddleware>
      ),
      path: "/Product/:id",
    },
    {
      element: (
        <BlockCheckMiddleware>
        <AuthMiddleware>
          <Cart />
        </AuthMiddleware>
        </BlockCheckMiddleware>
      ),
      path: "/cart",
    },
    {
      element: (
        <BlockCheckMiddleware>
        <AuthMiddleware>
          <Shop />
        </AuthMiddleware>
        </BlockCheckMiddleware>
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
        <BlockCheckMiddleware>
        <AuthMiddleware>
          <Checkout />
        </AuthMiddleware>
        </BlockCheckMiddleware>
      ),
      path: "/Checkout",
    },
    {
      element: (
        <BlockCheckMiddleware>
        <AuthMiddleware>
          <ORDERS />
        </AuthMiddleware>
        </BlockCheckMiddleware>
      ),
      path: "/Orders",
    },
    {
      element: (
        <BlockCheckMiddleware>
        <AuthMiddleware>
          <User_Profile />
        </AuthMiddleware>
        </BlockCheckMiddleware>
      ),
      path: "/userProfile",
    },
    {
      element: (
        <BlockCheckMiddleware>
        <AuthMiddleware>
          <Checkout_Product_Page />
        </AuthMiddleware>
        </BlockCheckMiddleware>
      ),
      path: "/CheckoutProduct/:id",
    },
    {
      element: (
        <BlockCheckMiddleware>
        <AuthMiddleware>
          <Payment_Status />
        </AuthMiddleware>
        </BlockCheckMiddleware>
      ),
      path: "/Payment_Status/:id",
    },
    {
      element: (
        <BlockCheckMiddleware>
        <AuthMiddleware>
          <Order_History />
        </AuthMiddleware>
        </BlockCheckMiddleware>
      ),
      path: "/Order_History",
    },
    {
      element: (
        <BlockCheckMiddleware>
        <AuthMiddleware>
          <Order_History_Status />
        </AuthMiddleware>
        </BlockCheckMiddleware>
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
