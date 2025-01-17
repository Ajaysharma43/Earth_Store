import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RemoveProduct } from "../Features/CartSlice/CartSlice";
import DeleteDilog from "../Dilogs/CartDilog/Delete";
import { Link } from "react-router-dom";
import { Increament , Decreament } from "../Features/CartSlice/CartSlice";


const Drawers = ({ open, toggleDrawer }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const Product = useSelector((state) => state.Cart.Cart);
  const dispatch = useDispatch()
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

  const increase = (item) => {
    dispatch(Increament(item))
  }

  const decrease = (item) => {
    dispatch(Decreament(item))
  }

  return (
    <>
      <DeleteDilog
        open={dialogOpen}
        toggleDrawer={closeDialog}
        Product={selectedProduct}
        onConfirm={() => {}}
      />
      <Drawer open={open} anchor="right" onClose={toggleDrawer}>
        <div className="w-[350px] h-full flex flex-col bg-gray-50 shadow-lg">
          {/* Header Section */}
          <section className="flex items-center justify-between p-4 border-b bg-white">
            <h1 className="text-lg font-bold text-gray-800">Your Cart</h1>
            <button
              onClick={toggleDrawer}
              className="text-gray-500 hover:text-gray-800 transition"
            >
              ✕
            </button>
          </section>

          {/* Cart Items Section */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {Product.length > 0 ? (
              Product.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border-b bg-white rounded-md shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={item.ProductImage}
                    alt={item.ProductName}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex flex-col flex-grow">
                    <h2 className="text-sm font-semibold text-gray-800">
                      {item.ProductName}
                    </h2>
                    <p className="text-sm text-gray-500">{item.ProductType}</p>
                    <p className="text-base font-bold text-green-600">
                      ${item.ProductPrice}
                    </p>
                    <div className="flex items-center mt-2 gap-2">
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                      onClick={() => decrease(item.ProductId)}>
                        -
                      </button>
                      <span className="text-gray-800 font-medium">
                        {item.ProductQuantity}
                      </span>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                      onClick={() => increase(item.ProductId)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => openDialog(item)}
                    className="text-red-500 text-sm font-medium hover:underline"
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

          {/* Footer Section */}
          <section className="p-4 border-t bg-white">
            <Link to={"/cart"}>
              <button className="w-full py-2 mb-2 bg-[#74a84a] text-white font-semibold rounded-md shadow hover:bg-green-600 transition">
                Go to Cart
              </button>
            </Link>
            <button
              onClick={toggleDrawer}
              className="w-full py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 transition"
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
