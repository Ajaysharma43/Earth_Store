import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Product: {},
  }; 

export const ProductSlice  = createSlice({
    name:"Product",
    initialState:{},
    reducers:{
        setproduct :(state,action) => {
            console.log(action.payload);
            state.Product = action.payload;
        }
    }
});

export const {setproduct} = ProductSlice.actions;

export default ProductSlice.reducer;