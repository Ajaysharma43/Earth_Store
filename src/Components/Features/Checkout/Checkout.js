import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const HandleCheckout = createAsyncThunk('checkout/handleCheckout', async ({ token, amount }) => {
    try {
        console.log("the token is " + token);

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/Checkout/Buy`, { token: token, amount: amount });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error during checkout:', error);
        throw new Error(error);
    }
});

const AddCheckoutProducts = createAsyncThunk('AddCheckoutProducts' , async () => {
    const response = await axios.post('')
})

const initialState = {
    loading: false,
    error: null,
    checkoutData: {},
    invoiceid: "",
    success : false
};

const CheckoutReducer = createSlice({
    name: 'checkout',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(HandleCheckout.pending, (state) => {
                state.loading = true;
            })
            .addCase(HandleCheckout.fulfilled, (state, action) => { 
                console.log("the payload is " + action.payload.success);
                state.success = action.payload.success
            })
            .addCase(HandleCheckout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default CheckoutReducer.reducer;
