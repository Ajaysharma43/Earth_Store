import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalcualteTotal, GetCart } from "../Features/CartSlice/CartSlice";
import StripeCheckout from "react-stripe-checkout";
import { AddCheckoutProducts, HandleCheckout, setSuccess } from "../Features/Checkout/Checkout";

const Checkout_Payment = () => {
    const Cart = useSelector((state) => state.Cart.Cart);
    const Total = useSelector((state) => state.Cart.Total);
    const Success = useSelector((state) => state.Checkout.success);
    const [TotalPrice, setTotalPrice] = useState(0);
    const [ShippingCharges, SetShippingCharges] = useState(0);
    const dispatch = useDispatch();

    const CheckoutProducts = () => {
        if (Success === true) {
            console.log("Checkout payment:", Cart);
            dispatch(AddCheckoutProducts({ Product: Cart }));
            dispatch(setSuccess());
        }
    };

    const CalCulateTotal = () => {
        const salesTaxRate = 10;
        const total = Cart.reduce(
            (acc, item) => acc + item.Price * item.Quantity,
            0
        );
        setTotalPrice(total);
        SetShippingCharges(Cart.length * salesTaxRate);
    };



    useEffect(() => {
        console.log("Cart is:", Cart);
        dispatch(GetCart());
        dispatch(CalcualteTotal());
        CalCulateTotal();
        CheckoutProducts();
    }, [Cart.length, dispatch, Success]);

    const handleToken = (token) => {
        if (token) {
            console.log("Received token:", token);
            dispatch(HandleCheckout({ token: token, amount: (Total + ShippingCharges) * 100 }));
        } else {
            console.error("No token received");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center ">
            {Total > 0 ? (
                <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                    <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">Checkout Summary</h1>

                    <div className="border-b border-gray-300 pb-3">
                        <p className="text-lg text-gray-700 flex justify-between">
                            <span>Subtotal:</span> <span className="font-semibold">${Total.toFixed(2)}</span>
                        </p>
                        <p className="text-lg text-gray-700 flex justify-between">
                            <span>Shipping Charges:</span> <span className="font-semibold">${ShippingCharges.toFixed(2)}</span>
                        </p>
                    </div>

                    <p className="text-xl font-bold text-gray-800 mt-3 flex justify-between">
                        <span>Total:</span> <span>${(Total + ShippingCharges).toFixed(2)}</span>
                    </p>

                    <StripeCheckout
                        alipay={true}
                        stripeKey={import.meta.env.VITE_API_STRIPE_KEY}
                        token={handleToken}
                        currency="USD"
                        description="Fill all the details"
                        amount={(Total + ShippingCharges) * 100}
                        billingAddress
                        shippingAddress={false}
                    >
                        <button className="mt-5 w-full bg-[#74a84a] hover:bg-[#2c541d] transition-all text-white text-lg py-3 rounded-md uppercase">
                            Buy Now
                        </button>
                    </StripeCheckout>
                </div>
            ) : (
                <div className="text-center">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                        alt="Empty Cart"
                        className="w-40 mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-semibold text-gray-700">Nothing to Checkout</h1>
                    <p className="text-gray-500 mt-1">Your cart is empty. Start shopping now!</p>
                </div>
            )}
        </div>
    );
};

export default Checkout_Payment;
