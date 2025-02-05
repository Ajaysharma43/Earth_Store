import { createSlice } from "@reduxjs/toolkit"

const CheckoutDetails = {
    Products : [{
        ProductID : ProductID,
        Name : "",
        Type : "",
        Price : null,
        Image : "",
        Description : "",
        Quantity : null
    }],
    CustomerDetails : {
        CustomerName : "",
        Email : "",
        PhoneNumber : null,
        ShippingAddress : {
            Street : "",
            City : "",
            District : "",
            State : "",
            Pincode : null,
            Counrty : "",
            Date : Date.now()
        },
        DeliveryAddress : {
            Street : "",
            City : "",
            District : "",
            State : "",
            Pincode : null,
            Counrty : ""
        },
    },
        Paymentmethod : "",
        OrderSummary : {
            SubPrice : null,
            Discount : null,
            Taxes : null,
            DeliveryCharges : null,
            TotalPrice : null
        },
        PaymentDetails : {
            PaymentStatus : "",
            PaymentTransictionID : ""
        }
    }

const CheckoutReducer = createSlice({
    Name : "Checkout",
    CheckoutDetails,
    reducers : {
        
    }
})