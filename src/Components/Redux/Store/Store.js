import { configureStore } from '@reduxjs/toolkit'
import reducer from '../../Features/ProductSlice/Productslice'
import idreducer from '../../Features/Idslice/Idslice'
import Cartreducer from "../../Features/CartSlice/CartSlice"
import QunaityReducer from "../../Features/CartQuantity/CartQunatity"
import DataFetchReducer from "../../Features/DataSlice/DataSlice"
import SingleProduct  from "../../Features/DataSlice/SingleProduct"
import Product from "../../Features/ProductSlice/Productslice"
import related from "../../Features/DataSlice/RelatedProducts"
import Otp from "../../Features/AuthSlice/Signup"
import Login from "../../Features/AuthSlice/Login"
import CheckoutReducer from "../../Features/Checkout/Checkout"
import DashboardReducer from "../../Features/DashboardSlice/DashboardData"

export default configureStore({
  reducer: {
    product : reducer,
    ID : idreducer,
    Cart : Cartreducer,
    Qunatity : QunaityReducer,
    Product : Product,
    Data : DataFetchReducer,
    SingleProduct : SingleProduct,
    related : related,
    UserData : Otp,
    Login : Login,
    Checkout : CheckoutReducer,
    Dashboardreducer : DashboardReducer
  },
})