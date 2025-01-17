import { useSelector } from "react-redux";

const Cart_Body = () => {
  const Cart = useSelector((state) => state.Cart.Cart);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Cart</h2>
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
            <span className="text-lg text-green-600">{item.ProductPrice}</span>
            <span className="text-lg text-gray-700">{item.ProductQuantity}</span>
            <button className="text-red-600 text-sm font-medium hover:underline">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart_Body;
