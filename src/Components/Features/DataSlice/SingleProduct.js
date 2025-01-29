import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie'

const URL = import.meta.env.VITE_API_URL;

export const Single_Product = createAsyncThunk('Single_Product' , async(id) =>{
    const Response = await axios.post(`${URL}/Data/Product`, { id })
    console.log(Response.data.Product);
    return Response.data.Product
})

export const UpdateUserReveiws = createAsyncThunk('UpdateUserReviews' , async({ProductID,ID,Review}) => { 
    const USERID = Cookies.get('ID')
    console.log(USERID);
    
    const response = await axios.put(`${URL}/Data/UpdateReview`,{USERID , ID , Review , ProductID})
    return response.data
})

const initialState = {
    SingleProduct: {},
    isloading : true,
    iserror : false
}

const Reducer = createSlice({
    name:"Single_Product",
    initialState,
    extraReducers : (builder) => {
        builder.addCase(Single_Product.fulfilled , (state , action) => {
            state.SingleProduct = action.payload;
            state.isloading = false
            console.log(state.SingleProduct,"slicee");
        })
        builder.addCase(UpdateUserReveiws.fulfilled , (state , action) => {
            console.log(action.payload.updatedProduct);
            state.SingleProduct = action.payload.updatedProduct 
         })
    }
})

export default Reducer.reducer;