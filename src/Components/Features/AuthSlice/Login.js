import { Token } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const URL = import.meta.env.VITE_API_URL;

export const VerifyUser = createAsyncThunk('VerifyUser', async ({ Data }) => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const Response = await axios.post(`${URL}/Autheorize/Login`, {
                UserName: Data.UserName,
                Password: Data.Password,
                PhoneNumber: Data.PhoneNumber,
            });
            resolve(Response.data);
        }, 5000);
    });
});


const initialState = {
    isLoading : false,
    isError : false
}

const Reducer  = createSlice({
    name : "LoginReducer",
    initialState , 
    extraReducers : (builder) => {
        builder.addCase(VerifyUser.fulfilled , (state , action) => {
            state.isLoading = false
            Cookies.set('Token', action.payload.token)
        })
        builder.addCase(VerifyUser.pending , (state , action) => {
            state.isLoading = true
        })
    }
})

export default Reducer.reducer;