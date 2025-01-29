import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie'

const URL = import.meta.env.VITE_API_URL;

export const Single_Product = createAsyncThunk('Single_Product' , async(id) =>{
    const Response = await axios.post(`${URL}/Data/Product`, { id })
    console.log(Response.data.Product);
    return Response.data.Product
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
    }
})

export default Reducer.reducer;