import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalcualteTotal, GetCart } from "../Features/CartSlice/CartSlice";
import StripeCheckout from "react-stripe-checkout";
import {
  AddCheckoutProducts,
  HandleCheckout,
  HandleCOD,
  setSuccess,
} from "../Features/Checkout/Checkout";
import Checkout_Address from "./Checkout_Address";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const Checkout_Payment = () => {
  const Cart = useSelector((state) => state.Cart.Cart);
  const Total = useSelector((state) => state.Cart.Total);
  const Success = useSelector((state) => state.Checkout.success);
  const error = useSelector((state) => state.Checkout.error);
  const Charges = useSelector((state) => state.Checkout.Charges);
  const [Token, setToken] = useState({});
  const [TotalPrice, setTotalPrice] = useState(0);
  const [ShippingCharges, SetShippingCharges] = useState(0);
  const [errormessage, seterrormessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    seterrormessage(error);
  }, [error]);

  const CheckoutProducts = () => {
    if (Success === true) {
      console.log("Checkout payment:", Cart);
      console.log(Token);
      
      dispatch(AddCheckoutProducts({ Product: Cart ,Charges:Charges , Token : Token}));
      dispatch(setSuccess());
      setToken({});
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

  const handleCoD = async () => {
    if (
      Token.FullName === "" ||
      Token.Email === "" ||
      Token.PhoneNumber === "" ||
      Token.Country === "" ||
      Token.State === "" ||
      Token.City === "" ||
      Token.Area === "" ||
      Token.Street === "" ||
      Token.Pincode === "" ||
      Token.PaymentMethod === ""
    ) {
      seterrormessage("Details are not filled completely");
    } else {
      seterrormessage("");
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        dispatch(
          HandleCOD({
            Token: Token,
            Total: (Total + ShippingCharges).toFixed(2),
          })
        );
      }, 4000);
    }
  };

  const handlesubmit = async () => {
    if (
      Token.FullName === "" ||
      Token.Email === "" ||
      Token.PhoneNumber === "" ||
      Token.Country === "" ||
      Token.State === "" ||
      Token.City === "" ||
      Token.Area === "" ||
      Token.Street === "" ||
      Token.Pincode === "" ||
      Token.PaymentMethod === ""
    ) {
      seterrormessage("Details are not filled completely");
    } else {
      seterrormessage("");
      setIsLoading(true); // Start loading
      try {
        const cardElement = elements.getElement(CardElement);
        const PaymentMethod = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

        dispatch(
          HandleCheckout({
            token: PaymentMethod.paymentMethod,
            Details: Token,
            amount: (Total + ShippingCharges).toFixed(2),
          })
        );
      } catch (error) {
        seterrormessage("Payment failed. Please try again.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 w-full">
      {Total > 0 ? (
        <div className="p-6 w-full flex flex-wrap justify-evenly">
          {/* Checkout Address */}
          <section className="">
            <Checkout_Address Token={Token} setToken={setToken} />
          </section>
          <section className="mt-[200px] border border-solid border-black p-4 h-fit rounded-sm">
            {/* Checkout Summary */}
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
              Checkout Summary
            </h1>

            <div className="border-b border-gray-300 pb-4 mb-4 space-y-2">
              <p className="text-lg text-gray-700 flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">${Total.toFixed(2)}</span>
              </p>
              <p className="text-lg text-gray-700 flex justify-between">
                <span>Shipping Charges:</span>
                <span className="font-semibold">
                  ${ShippingCharges.toFixed(2)}
                </span>
              </p>
            </div>
            {/* Total Amount */}
            <p className="text-xl font-bold text-gray-900 flex justify-between mb-5">
              <span>Total:</span>
              <span>${(Total + ShippingCharges).toFixed(2)}</span>
            </p>

            {/* Payment Section */}
            {Token.PaymentMethod === "Online Payment" ? (
              <>
                <CardElement className="h-[50px] border border-gray-300 rounded-md p-3 w-full" />
                {errormessage && (
                  <h1 className="text-red-600 font-semibold text-center uppercase">
                    {errormessage}
                  </h1>
                )}
                <button
                  className="mt-5 w-full bg-[#74a84a] hover:bg-[#2c541d] transition-all text-white text-lg py-3 rounded-lg font-semibold disabled:opacity-50"
                  onClick={handlesubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : `Pay ${(Total + ShippingCharges).toFixed(2)}`}
                </button>
              </>
            ) : (
              <>
                {errormessage && (
                  <h1 className="text-red-600 font-semibold text-center uppercase">
                    {errormessage}
                  </h1>
                )}
                <button
                  className="mt-5 w-full bg-[#74a84a] hover:bg-[#2c541d] transition-all text-white text-lg py-3 rounded-lg font-semibold disabled:opacity-50"
                  onClick={handleCoD}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Buy Now"}
                </button>
              </>
            )}
          </section>
        </div>
      ) : (
        <div className="text-center pt-32">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            className="w-32 mx-auto mb-4 opacity-80"
          />
          <h1 className="text-2xl font-semibold text-gray-800">
            Nothing to Checkout
          </h1>
          <p className="text-gray-500 mt-2">
            Your cart is empty. Start shopping now!
          </p>
        </div>
      )}
    </div>
  );
};

export default Checkout_Payment;
