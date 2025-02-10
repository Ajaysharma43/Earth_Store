import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import CheckoutInstance from "../../../../AxiosInterseptors/CheckoutInterseptor";
import { Cart } from "../CartSlice/CartSlice";


export const HandleCheckout = createAsyncThunk('checkout/handleCheckout', async ({ token, amount }) => {
    try {
        const AccessToken = sessionStorage.getItem('AccessToken')
        const decoded = jwtDecode(AccessToken)
        console.log("decoded token is here" + decoded);
        const UserID = decoded.ID;
        const response = await CheckoutInstance.post(`/Buy`, { token: token, amount: amount, UserID: UserID });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error during checkout:', error);
        throw new Error(error);
    }
});

export const AddCheckoutProducts = createAsyncThunk('AddCheckoutProducts', async ({ Product }) => {
    const AccessToken = sessionStorage.getItem('AccessToken')
        const decoded = jwtDecode(AccessToken)
        console.log("decoded token is here" , decoded);
        const UserID = decoded.ID;
    console.log("the product are " , Product);
    const response = await CheckoutInstance.delete(`/CheckoutCart?Product=${Product}&UserID=${UserID}`)
})

const initialState = {
    Checkout: false,
    loading: false,
    error: null,
    checkoutData: {},
    invoiceid: "",
    success: false,
};

const CheckoutReducer = createSlice({
    name: 'checkout',
    initialState,

    reducers : {
        setSuccess: (state , action) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(HandleCheckout.pending, (state) => {
                state.success = false
                state.loading = true;
            })
            .addCase(HandleCheckout.fulfilled, (state, action) => {
                console.log("the payload is " + action.payload.success);
                state.success = action.payload.success
                state.loading = false
            })
            .addCase(HandleCheckout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(AddCheckoutProducts.pending , (state , action) => {
                state.Checkout = false
            })
            .addCase(AddCheckoutProducts.fulfilled , (state , action) => {
                state.Checkout = true
            })
    }
});

export const {setSuccess} = CheckoutReducer.actions

export default CheckoutReducer.reducer;
