import { Dialog, DialogContent } from "@mui/material";
import Loader from "../../Loaders/Loader";

const DeleteDilog = ({
  open,
  toggleDrawer,
  Product,
  onConfirm,
  DeleteDilog,
  setDeleteDilog,
}) => {
  console.log(Product);
  return (
    <Dialog open={open} onClose={toggleDrawer}>
      <DialogContent>
        {Product ? (
          DeleteDilog ? (
            <Loader />
          ) : (
            <div className="flex flex-col items-center p-6 gap-6 bg-white rounded-lg shadow-md">
              <div className="flex flex-col items-center gap-4">
                <img
                  src={Product.Image}
                  alt={Product.Name}
                  className="w-24 h-24 object-cover rounded-full shadow-lg"
                />
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {Product.Name}
                  </h2>
                  <p className="text-sm text-gray-500">{Product.Type}</p>
                  <p className="text-xl font-bold text-[#74a84a]">
                    ${Product.Price}
                  </p>
                </div>
              </div>

              {/* Confirmation Message */}
              <p className="text-center text-gray-600 text-base font-medium">
                Are you sure you want to remove{" "}
                <span className="text-gray-800 font-semibold">
                  {Product.Name}
                </span>{" "}
                from your cart?
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => onConfirm(Product)}
                  className="px-8 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 shadow-lg transition duration-200"
                >
                  Remove
                </button>
                <button
                  onClick={toggleDrawer}
                  className="px-8 py-2 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 shadow-lg transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="text-center py-8">
            <h1 className="text-xl font-semibold text-gray-800">
              Product not found
            </h1>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDilog;
