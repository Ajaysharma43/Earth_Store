import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie'


const URL = import.meta.env.VITE_API_URL;

export const GetOtp = createAsyncThunk('GenerateOtp' , async({PhoneNumber}) => {
    const Response = await axios.post(`${URL}/Autheorize/SentOtp`,{PhoneNumber});
    return Response.data
})

export const Setdata = createAsyncThunk('Savedata' , async({Data}) => {
    const Response = await axios.post(`${URL}/Autheorize/SaveData` , {Data})
})

const initialState = {
    isLoading : false , 
    Data : {} , 
    OTP : "",
    isError : false,
    PhoneNumber : null,
}

const Reducer = createSlice({
    name : "Autherization",
    initialState ,
    reducers : {
        updateValue : (state ,action) => {
            state.Data = action.payload
            console.log(state.Data);
        }
    },
    extraReducers : (builder) => {
        builder.addCase(GetOtp.fulfilled , (state , action) => {
            state.OTP = action.payload
            const expires = new Date();
            expires.setMinutes(expires.getMinutes() + 1);
            console.log(state.OTP);
            
            Cookies.set('OTP' , `${state.OTP.otp}` , {expires:expires})
        })
    }
})

export const {updateValue}  = Reducer.actions

export default Reducer.reducer;