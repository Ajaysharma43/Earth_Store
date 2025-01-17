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
    },
    Increament : (state , action) => {
        console.log(action.payload);
        const Existed = state.Cart.find((item) => item.ProductId === action.payload)
        Existed.ProductQuantity += 1
        console.log(Existed);    
    },
    Decreament : (state , action) => {
        const Existed = state.Cart.find((item) => item.ProductId === action.payload)
        if(Existed.ProductQuantity == 1)
        {
            Existed.ProductQuantity = 1
        }
        else
        {
            Existed.ProductQuantity -= 1
        }
    }
  },
});


export const { SetCart , UpdatePrice , RemoveProduct , Increament , Decreament } = CartSlice.actions;


export default CartSlice.reducer;
