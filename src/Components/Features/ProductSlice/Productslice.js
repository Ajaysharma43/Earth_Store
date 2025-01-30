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

export const UpdateUserReveiws = createAsyncThunk('UpdateUserReviews' , async({ProductID,ID,Review}) => { 
    const USERID = Cookies.get('ID')
    console.log(USERID);
    
    const response = await axios.put(`${URL}/Data/UpdateReview`,{USERID , ID , Review , ProductID})
    return response.data
})

const initialState = {
    Product: {},
    Reviews : [],
    UserReviews : [],
    limit : 1,
    ReviewLength : null,
  }; 

 const ProductSlice  = createSlice({
    name:"Product",
    initialState,
    reducers:{
        setproduct :(state,action) => {
            console.log(action.payload);
            state.Product = action.payload.data;
            state.Reviews = action.payload.data.Reviews;
            state.ReviewLength = action.payload.length
            console.log(state.ReviewLength + "review lenght");
            console.log(state.limit + "limit")
        },
        LoadMore : (state , action) => {
            console.log(state.ReviewLength + "review lenght");
            console.log(state.limit + "limit")
            
            if(state.limit >= state.ReviewLength)
            {
                state.limit = state.ReviewLength
            }
            else
            {
                state.limit = state.limit + 2
                if(state.limit >= state.ReviewLength)
                {
                    state.limit = state.ReviewLength
                }
            }
        }
    },
    extraReducers:(builder)=>{
         builder.addCase(FindUserReviews.fulfilled , (state , action) => {
            console.log(action.payload);
            state.UserReviews = action.payload
         })

         builder.addCase(UpdateUserReveiws.fulfilled , (state , action) => {
            console.log(action.payload.updatedProduct);
            state.Product = action.payload.updatedProduct
         })
    }

});

export const {setproduct , LoadMore} = ProductSlice.actions;

export default ProductSlice.reducer;