import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { JWTTOken } from "../JWTDecode/JWTdecode";
import CheckoutInstance from "../../../AxiosInterseptors/CheckoutInterseptor";
import { CheckPaymentStatus } from "../Features/Checkout/Checkout";

const Payment_Status_Body = () => {
  const { id } = useParams();
  const PaymentStatus = useSelector((state) => state.Checkout.PaymentStatus);
  const dispatch = useDispatch();
  const [charges, setCharges] = useState("");

  const fetchCharges = useCallback(async () => {
    try {
      const decoded = JWTTOken();
      const UserID = decoded.ID;

      const response = await CheckoutInstance.get(
        `/GetSingleProduct?UserID=${UserID}&ObjectID=${id}`
      );
      setCharges(response.data.CheckoutProduct.ChargeID);
      dispatch(
        CheckPaymentStatus({ ObjectID: response.data.CheckoutProduct.ChargeID })
      );
    } catch (error) {
      console.error("Error fetching charges:", error);
    }
  }, [id, dispatch]);

  useEffect(() => {
    fetchCharges();
  }, [fetchCharges]);

  const formatAmount = (amount) => (amount / 100).toFixed(2);

  return (
    <>
      {PaymentStatus ? (
        <div className="p-8 max-w-2xl mx-auto bg-gradient-to-r from-indigo-50 via-white to-indigo-50 shadow-lg rounded-2xl border border-gray-200 m-2 break-words whitespace-pre-wrap">
          <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
            Payment Receipt
          </h1>
          <div className="bg-indigo-100 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">
                Receipt ID:
              </span>
              <span className="text-lg text-gray-800 break-words whitespace-pre-wrap">{PaymentStatus.id}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-semibold text-gray-700">
                Amount Paid:
              </span>
              <span className="text-lg text-green-700">
                ${formatAmount(PaymentStatus.amount)}
              </span>
            </div>
          </div>

          {/* <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Payment Method:</span>
              <span className="text-gray-800">
                {PaymentStatus.payment_method_details.card.brand.toUpperCase()} ****{" "}
                {PaymentStatus.payment_method_details.card.last4}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Customer Name:</span>
              <span className="text-gray-800">{PaymentStatus.billing_details.name || "N/A"}</span>
            </div>
          </div>

           */}
<div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Customer Email:</span>
              <span className="text-gray-800">{PaymentStatus.receipt_email || "N/A"}</span>
            </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Currency:</span>
            <span className="text-gray-800 uppercase">
              {PaymentStatus.currency}
            </span>
          </div>
          <div className="mt-6">
            <a
              href={PaymentStatus.receipt_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-500 transition"
            >
              View Full Receipt
            </a>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Date:</span>
            <span className="text-gray-800">
              {new Date(PaymentStatus.created * 1000).toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </span>
          </div>
        </div>
      ) : (
        <div className="text-center mt-12">
          <h1 className="text-2xl font-bold text-gray-700">Loading...</h1>
        </div>
      )}
    </>
  );
};

export default Payment_Status_Body;
