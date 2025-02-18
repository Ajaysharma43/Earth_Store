import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const GetAllProducts = createAsyncThunk('AllProducts' , async() => {
    const Response = await axios.get(`${URL}/Data/AllData`)
    return Response.data
})

export const GetAllUsers = createAsyncThunk('GetAllUsers' , async() => {
    const Response = await axios.get(`${URL}/Data/AllUsers`)
    return Response.data
})

const initialState = {
    AllProducts : [],
    AllUsers : [],
    ProductsLength : null,
    UsersLength : null,
    error : null,
    loading : null
}

const DashboardReducer = createSlice({
    initialState , 
    name : "DashboardReducer",
    extraReducers : (builder) => {
        builder.addCase(GetAllProducts.fulfilled , (state , action) => {
            state.AllProducts = action.payload.Data
            state.ProductsLength = action.payload.Data.length
        })

        builder.addCase(GetAllUsers.fulfilled , (state , action) => {
            state.AllUsers = action.payload.Users
            state.UsersLength = action.payload.Users.length
        })
    }
})

export default DashboardReducer.reducer