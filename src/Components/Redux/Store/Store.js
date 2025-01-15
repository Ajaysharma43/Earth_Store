import { configureStore } from '@reduxjs/toolkit'
import reducer from '../../Features/ProductSlice/Productslice'

export default configureStore({
  reducer: {
    product : reducer,
  },
})