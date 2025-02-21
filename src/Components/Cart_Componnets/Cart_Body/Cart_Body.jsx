import errorImage from "../../../assets/Homapage_Images/a9588ac4be92480bbf420071afe1043d.png";
import { useDispatch, useSelector } from "react-redux";
import DeleteDilog from "../../Dilogs/CartDilog/Delete";
import { TiDeleteOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import {
  Decreament,
  DecreaseQunatity,
  DeleteProduct,
  GetCart,
  Increament,
  IncreaseQunatity,
} from "../../Features/CartSlice/CartSlice";
import Checkout_Payment from "../../Checkout_Component/Checkout_Payment";
import { Link } from "react-router-dom";

const Cart_Body = () => {
  const Cart = useSelector((state) =>
    Array.isArray(state.Cart.Cart) ? state.Cart.Cart : []
  );
  const Loading = useSelector((state) => state.Checkout.Loading);
  const Checkout = useSelector((state) => state.Checkout.Checkout);
  const dispatch = useDispatch();
  const [DilogState, setDilogState] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(GetCart());
    console.log("Cart data:", Cart);
  }, [Checkout]);

  const ToggleDilog = (item) => {
    setDilogState((prevState) => !prevState);
    setSelectedProduct(item || null);
  };

  const remove = (Product) => {
    if (selectedProduct) {
      console.log("Removing product:", Product);
      dispatch(DeleteProduct({ ProductID: Product.ProductID }));
      setDilogState(false);
    }
  };

  const increase = async (item) => {
    dispatch(IncreaseQunatity(item));
    dispatch(Increament(item._id));
  };

  const decrease = async (item) => {
    dispatch(DecreaseQunatity(item));
    dispatch(Decreament(item._id));
  };
  

  return (
    <>
    {Cart.map((item) => (
      <DeleteDilog
        key={item.ProductID}
        open={DilogState && selectedProduct?.ProductID === item.ProductID}
        toggleDrawer={ToggleDilog}
        Product={item}
        onConfirm={remove}
      />
    ))}
    <div className="  bg-gray-100 flex flex-row justify-center flex-wrap items-center py-10 px-4">
      {Cart.length > 0 ? (
        <>
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 m-[5%]">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Shopping Cart
          </h2>

          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full border border-gray-300 text-center rounded-lg">
              <thead className="bg-gray-200 text-gray-800">
                <tr>
                  <th className="p-3 border border-gray-300">Remove</th>
                  <th className="p-3 border border-gray-300">Product</th>
                  <th className="p-3 border border-gray-300">Name</th>
                  <th className="p-3 border border-gray-300">Price</th>
                  <th className="p-3 border border-gray-300">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {Cart.map((item) => (
                  <tr key={item.ProductID} className="hover:bg-gray-100 transition">
                    <td className="p-3 border border-gray-300">
                      <button
                        className="text-gray-500 hover:text-red-500 transition"
                        onClick={() => ToggleDilog(item)}
                      >
                        <TiDeleteOutline size={24} />
                      </button>
                    </td>
                    <td className="p-3 border border-gray-300">
                      <img
                        src={item.Image}
                        alt={item.Name}
                        className="w-16 h-16 object-cover rounded-md mx-auto"
                      />
                    </td>
                    <td className="p-3 border border-gray-300 text-gray-800 font-medium">
                      {item.Name}
                    </td>
                    <td className="p-3 border border-gray-300 text-[#74a84a] font-semibold">
                      ${parseFloat((item.Price * item.Quantity).toFixed(2))}
                    </td>
                    <td className="p-3 border border-gray-300">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          className={`px-3 py-1 rounded-md ${
                            item.Quantity === 1
                              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                          onClick={() => decrease(item)}
                          disabled={item.Quantity === 1}
                        >
                          -
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center border text-gray-500 text-sm">
                          {item.Quantity}
                        </span>
                        <button
                          className="px-3 py-1 bg-[#74a84a] text-white rounded-md hover:bg-[#2c541d]"
                          onClick={() => increase(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="sm:hidden grid grid-cols-1 gap-4">
            {Cart.map((item) => (
              <div
                key={item.ProductID}
                className="border p-4 rounded-md shadow-md bg-gray-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-800">{item.Name}</h3>
                  <button
                    className="text-gray-500 hover:text-red-500 transition"
                    onClick={() => ToggleDilog(item)}
                  >
                    <TiDeleteOutline size={24} />
                  </button>
                </div>
                <div className="flex items-center space-x-4 flex-wrap">
                  <img
                    src={item.Image}
                    alt={item.Name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex flex-wrap">
                    <span className="text-gray-600">
                      Price:{" "}
                      <span className="text-green-600 font-semibold">
                        ${item.Price * item.Quantity}
                      </span>
                    </span>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        className={`px-3 py-1 rounded-md ${
                          item.Quantity === 1
                            ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => decrease(item)}
                        disabled={item.Quantity === 1}
                      >
                        -
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center border text-gray-500 text-sm">
                        {item.Quantity}
                      </span>
                      <button
                        className="px-3 py-1 bg-[#74a84a] text-white rounded-md hover:bg-green-600"
                        onClick={() => increase(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link to={'/Checkout'}>
        <div className="h-[40px] w-[200px] text-white bg-gradient-to-r from-[#74a84a] to-[#588a2f] text-center uppercase text-xl rounded-sm pt-[4px] transition-all duration-200 hover:ring hover:ring-offset-2 hover:ring-[#588a2f]">
        <button>Checkout Products</button>
      </div>
      </Link>
      </>
      ) : (
        <div className="text-center min-h-screen flex flex-col items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            className="w-40 mx-auto mb-4"
          />
          <h1 className="text-2xl font-semibold text-gray-700">Your Cart is Empty</h1>
          <p className="text-gray-500 mt-1">Start adding items to your cart now!</p>
        </div>
      )}
    </div>
    </>
  );
};

export default Cart_Body;
