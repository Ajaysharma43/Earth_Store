import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const Related = createAsyncThunk('RelatedProducts',async(id) => {
    const Response = await axios.post(`${URL}/Data/RelatedProduct`,{id})
    console.log(Response.data.result);
    return Response.data.result
})

const initialState = {
    data : [],
    isLoading : false , 
    isError : false
}

const reducer = createSlice({
    name:"Related",
    initialState,
    extraReducers : (builder) => {
        builder.addCase(Related.fulfilled , (state , action) => {
            state.data = action.payload;
            console.log(state.data);
        })
    }
})

export default reducer.reducer;