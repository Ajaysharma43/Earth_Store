import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import CheckoutInstance from "../../../../AxiosInterseptors/CheckoutInterseptor";
import { Cart } from "../CartSlice/CartSlice";
import { JWTTOken } from "../../JWTDecode/JWTdecode";
import CancelCODOrder from "../../CheckoutProduct/CancelCODOrder";


export const HandleCheckout = createAsyncThunk('checkout/handleCheckout', async ({ token, Details, amount }) => {
    try {
        const decoded = JWTTOken()
        console.log("decoded token is here", decoded, Details, token, amount);
        const UserID = decoded.ID;
        const response = await CheckoutInstance.post(`/Buy`, { token: token, amount: amount, UserID: UserID, Details: Details });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error during checkout:', error);
        throw new Error(error);
    }
});

export const HandleCOD = createAsyncThunk('checkout/HandleCOD', async ({ Token, Total }) => {
    try {
        const decoded = JWTTOken()
        const UserID = decoded.ID;
        const response = await CheckoutInstance.post('/CheckoutCOD', { Token: Token, Total: Total, UserID: UserID })
    }
    catch (error) {
        console.error("the error is " + error);
    }
})

export const AddCheckoutProducts = createAsyncThunk('AddCheckoutProducts', async ({ Product, Charges, Token }) => {
    const decoded = JWTTOken()
    const UserID = decoded.ID;
    console.log(Token);
    console.log("the charges are ", Charges);
    const response = await CheckoutInstance.delete(`/CheckoutCart?Product=${Product}&UserID=${UserID}&Charges=${Charges}&Token=${JSON.stringify(Token)}`)
    return response.data
})

export const CheckPaymentStatus = createAsyncThunk('CheckPaymentStatus', async ({ ObjectID }) => {
    const decoded = JWTTOken()
    const UserID = decoded.ID;
    console.log(ObjectID);

    const response = await CheckoutInstance.get(`/CheckPaymentStatus?Userid=${UserID}&ObjectID=${ObjectID}`)
    return response.data
})

export const CancelOrder = createAsyncThunk('CancelOrder', async ({ Order, Charges, Reason }) => {
    if (Order && Charges && Reason) {
        const decoded = JWTTOken()
        const UserID = decoded.ID;
        const Response = await CheckoutInstance.delete(`/CancelOrder?Charges=${Charges}&Order=${Order}&Reason=${Reason}&UserID=${UserID}`)
        return Response.data
    }
    else {
        console.log("data is null");
    }


})

export const Cancel_COD_Order = createAsyncThunk('Cancel_COD_Order', async ({ Order, Reason }) => {
    const decoded = JWTTOken()
    const UserID = decoded.ID;
    const Response = await CheckoutInstance.delete(`/Cancel_COD_Order?Order=${Order}&Reason=${Reason}&UserID=${UserID}`)
    console.log(Response.data);
    return Response.data
})

const initialState = {
    Checkout: false,
    loading: false,
    error: null,
    checkoutData: {},
    invoiceid: "",
    success: false,
    Charges: null,
    PaymentStatus: {},
    OrderCanceled: false,
};

const CheckoutReducer = createSlice({
    name: 'checkout',
    initialState,

    reducers: {
        setSuccess: (state, action) => {
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
                state.Charges = action.payload.Charges
                state.loading = false
            })
            .addCase(HandleCheckout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(AddCheckoutProducts.pending, (state, action) => {
                state.Checkout = false
            })
            .addCase(AddCheckoutProducts.fulfilled, (state, action) => {
                state.Checkout = true
                state.Charges = null
            })

            .addCase(HandleCOD.pending, (state, actoion) => {
                state.success = false
            })
            .addCase(HandleCOD.fulfilled, (state, action) => {
                state.success = true
            })

            .addCase(CheckPaymentStatus.fulfilled, (state, action) => {
                state.PaymentStatus = action.payload.Charge
                console.log(action.payload.Charge);
            })

            .addCase(CancelOrder.pending, (state, action) => {
                state.OrderCanceled = false
            })
            .addCase(CancelOrder.fulfilled, (state, action) => {
                state.OrderCanceled = true
            })

            .addCase(Cancel_COD_Order.pending, (state, action) => {
                state.OrderCanceled = false
            })
            .addCase(Cancel_COD_Order.fulfilled, (state, action) => {
                state.OrderCanceled = true
            })
    }
});

export const { setSuccess } = CheckoutReducer.actions

export default CheckoutReducer.reducer;
