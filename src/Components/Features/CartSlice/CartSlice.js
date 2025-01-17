import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  Cart: [], 
};


const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    SetCart: (state, action) => {
        const Existed = state.Cart.find((item) => item.ProductId === action.payload.ProductId)
        if(Existed)
        {
            console.log("Existed");
        }
        else
        {
            state.Cart.push(action.payload)
        }
    },
    UpdatePrice : (state , action) => {
        const Existed = state.Cart.find((item) => item.ProductId === action.payload.ProductId)
        console.log(Existed);
    }
  },
});


export const { SetCart , UpdatePrice } = CartSlice.actions;


export default CartSlice.reducer;
