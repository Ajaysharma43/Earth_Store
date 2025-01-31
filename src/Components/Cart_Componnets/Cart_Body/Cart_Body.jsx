import errorImage from "../../../assets/Homapage_Images/a9588ac4be92480bbf420071afe1043d.png";
import { useDispatch, useSelector } from "react-redux";
import DeleteDilog from "../../Dilogs/CartDilog/Delete";
import { useState } from "react";
import { RemoveProduct } from "../../Features/CartSlice/CartSlice";

const Cart_Body = () => {
  const Cart = useSelector((state) => state.Cart.Cart);
  const dispatch = useDispatch();
  const [DilogState, setDilogState] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Toggle dialog visibility and select a product for removal
  const ToggleDilog = (item) => {
    setDilogState((prevState) => !prevState);
    setSelectedProduct(item || null); // Toggle state, set product if not null
  };

  // Remove product from the cart using the selected product
  const remove = () => {
    if (selectedProduct) {
      dispatch(RemoveProduct(selectedProduct.ProductId));
      setDilogState(false); // Close the dialog after removing the product
    }
  };

  return (
    <>
      {/* Iterate through cart items and render dialog for each item */}
      {Cart.map((item) => (
        <DeleteDilog
          key={item.ProductId}
          open={DilogState && selectedProduct?.ProductId === item.ProductId}
          toggleDrawer={ToggleDilog}
          Product={item}
          onConfirm={remove}
        />
      ))}

      {/* Cart content */}
      <div
        className="p-6 min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${errorImage})` }}
      >
        
        
        {/* If cart is empty, display a message */}
        {Cart.length === 0 ? (
          <div className="text-center text-xl text-gray-600">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-md">
            {/* Header Row */}
            <div className="flex justify-around gap-4 items-center py-4 border-b-2 last:border-none">
              <span>Product</span>
              <span>Name</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Remove</span>
            </div>

            {/* Cart Items */}
            {Cart.map((item) => (
              <div
                key={item.ProductId}
                className="flex justify-around gap-4 items-center py-4 border-b-2 last:border-none"
              >
                <div className="flex items-center">
                  <img
                    src={item.ProductImage}
                    alt={item.ProductName}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>
                <span className="text-lg text-gray-800">{item.ProductName}</span>
                <span className="text-lg text-green-600">{item.ProductPrice*item.ProductQuantity}</span>
                <span className="text-lg text-gray-700">{item.ProductQuantity}</span>
                <button
                  className="text-red-600 text-sm font-medium hover:underline"
                  onClick={() => ToggleDilog(item)} // Trigger dialog for removal
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Cart_Body;
