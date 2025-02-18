import { useEffect, useState } from "react";
import CheckoutInstance from "../../../AxiosInterseptors/CheckoutInterseptor";
import { useParams } from "react-router-dom";

const Order_History_Status_Body = () => {
  const { id } = useParams();
  const [PaymentStatus, SetPaymentStatus] = useState({});

  useEffect(() => {
    const GetHistory = async () => {
      const response = await CheckoutInstance.get(
        `/CheckPaymentStatus?ObjectID=${id}`
      );
      console.log(response.data);
      SetPaymentStatus(response.data.Charge);
    };
    GetHistory();
  }, []);

  const formatAmount = (amount) => (amount / 100).toFixed(2);
  return (
    <>
      {PaymentStatus ? (
        <div className="p-4 md:p-8 max-w-xl mx-auto bg-gradient-to-r from-indigo-50 via-white to-indigo-50 shadow-lg rounded-2xl border border-gray-200 m-4 break-words whitespace-pre-wrap">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-6 text-center text-gray-800">
            Payment Receipt
          </h1>
          <div className="bg-indigo-100 p-3 md:p-4 rounded-lg mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <span className="text-sm md:text-lg font-semibold text-gray-700">
                Receipt ID:
              </span>
              <span className="text-sm md:text-lg text-gray-800 mt-1 sm:mt-0 break-words whitespace-pre-wrap">
                {PaymentStatus.id}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
              <span className="text-sm md:text-lg font-semibold text-gray-700">
                Amount Refunded:
              </span>
              <span className="text-sm md:text-lg text-green-700 mt-1 sm:mt-0">
                ${formatAmount(PaymentStatus.amount_refunded)}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
            <span className="font-medium text-gray-600">Customer Email:</span>
            <span className="text-gray-800 mt-1 sm:mt-0">
              {PaymentStatus.receipt_email || "N/A"}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
            <span className="font-medium text-gray-600">Currency:</span>
            <span className="text-gray-800 uppercase mt-1 sm:mt-0">
              {PaymentStatus.currency}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
            <span className="font-medium text-gray-600">Date:</span>
            <span className="text-gray-800 mt-1 sm:mt-0">
              {new Date(PaymentStatus.created * 1000).toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true, // Set to false for 24-hour format
                }
              )}
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
        </div>
      ) : (
        <div className="text-center mt-12">
          <h1 className="text-2xl font-bold text-gray-700">Loading...</h1>
        </div>
      )}
    </>
  );
};

export default Order_History_Status_Body;
