import { Drawer } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Decreament,
  DecreaseQunatity,
  DeleteProduct,
  GetCart,
  Increament,
  IncreaseQunatity,
} from "../Features/CartSlice/CartSlice";
import DeleteDilog from "../Dilogs/CartDilog/Delete";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import CartLoader from "../Loaders/CartLoader/CartLoader";
import Loader from "../Loaders/Loader";

const Drawers = ({ open, toggleDrawer }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [DeletedDilog, SetDeletedDilog] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [TotalPrice, setTotalPrice] = useState(0);
  const Product = useSelector((state) => state.Cart.Cart) || [];
  const IsLoading = useSelector((state) => state.Cart.Loading);
  const Decreaseref = useRef();
  const dispatch = useDispatch();

  const CalCulateTotal = () => {
    const total = Product.reduce(
      (acc, item) => acc + item.Price * item.Quantity,
      0
    );
    setTotalPrice(total);
  };

  useEffect(() => {
    CalCulateTotal();
  }, [Product]);

  useEffect(() => {
    try {
      dispatch(GetCart());
    } catch (error) {
      console.error("the error is " + error);
    }
  }, []);

  const openDialog = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const increase = async (item) => {
    console.log(item);
    dispatch(IncreaseQunatity(item));
    dispatch(Increament(item._id));
    CalCulateTotal();
  };

  const decrease = async (item) => {
    console.log(item);
    dispatch(DecreaseQunatity(item));
    dispatch(Decreament(item._id));

    CalCulateTotal();
  };

  const Remove = (item) => {
    console.log(item);
    SetDeletedDilog(true);
    setTimeout(() => {
      dispatch(DeleteProduct({ ProductID: item.ProductID }));
      SetDeletedDilog(false);
      setDialogOpen(false);
      CalCulateTotal();
    }, 3000);
  };

  if (IsLoading == true) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <DeleteDilog
        open={dialogOpen}
        toggleDrawer={closeDialog}
        Product={selectedProduct}
        onConfirm={Remove}
        DeleteDilog={DeletedDilog}
        setDeleteDilog={SetDeletedDilog}
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
                  {/* Product Image */}
                  <img
                    src={item.Image}
                    alt={item.Name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex flex-col flex-grow">
                    <h2 className="text-sm font-semibold text-gray-800">
                      {item.Name}
                    </h2>
                    <p className="text-sm text-gray-500">{item.Type}</p>
                    <p className="text-base font-bold text-green-600 ">
                      ${item.Price * item.Quantity}
                    </p>
                    <div className="flex items-center mt-2 gap-2">
                      {item.Quantity == 1 ? (
                        <button
                        disabled
                        className="px-3 py-1 bg-gray-50 text-gray-300 rounded-md hover:bg-gray-100 "
                      >
                        -
                      </button>
                      ) : (
                        
                        <button
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 "
                        onClick={() => decrease(item)}
                      >
                        -
                      </button>
                      )}
                      <span className="text-gray-800 font-medium">
                        {item.Quantity}
                      </span>
                      <button
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        onClick={() => increase(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => openDialog(item)}
                    className="text-gray-500 transition-all duration-500 text-2xl font-medium hover:underline hover:text-blue-400"
                  >
                    <TiDeleteOutline />
                  </button>

                  {/* Loader for each product while removing */}
                  {DeletedDilog && (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                      <CartLoader />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-8 flex justify-center">
                No products available
              </p>
            )}
          </div>

          {/* Total Price & Go to Cart Button */}
          <section className="p-4 border-t bg-white">
            <div className="w-full py-2 mb-2 bg-[#2c541d] text-white font-semibold rounded-md shadow hover:bg-green-600 transition text-center">
              {DeletedDilog ? (
                <div className="flex justify-center">
                  <CartLoader />
                </div>
              ) : (
                <h1>Total Price: ${TotalPrice}</h1>
              )}
            </div>
            <Link to={"/cart"}>
              <button className="w-full py-2 mb-2 bg-[#74a84a] text-white font-semibold rounded-md shadow hover:bg-[#2c541d] transition">
                Go to Cart
              </button>
            </Link>
          </section>
        </div>
      </Drawer>
    </>
  );
};

export default Drawers;
