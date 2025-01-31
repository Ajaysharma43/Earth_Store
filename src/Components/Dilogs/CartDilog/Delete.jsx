import { Dialog, DialogContent } from "@mui/material";

const DeleteDilog = ({ open, toggleDrawer, Product, onConfirm }) => {
  return (
    <Dialog open={open} onClose={toggleDrawer}>
      <DialogContent>
        {Product ? (
          <div className="flex flex-col items-center p-6 gap-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center gap-4">
              <img
                src={Product.ProductImage}
                alt={Product.ProductName}
                className="w-24 h-24 object-cover rounded-full shadow-lg"
              />
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {Product.ProductName}
                </h2>
                <p className="text-sm text-gray-500">{Product.ProductType}</p>
                <p className="text-xl font-bold text-[#74a84a]">
                  ${Product.ProductPrice}
                </p>
              </div>
            </div>

            {/* Confirmation Message */}
            <p className="text-center text-gray-600 text-base font-medium">
              Are you sure you want to remove{" "}
              <span className="text-gray-800 font-semibold">{Product.ProductName}</span>{" "}
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
