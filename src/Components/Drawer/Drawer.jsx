import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RemoveProduct } from "../Features/CartSlice/CartSlice";
import DeleteDilog from "../Dilogs/CartDilog/Delete";
import { Link } from "react-router-dom";

const Drawers = ({ open, toggleDrawer }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const Product = useSelector((state) => state.Cart.Cart);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(Product);
  }, [Product]);

  const openDialog = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleRemove = () => {
    if (selectedProduct) {
      dispatch(RemoveProduct(selectedProduct.ProductId));
      closeDialog();
    }
  };

  return (
    <>
      <DeleteDilog
        open={dialogOpen}
        toggleDrawer={closeDialog}
        Product={selectedProduct}
        onConfirm={handleRemove}
      />
      <Drawer open={open} anchor="right" onClose={toggleDrawer}>
        <div className="w-[350px] h-full flex flex-col bg-white shadow-lg">
          {/* Header Section */}
          <section className="flex items-center justify-between p-4 border-b">
            <h1 className="text-lg font-semibold text-gray-800">Your Cart</h1>
            <button
              onClick={toggleDrawer}
              className="text-gray-600 hover:text-gray-900"
            >
              Close
            </button>
          </section>

          {/* Cart Items Section */}
          <div className="flex-1 overflow-y-auto p-4">
            {Product.length > 0 ? (
              Product.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border-b last:border-none"
                >
                  <img
                    src={item.ProductImage}
                    alt={item.ProductName}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex flex-col flex-grow">
                    <h2 className="text-sm font-medium text-gray-800">
                      {item.ProductName}
                    </h2>
                    <p className="text-sm text-gray-500">{item.ProductType}</p>
                    <p className="text-base font-semibold text-[#74a84a]">
                      ${item.ProductPrice}
                    </p>
                  </div>
                  <button
                    onClick={() => openDialog(item)}
                    className="text-red-600 text-sm font-medium hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-8">
                Your cart is empty.
              </p>
            )}
          </div>

          <section className="p-4 border-t">
            <Link to={'/cart'}>
            <button className="w-full py-2 bg-[#74a84a] text-white text-sm font-semibold shadow-md hover:bg-[#2c541d] transition">
                GO TO Cart
            </button>
            </Link>
            <button
              onClick={toggleDrawer}
              className="w-full py-2 bg-[#74a84a] text-white text-sm font-semibold shadow-md hover:bg-[#2c541d] transition"
            >
              Close Cart
            </button>
          </section>
        </div>
      </Drawer>
    </>
  );
};

export default Drawers;
