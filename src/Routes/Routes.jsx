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
        <AuthMiddleware>
          <BlockCheckMiddleware>
            <Homepage />
          </BlockCheckMiddleware>
        </AuthMiddleware>
      ),
      path: "/",
    },
    {
      element: (
        <AuthMiddleware>
          <BlockCheckMiddleware>
            <About />
          </BlockCheckMiddleware>
        </AuthMiddleware>
      ),
      path: "/About",
    },
    {
      element: (
        <AuthMiddleware>
          <BlockCheckMiddleware>
            <Product />
          </BlockCheckMiddleware>
        </AuthMiddleware>
      ),
      path: "/Product/:id",
    },
    {
      element: (
        <AuthMiddleware>
          <BlockCheckMiddleware>
            <Cart />
          </BlockCheckMiddleware>
        </AuthMiddleware>
      ),
      path: "/cart",
    },
    {
      element: (
        <AuthMiddleware>
          <BlockCheckMiddleware>
            <Shop />
          </BlockCheckMiddleware>
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
          <BlockCheckMiddleware>
            <Checkout />
          </BlockCheckMiddleware>
        </AuthMiddleware>
      ),
      path: "/Checkout",
    },
    {
      element: (
        <AuthMiddleware>
          <BlockCheckMiddleware>
            <ORDERS />
          </BlockCheckMiddleware>
        </AuthMiddleware>
      ),
      path: "/Orders",
    },
    {
      element: (
        <AuthMiddleware>
          <BlockCheckMiddleware>
            <User_Profile />
          </BlockCheckMiddleware>
        </AuthMiddleware>
      ),
      path: "/userProfile",
    },
    {
      element: (
        <AuthMiddleware>
          <BlockCheckMiddleware>
            <Checkout_Product_Page />
          </BlockCheckMiddleware>
        </AuthMiddleware>
      ),
      path: "/CheckoutProduct/:id",
    },
    {
      element: (
        <AuthMiddleware>
          <BlockCheckMiddleware>
            <Payment_Status />
          </BlockCheckMiddleware>
        </AuthMiddleware>
      ),
      path: "/Payment_Status/:id",
    },
    {
      element: (
        <AuthMiddleware>
          <BlockCheckMiddleware>
            <Order_History />
          </BlockCheckMiddleware>
        </AuthMiddleware>
      ),
      path: "/Order_History",
    },
    {
      element: (
        <AuthMiddleware>
          <BlockCheckMiddleware>
            <Order_History_Status />
          </BlockCheckMiddleware>
        </AuthMiddleware>
      ),
      path: "/Order_History_Status/:id",
    },
    // {Unkown Routes}
    { element: <Unknowm />, path: "*" },
    { element: <BlockedUserPage />, path: "/BlockedUserpage" },

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
