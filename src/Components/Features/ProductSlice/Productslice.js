import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Product: {},
    Reviews : []
  }; 

export const ProductSlice  = createSlice({
    name:"Product",
    initialState,
    reducers:{
        setproduct :(state,action) => {
            console.log(action.payload);
            state.Product = action.payload;
            state.Reviews = action.payload.Reviews;
        }
    }
});

export const {setproduct} = ProductSlice.actions;

export default ProductSlice.reducer;