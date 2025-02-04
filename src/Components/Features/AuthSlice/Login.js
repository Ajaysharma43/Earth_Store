import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const URL = import.meta.env.VITE_API_URL;


export const VerifyUser = createAsyncThunk(
  "VerifyUser",
  async ({Data}, { rejectWithValue }) => {
    try {
        console.log(Data);
      const response = await axios.post(`${URL}/Autheorize/Login`, {
        UserName: Data.UserName,
        Password: Data.Password,
        PhoneNumber: Data.PhoneNumber,
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong!"
      );
    }
  }
);


const initialState = {
  isLoading: false,
  isAuthenticated: false,
  isError: false,
  errorMessage: "",
};


const Reducer = createSlice({
  name: "LoginReducer",
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove("RefreshToken");
      sessionStorage.removeItem('AccessToken')
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(VerifyUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(VerifyUser.fulfilled, (state, action) => {
        if(action.payload.message == 'Valid')
        {
          state.isLoading = false;
          state.isAuthenticated = true;
          Cookies.set("RefreshToken", action.payload.refreshToken, {
            expires: 7
          });
          sessionStorage.setItem("AccessToken" , action.payload.AccessToken)
        }
        else
        {
          alert('Check Letter casing')
          
        }
        
      })
      .addCase(VerifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload; 
      });
  },
});

export const { logout } = Reducer.actions; // Export logout action
export default Reducer.reducer;
