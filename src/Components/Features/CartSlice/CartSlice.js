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
    RemoveProduct : (state , action) => {
        const Product = state.Cart.filter((state) => state.ProductId !== action.payload)
        state.Cart.pop({Product})
        state.Cart = Product
    },
    UpdatePrice : (state , action) => {
        const Existed = state.Cart.find((item) => item.ProductId === action.payload.ProductId)
        console.log(Existed);
    }
  },
});


export const { SetCart , UpdatePrice , RemoveProduct } = CartSlice.actions;


export default CartSlice.reducer;
