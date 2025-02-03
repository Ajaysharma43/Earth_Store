import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CartInstance from "../../../../AxiosInterseptors/CartInterseptors";
import Cookies from "js-cookie";

// Add to Cart
export const Cart = createAsyncThunk("CartSlice", async ({ CartData }) => {
  const Userid = Cookies.get("ID");
  const Response = await CartInstance.post("/AddCart", { Userid, CartData });
  return Response.data;
});

// Get Cart
export const GetCart = createAsyncThunk("GetCart", async () => {
  const Userid = Cookies.get("ID");
  const Response = await CartInstance.get(`/GetCart?UserID=${Userid}`);
  return Response.data; // You forgot to return data
});

export const  DeleteProduct = createAsyncThunk('DeleteProduct' , async({ProductID}) => {
    
    const UserID = Cookies.get('ID');
    const Response = await CartInstance.delete(`/DeleteProduct?UserID=${UserID}&ProductID=${ProductID}`)
    console.log("delete data is "+Response.data);
    return Response.data;
})

export const IncreaseQunatity = createAsyncThunk('IncreaseQunatity' , async(item) => {
    console.log("The product is : " + item);
    const UserID = Cookies.get('ID');
    const Response = await CartInstance.put('/IncreaseQunatity' , {UserID , ProductID:item.ProductID , Qunatity : item.Quantity})
    return Response.data.Message;
})

export const DecreaseQunatity = createAsyncThunk('DecreaseQunatity' , async(item) => {
    console.log("The product is : " + item);
    const UserID = Cookies.get('ID');
    const Response = await CartInstance.put('/DecreaseQunatity' , {UserID , ProductID:item.ProductID , Qunatity : item.Quantity})
    return Response.data.Message;
})

const initialState = {
  Cart: [], 
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
      const Existed = state.Cart.find((item) => item.ProductId === action.payload.ProductId);
      if (Existed) {
        Existed.ProductPrice = action.payload.ProductPrice;
      }
    },
    Increament: (state, action) => {
      const Existed = state.Cart.find((item) => item.ProductId === action.payload);
      if (Existed) {
        Existed.ProductQuantity += 1;
      }
    },
    Decreament: (state, action) => {
      const Existed = state.Cart.find((item) => item.ProductId === action.payload);
      if (Existed && Existed.ProductQuantity > 1) {
        Existed.ProductQuantity -= 1;
      }
    },
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
      .addCase(IncreaseQunatity.fulfilled , (state , action) => {
            state.Cart = action.payload
      })
      .addCase(DecreaseQunatity.fulfilled , (state , action) => {
        state.Cart = action.payload
        state.Loading = false
      })
  },
});

export const { SetCart, UpdatePrice, RemoveProduct, Increament, Decreament } = CartSlice.actions;
export default CartSlice.reducer;
