import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const Related = createAsyncThunk("RelatedProducts", async ({ id, test }, thunkAPI) => {
    console.log("Payload received:", id, test); // Log the payload
    try {
      const Response = await axios.post(`${URL}/Data/RelatedProduct`, { id, test });
      console.log("Response data:", Response.data.result); // Log API response
      return Response.data.result;
    } catch (error) {
      console.error("Error:", error); // Log any errors
      return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
    }
  });

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const reducer = createSlice({
  name: "Related",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(Related.fulfilled, (state, action) => {
      state.data = action.payload;
      console.log(state.data);
    });
  },
});

export default reducer.reducer;
