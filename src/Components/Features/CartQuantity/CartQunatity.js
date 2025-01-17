import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  Quantity: 1, 
};


const CartQunatity = createSlice({
  name: "Qunatity",
  initialState,
  reducers: {
    Increament: (state, action) => {
            state.Quantity = state.Quantity + action.payload
    },
    Decreament: (state, action) => {
        if(state.Quantity == 1)
            {
                state.Quantity = 1;
            }
            else
            {
                state.Quantity -= action.payload
            }
    },
    Reset: (state,action) => {
        state.Quantity = 1;
    }
  },
});


export const { Increament , Decreament , Reset } = CartQunatity.actions;


export default CartQunatity.reducer;
