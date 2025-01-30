import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const FindUserReviews = createAsyncThunk("FindUserReviews", async (id) => {
  const USERID = Cookies.get("ID");
  console.log("FindUserReviews is called");

  const response = await axios.get(`${URL}/Data/UserReview?id=${USERID}&productid=${id}`);
  return response.data.reviews;
});

export const UpdateUserReveiws = createAsyncThunk("UpdateUserReviews", async ({ ProductID, ID, Review }) => {
  const USERID = Cookies.get("ID");
  console.log("Updating User Review:", USERID);

  const response = await axios.put(`${URL}/Data/UpdateReview`, { USERID, ID, Review, ProductID });
  return response.data;
});

const initialState = {
  Product: {},
  Reviews: [],
  UserReviews: [],
  limit: 2, // Default limit set to 2
  ReviewLength: 0, // Default review count
};

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    setproduct: (state, action) => {
      console.log("Setting Product Data:", action.payload);
      
      state.Product = action.payload.data;
      state.Reviews = action.payload.data.Reviews;
      state.ReviewLength = action.payload.length || 0;

      // Ensure limit starts from 2 or less if there are fewer reviews
      state.limit = Math.min(2, state.ReviewLength);
    },
    LoadMore: (state) => {
      console.log("LoadMore Triggered:");
      console.log(`Current Limit: ${state.limit}, Total Reviews: ${state.ReviewLength}`);

      if (state.limit < state.ReviewLength) {
        state.limit = Math.min(state.limit + 2, state.ReviewLength);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FindUserReviews.fulfilled, (state, action) => {
      console.log("User Reviews Found:", action.payload);
      state.UserReviews = action.payload;
    });

    builder.addCase(UpdateUserReveiws.fulfilled, (state, action) => {
      console.log("Updated Product Data:", action.payload.updatedProduct);
      state.Product = action.payload.updatedProduct;
    });
  },
});

export const { setproduct, LoadMore } = ProductSlice.actions;

export default ProductSlice.reducer;
