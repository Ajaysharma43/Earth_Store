import errorImage from "../../../assets/Homapage_Images/a9588ac4be92480bbf420071afe1043d.png";
import { useDispatch, useSelector } from "react-redux";
import DeleteDilog from "../../Dilogs/CartDilog/Delete";
import { TiDeleteOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import { Decreament, DecreaseQunatity, DeleteProduct, GetCart, Increament, IncreaseQunatity } from "../../Features/CartSlice/CartSlice";
import { ButtonGroup } from "@mui/material";

const Cart_Body = () => {
  const Cart = useSelector((state) => (Array.isArray(state.Cart.Cart) ? state.Cart.Cart : []));
  const dispatch = useDispatch();
  const [DilogState, setDilogState] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(GetCart());
  }, []);

  // Toggle dialog visibility and select a product for removal
  const ToggleDilog = (item) => {
    setDilogState((prevState) => !prevState);
    setSelectedProduct(item || null);
  };

  // Remove product from the cart using the selected product
  const remove = (Product) => {
    if (selectedProduct) {
      console.log(Product);
      dispatch(DeleteProduct({ ProductID: Product.ProductID }));
      setDilogState(false);
    }
  };

  const increase = async (item) => {
      console.log(item);
      dispatch(IncreaseQunatity(item));
      dispatch(Increament(item._id))
    };

     const decrease = async (item) => {
        console.log(item);
        dispatch(DecreaseQunatity(item));
        dispatch(Decreament(item._id))
        if(item.Quantity == 1)
        {
          ToggleDilog(item)
        }
      };

  return (
    <>
     {/* Delete Dialog */}
     {Cart.map((item) => (
        <DeleteDilog
          key={item.ProductID}
          open={DilogState && selectedProduct?.ProductID === item.ProductID}
          toggleDrawer={ToggleDilog}
          Product={item}
          onConfirm={remove}
        />
      ))}

      {/* Cart Container */}
      <div className="min-h-screen p-6 bg-cover bg-center flex flex-col items-center" style={{ backgroundImage: `url(${errorImage})` }}>
        <div className="w-[90%] md:w-[80%] bg-white p-6 mt-20 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Shopping Cart</h2>

          {Cart.length > 0 ? (
            <>
              {/* Table for large screens */}
              <div className="overflow-x-auto hidden sm:block">
                <table className="w-full border-collapse border border-gray-300 text-center">
                  {/* Table Header (Visible only on sm and above) */}
                  <thead className="bg-gray-200 text-gray-800 sm:table-header-group hidden">
                    <tr>
                      <th className="p-3 border border-gray-300">Remove</th>
                      <th className="p-3 border border-gray-300">Product</th>
                      <th className="p-3 border border-gray-300">Name</th>
                      <th className="p-3 border border-gray-300">Price</th>
                      <th className="p-3 border border-gray-300">Quantity</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {Cart.map((item) => (
                      <tr key={item.ProductID} className="hover:bg-gray-100 transition">
                        <td className="p-3 border border-gray-300">
                          <button className="text-gray-500 hover:text-red-500 transition" onClick={() => ToggleDilog(item)}>
                            <TiDeleteOutline size={24} />
                          </button>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <img src={item.Image} alt={item.Name} className="w-16 h-16 object-cover rounded-md mx-auto" />
                        </td>
                        <td className="p-3 border border-gray-300 text-gray-800 font-medium">{item.Name}</td>
                        <td className="p-3 border border-gray-300 text-green-600 font-semibold">${item.Price * item.Quantity}</td>
                        <td className="p-3 border border-gray-300">
                          <ButtonGroup>
                            <button className="w-8 h-8 border text-[#74a84a] text-sm" onClick={() => decrease(item)}>-</button>
                            <span className="w-8 h-8 flex items-center justify-center border text-gray-500 text-sm">{item.Quantity}</span>
                            <button className="w-8 h-8 border text-[#74a84a] text-sm" onClick={() => increase(item)}>+</button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Grid layout for small screens (below sm) */}
              <div className="sm:hidden grid grid-cols-1 gap-4">
                {Cart.map((item) => (
                  <div key={item.ProductID} className=" grid border p-4 rounded-md shadow-md bg-gray-50">
                    <div className="grid justify-between items-center mb-2">
                    <button className="text-gray-500 hover:text-red-500 transition" onClick={() => ToggleDilog(item)}>
                        <TiDeleteOutline size={24} />
                      </button>
                      <h3 className="text-lg font-medium text-gray-800">{item.Name}</h3>
                    </div>
                    <div className="grid gap-4 items-center">
                      <img src={item.Image} alt={item.Name} className="w-16 h-16 object-cover rounded-md" />
                      <div className="flex flex-col">
                        <span className="text-gray-600">Price: <span className="text-green-600 font-semibold">${item.Price * item.Quantity}</span></span>
                        <div className="flex items-center mt-2">
                          <ButtonGroup>
                            <button className="w-8 h-8 border text-[#74a84a] text-sm" onClick={() => decrease(item)}>-</button>
                            <span className="w-8 h-8 flex items-center justify-center border text-gray-500 text-sm">{item.Quantity}</span>
                            <button className="w-8 h-8 border text-[#74a84a] text-sm" onClick={() => increase(item)}>+</button>
                          </ButtonGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h1 className="text-center text-xl uppercase m-9 text-gray-600">No products available</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart_Body;
