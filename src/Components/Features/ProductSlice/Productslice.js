import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  Cookies  from "js-cookie";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const FindUserReviews = createAsyncThunk('FindUserReviews' , async(id) => {
    const USERID = Cookies.get('ID')
    console.log("find user is called");
    
    const FindUser = await axios.get(`${URL}/Data/UserReview?id=${USERID}&productid=${id}`)
    return FindUser.data.reviews
})

const initialState = {
    Product: {},
    Reviews : [],
    UserReviews : []
  }; 

 const ProductSlice  = createSlice({
    name:"Product",
    initialState,
    reducers:{
        setproduct :(state,action) => {
            console.log(action.payload);
            state.Product = action.payload;
            state.Reviews = action.payload.Reviews;
        }
    },
    extraReducers:(builder)=>{
         builder.addCase(FindUserReviews.fulfilled , (state , action) => {
            console.log(action.payload);
            state.UserReviews = action.payload
         })
    }

});

export const {setproduct} = ProductSlice.actions;

export default ProductSlice.reducer;