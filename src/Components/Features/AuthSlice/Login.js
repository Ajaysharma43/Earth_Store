import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const URL = import.meta.env.VITE_API_URL;

// Asynchronous thunk for user verification
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
      return response.data; // Contains token and other data
    } catch (error) {
      // Return error response using rejectWithValue for better error handling
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong!"
      );
    }
  }
);

// Initial state
const initialState = {
  isLoading: false,
  isAuthenticated: false,
  isError: false,
  errorMessage: "",
};

// Reducer and extra reducers
const Reducer = createSlice({
  name: "LoginReducer",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      Cookies.remove("Token"); // Remove token on logout
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
        state.isLoading = false;
        state.isAuthenticated = true;
        Cookies.set("RefreshToken", action.payload.refreshToken, {
          expires: 7,           // Expires in 7 days
          path: '/',            // Accessible across the entire site
          sameSite: 'Strict',   // Restrict cross-site requests
          secure: true,         // Only send over HTTPS
          // domain attribute should be omitted for localhost
        });
                localStorage.setItem("RefreshToken", action.payload.refreshToken)
        sessionStorage.setItem("AccessToken" , action.payload.token)
      })
      .addCase(VerifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload; // Store error message
      });
  },
});

export const { logout } = Reducer.actions; // Export logout action
export default Reducer.reducer;
