import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CartInstance from "../../../../AxiosInterseptors/CartInterseptors";
import Cookies from "js-cookie";
import {jwtDecode}  from 'jwt-decode'

// Add to Cart
export const Cart = createAsyncThunk("CartSlice", async ({ CartData }) => {
  const AccessToken = sessionStorage.getItem('AccessToken')
    const decoded = jwtDecode(AccessToken)
    console.log("decoded token is here" + decoded);
    
    const Userid = decoded.ID;
  const Response = await CartInstance.post("/AddCart", { Userid, CartData });
  return Response.data;
});

// Get Cart
export const GetCart = createAsyncThunk("GetCart", async () => {
  const AccessToken = sessionStorage.getItem('AccessToken')
    const decoded = jwtDecode(AccessToken)
    console.log("decoded token is here" + decoded);
    
    const Userid = decoded.ID;
  const Response = await CartInstance.get(`/GetCart?UserID=${Userid}`);
  return Response.data; // You forgot to return data
});

export const  DeleteProduct = createAsyncThunk('DeleteProduct' , async({ProductID}) => {
    
    const AccessToken = sessionStorage.getItem('AccessToken')
      const decoded = jwtDecode(AccessToken)
      console.log("decoded token is here" + decoded);
      
      const UserID = decoded.ID;
    const Response = await CartInstance.delete(`/DeleteProduct?UserID=${UserID}&ProductID=${ProductID}`)
    console.log("delete data is "+Response.data);
    return Response.data;
})

export const IncreaseQunatity = createAsyncThunk('IncreaseQunatity' , async(item) => {
    console.log("The product is : " + item);
    const AccessToken = sessionStorage.getItem('AccessToken')
      const decoded = jwtDecode(AccessToken)
      console.log("decoded token is here" + decoded);
      
      const UserID = decoded.ID;
    const Response = await CartInstance.put('/IncreaseQunatity' , {UserID , ProductID:item.ProductID , Qunatity : item.Quantity})
    return Response.data.Message;
})

export const DecreaseQunatity = createAsyncThunk('DecreaseQunatity' , async(item) => {
    console.log("The product is : " + item);
    const AccessToken = sessionStorage.getItem('AccessToken')
      const decoded = jwtDecode(AccessToken)
      console.log("decoded token is here" + decoded);
      
      const UserID = decoded.ID;
    const Response = await CartInstance.put('/DecreaseQunatity' , {UserID , ProductID:item.ProductID , Qunatity : item.Quantity})
    return Response.data.Message;
})

const initialState = {
  Cart: [],
  Total: null, 
  Message: null,
  Loading : false
};

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    SetCart: (state, action) => {
      const Existed = state.Cart.find((item) => item.ProductId === action.payload.ProductId);
      if (!Existed) {
        state.Cart.push(action.payload);
      }
    },
    RemoveProduct: (state, action) => {
      state.Cart = state.Cart.filter((item) => item.ProductId !== action.payload);
    },
    UpdatePrice: (state, action) => {
      const Existed = state.Cart.find((item) => item._id === action.payload);
      if (Existed) {
        Existed.ProductPrice = action.payload.ProductPrice;
      }
    },
    Increament: (state, action) => {
      const Existed = state.Cart.find((item) => item._id === action.payload);
      console.log("existed product is "+Existed);
      if (Existed) {
        Existed.Quantity += 1;
      }
    },
    Decreament: (state, action) => {
      const Existed = state.Cart.find((item) => item._id === action.payload);
      if (Existed && Existed.Quantity > 1) {
        Existed.Quantity -= 1; 
        if(Existed.Quantity === 1)
        {
          Existed.Quantity = 1
        }
      }
    },
    CalcualteTotal : (state , action) => {
      state.Total = state.Cart.reduce(
        (acc, item) => acc + item.Price * item.Quantity,
        0
      );
    }
  },


  extraReducers: (builder) => {
    builder
      .addCase(Cart.fulfilled, (state, action) => {
        if (action.payload.Message === "Saved to Cart") {
          state.Cart = action.payload.Products || [];
        } else if (action.payload.Message === "Existed") {
          console.log("Item already exists in cart");
        }
      })
      .addCase(GetCart.fulfilled, (state, action) => {
        state.Cart = action.payload.Message || []; // Set cart data from backend
      })
      .addCase(DeleteProduct.fulfilled , (state , action) => {
        state.Cart = action.payload.Products
      })
  },
});

export const { SetCart, UpdatePrice, RemoveProduct, Increament, Decreament , CalcualteTotal} = CartSlice.actions;
export default CartSlice.reducer;
