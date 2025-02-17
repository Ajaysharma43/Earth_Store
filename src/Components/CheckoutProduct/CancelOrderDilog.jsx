import { Dialog, DialogContent } from "@mui/material";
import { useDispatch } from "react-redux";
import { CancelOrder } from "../Features/Checkout/Checkout";
import { useRef } from "react";

const CancelOrderDilog = ({ open, Handledilog, Charges, Order }) => {
  const dispatch = useDispatch();
  const reason = useRef();

  const HandleOrder = () => {
    dispatch(CancelOrder({ Order: Order, Charges: Charges, Reason: reason.current.value }));
  };

  return (
    <>
      <Dialog open={open} onClose={Handledilog}>
        <DialogContent className="bg-gradient-to-br from-indigo-50 to-blue-100 p-8 rounded-2xl shadow-xl max-w-md mx-auto">
          <form
            className="flex flex-col space-y-6 w-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="text-3xl font-extrabold text-gray-800 text-center">
              Cancel Order
            </h2>
            <p className="text-sm text-gray-600 text-center">
              Please provide a reason for canceling your order.
            </p>
            <textarea
              className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 resize-none"
              placeholder="Type your reason here..."
              required
              ref={reason}
            />
            <div className="flex justify-center space-x-6">
              <button
                type="button"
                className="w-1/2 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-200 uppercase font-semibold"
                onClick={HandleOrder}
              >
                Cancel Order
              </button>
              <button
                type="button"
                className="w-1/2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition duration-200 uppercase font-semibold"
                onClick={Handledilog}
              >
                Back
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CancelOrderDilog;
