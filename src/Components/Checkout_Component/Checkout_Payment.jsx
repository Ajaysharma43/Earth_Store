import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalcualteTotal, GetCart } from "../Features/CartSlice/CartSlice";
import StripeCheckout from "react-stripe-checkout";
import { HandleCheckout } from "../Features/Checkout/Checkout";

const Checkout_Payment = () => {
    const Product = useSelector((state) => (Array.isArray(state.Cart.Cart) ? state.Cart.Cart : []));
    const Total = useSelector((state) => state.Cart.Total);
    const Success = useSelector((state) => state.Checkout.success)
    const [TotalPrice, setTotalPrice] = useState(0);
    const [ShippingCharges , SetShippingCharges] = useState(0);
    const dispatch = useDispatch();

    const CheckoutProducts = () => {
      if(Success == true)
      {
        console.log("products are checkout");
        
      }
    }

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
        CheckoutProducts()
    }, [Product.length, dispatch , Success]);

    const handleToken = (token) => {
        if (token) {
            console.log("Received token:", token); 
            dispatch(HandleCheckout({token : token , amount:(Total + ShippingCharges) * 100})); 
        } else {
            console.error("No token received");
        }
    };

    return (
        <>
        {
          Total > 0 ?
          (
            <div className="border border-solid bg-gray-100 m-2">
                <h1>SubTotal : ${Total}</h1>
                <h1>ShippingCharges : ${ShippingCharges}</h1>
                <h1>Final Total : ${Total + ShippingCharges}</h1>

                <StripeCheckout
                    alipay={true}
                    stripeKey={import.meta.env.VITE_API_STRIPE_KEY}  
                    token={handleToken}  
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
          )
          :
          (
            <>
            <h1>nothing to checkout</h1>
            </>
          )
        }

        </>
    );
};

export default Checkout_Payment;
