import { Dialog, DialogContent } from "@mui/material";
import { useDispatch } from "react-redux";
import { Cancel_COD_Order } from "../Features/Checkout/Checkout";
import { useRef } from "react";

const CancelCODOrder = ({ open, onclose, Order, deleteloading , setDeleteLoading }) => {
  const dispatch = useDispatch();
  const Reason = useRef();

  const CancelOrder = () => {
    dispatch(Cancel_COD_Order({ Order: Order, Reason: Reason.current.value }));
  };

  return (
    <>
      <Dialog open={open}>
        <DialogContent className="bg-gradient-to-br from-indigo-50 to-blue-100 p-8 rounded-2xl shadow-xl max-w-md mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
            Cancel Order
          </h1>
          <textarea
            ref={Reason}
            className="w-full p-4  mb-6 border border-solid border-gray-300 rounded-xl focus:ring-4 focus:ring-red-400 resize-none h-32 transition-all ease-in-out"
          />
          <p className="text-gray-600 text-center mb-6">
            Are you sure you want to cancel this order? This action cannot be undone.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              className="w-1/2 px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-200 font-semibold"
              onClick={() => CancelOrder()}
            >
              Yes, Cancel
            </button>
            <button
              type="button"
              className="w-1/2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-lg hover:bg-gray-400 transition duration-200 font-semibold"
              onClick={onclose}
            >
              No, Go Back
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CancelCODOrder;
