import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCart } from "../Features/CartSlice/CartSlice";
import { Link } from "react-router-dom";

const Order = () => {
    const Checkout = useSelector((state) => state.Cart.Checkout) || [];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetCart());
    }, [dispatch]);

    return (
        <div className="max-w-7xl mx-auto my-10 p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                📦 Your Orders
            </h1>

            {Checkout.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Checkout.map((order) => {
                        const formattedDate = order.Product[0]?.PlacedAt
                            ? new Date(order.Product[0].PlacedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                            : "N/A";

                        return (
                            <div
                                key={order._id}
                                className="bg-white shadow-lg rounded-lg p-5 hover:shadow-2xl transition-shadow duration-300"
                            >
                                <p className="text-gray-500 text-sm mb-4">
                                    📅 Placed At: {formattedDate}
                                </p>
                                <div className="space-y-4">
                                    {order.Product.map((product) => (
                                        <div
                                            key={product.ProductID}
                                            className="flex items-center bg-gray-50 rounded-lg shadow-sm p-4"
                                        >
                                            <img
                                                src={product.Image}
                                                alt={product.Name}
                                                className="h-20 w-20 rounded-lg object-cover mr-4"
                                            />
                                            <div>
                                                <h3 className="text-base font-semibold text-gray-700">
                                                    {product.Name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    Quantity: {product.Quantity}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Price: ${(product.Price * product.Quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 border-t pt-4">
                                    <h3 className="text-sm font-semibold text-gray-800 mb-2">
                                        Delivery Address
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {order.Address.Street}, {order.Address.Area}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {order.Address.City}, {order.Address.State} - {order.Address.Pincode}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {order.Address.Country}
                                    </p>
                                </div>
                                <Link to={`/CheckoutProduct/${order._id}`}>
                                    <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center mt-10">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1178/1178483.png"
                        alt="No Orders"
                        className="h-32 w-32 mb-4"
                    />
                    <h1 className="text-xl font-semibold text-gray-800">No Orders Yet</h1>
                    <p className="text-gray-500">Browse our store and place your first order!</p>
                </div>
            )}
        </div>
    );
};

export default Order;
