import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const GetData = createAsyncThunk('FetchData' , async() => {
    const Response = await axios.get(`${URL}/Data/data?limit=3`)
    console.log(Response.data.Data);
    return Response.data.Data
})

const initialState  = {
    isLoading : true,
    data : [],
    isError : false
}

const Reducer = createSlice({
    name:"DataFetch",
    initialState ,
    extraReducers: (builder) => {
        builder.addCase(GetData.fulfilled , (state , action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.data = action.payload;
        })
    }
})

export default Reducer.reducer;