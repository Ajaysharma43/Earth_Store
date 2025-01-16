import { configureStore } from '@reduxjs/toolkit'
import reducer from '../../Features/ProductSlice/Productslice'
import idreducer from '../../Features/Idslice/Idslice'

export default configureStore({
  reducer: {
    product : reducer,
    ID : idreducer
  },
})