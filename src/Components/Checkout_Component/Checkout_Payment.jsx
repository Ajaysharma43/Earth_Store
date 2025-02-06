import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalcualteTotal, GetCart } from "../Features/CartSlice/CartSlice";
import StripeCheckout from "react-stripe-checkout";
import { HandleCheckout } from "../Features/Checkout/Checkout";

const Checkout_Payment = () => {
    const Product = useSelector((state) => (Array.isArray(state.Cart.Cart) ? state.Cart.Cart : []));
    const Total = useSelector((state) => state.Cart.Total);
    const [TotalPrice, setTotalPrice] = useState(0);
    const [ShippingCharges , SetShippingCharges] = useState(0);
    const dispatch = useDispatch();

    const CalCulateTotal = () => {
        const salesTaxRate = 10;
        const total = Product.reduce(
            (acc, item) => acc + item.Price * item.Quantity,
            0
        );
        setTotalPrice(total);
        SetShippingCharges(Product.length * salesTaxRate);
    };

    useEffect(() => {
        dispatch(GetCart());
        dispatch(CalcualteTotal());
        CalCulateTotal();
    }, [Product.length, dispatch]);

    const handleToken = (token) => {
        // Ensure token is passed correctly
        if (token) {
            console.log("Received token:", token);  // For debugging
            dispatch(HandleCheckout({token : token , amount:(Total + ShippingCharges) * 100}));  // Make sure HandleCheckout is designed to handle the token
        } else {
            console.error("No token received");
        }
    };

    return (
        <>
            <div className="border border-solid bg-gray-100 m-2">
                <h1>SubTotal : {Total}</h1>
                <h1>ShippingCharges : {ShippingCharges}</h1>
                <h1>Final Total : {Total + ShippingCharges}</h1>

                <StripeCheckout
                    stripeKey={import.meta.env.VITE_API_STRIPE_KEY}  // Ensure correct Stripe key is set
                    token={handleToken}  // Ensure handleToken is passed correctly
                    currency="USD"
                    description="fill all the details"
                    amount={(Total + ShippingCharges) * 100}
                    billingAddress
                    shippingAddress={false}
                >
                    <button className="h-[50px] w-[200px] bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg uppercase text-white text-xl">
                        Buy
                    </button>
                </StripeCheckout>
            </div>
        </>
    );
};

export default Checkout_Payment;
