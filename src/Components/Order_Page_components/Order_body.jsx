import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCart } from "../Features/CartSlice/CartSlice";

const Order = () => {
    const Checkout = useSelector((state) => state.Cart.Checkout) || [];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetCart());
    }, [Checkout.length]);

    return (
        <div className="max-w-6xl mx-auto my-10 p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">📦 Your Orders</h1>

            {Checkout.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Checkout.map((item) => (
                        <div key={item.ProductID} className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center transition-transform transform hover:scale-105">
                            <img src={item.Image} alt={item.Name} className="h-[160px] w-[180px] rounded-lg object-cover mb-4" />
                            <h2 className="text-lg font-semibold text-gray-800 text-center">{item.Name}</h2>
                            <p className="text-gray-600 font-medium">${(item.Price * item.Quantity).toFixed(2)}</p>
                            <p className="text-gray-500 text-sm">Quantity: {item.Quantity}</p>
                            <p className="text-sm text-green-600 mt-1">📅 Shipped on: {item.PlacedAt}</p>
                            <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center mt-10">
                    <img src="https://cdn-icons-png.flaticon.com/512/1178/1178483.png" alt="No Orders" className="h-32 w-32 mb-4" />
                    <h1 className="text-xl font-semibold text-gray-800">No Orders Yet</h1>
                    <p className="text-gray-500">Browse our store and place your first order!</p>
                </div>
            )}
        </div>
    );
};

export default Order;
