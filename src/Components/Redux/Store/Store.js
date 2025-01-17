import { configureStore } from '@reduxjs/toolkit'
import reducer from '../../Features/ProductSlice/Productslice'
import idreducer from '../../Features/Idslice/Idslice'
import Cartreducer from "../../Features/CartSlice/CartSlice"
import QunaityReducer from "../../Features/CartQuantity/CartQunatity"

export default configureStore({
  reducer: {
    product : reducer,
    ID : idreducer,
    Cart : Cartreducer,
    Qunatity : QunaityReducer,
  },
})