import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetUser } from "../../Features/DashboardSlice/DashboardData";

const DashBoardProductDetails = () => {
    const { id } = useParams();
    const data = useSelector((state) => state.Dashboardreducer.User);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = () => {
            dispatch(GetUser({ UserID: id }));
        };
        fetchData();
    }, [id, dispatch]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* User Information */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <h1 className="text-2xl font-bold mb-4">User Information</h1>
                <p><strong>Name:</strong> {data.UserName}</p>
                <p><strong>Phone Number:</strong> {data.PhoneNumber}</p>
                <p><strong>Role:</strong> {data.Role}</p>
                <p><strong>Stripe ID:</strong> {data.StripeID}</p>
                <p><strong>Password:</strong> {data.Password}</p>
            </div>

            {/* Cart Products */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Cart Products</h2>
                {data.CartProducts ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.CartProducts.map((product, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-100 rounded-lg shadow"
                            >
                                <img
                                    src={product.Image}
                                    alt={product.Name}
                                    className="rounded-lg mb-4 w-full h-32 object-cover"
                                />
                                <h3 className="font-bold">{product.Name}</h3>
                                <p><strong>Type:</strong> {product.Type}</p>
                                <p><strong>Price:</strong> ${product.Price}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No products in the cart.</p>
                )}
            </div>

            {/* Checkout Details */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Checkout</h2>
                {data.Checkout ? (
                    data.Checkout.map((checkout, index) => (
                        <div key={index} className="mb-4 border-b pb-4">
                            <h3 className="font-bold mb-2">Order {index + 1}</h3>
                            <p><strong>Address:</strong> 
                            <br />Street : {checkout.Address.Street || "N/A"}
                            <br />State : {checkout.Address.State || "N/A"}
                            <br />Pincode : {checkout.Address.Pincode || "N/A"}
                            <br />Country : {checkout.Address.Country || "N/A"}
                            <br />City : {checkout.Address.City || "N/A"}
                            <br />Area : {checkout.Address.Area || "N/A"}
                            <br />PaymentMethod : {checkout.Address.PaymentMethod || "N/A"}
                            </p>

                            <div>
                                <strong>Products:</strong>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {checkout.Product.map((product, idx) => (
                                        <div
                                key={index}
                                className="p-4 bg-gray-100 rounded-lg shadow"
                            >
                                <img
                                    src={product.Image}
                                    alt={product.Name}
                                    className="rounded-lg mb-4 w-full h-32 object-cover"
                                />
                                <h3 className="font-bold">{product.Name}</h3>
                                <p><strong>Type:</strong> {product.Type}</p>
                                <p><strong>Price:</strong> ${product.Price}</p>
                            </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No checkout history.</p>
                )}
            </div>

            {/* Order History */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Order History</h2>
                {data.OrderHistory ? (
                    data.OrderHistory.map((order, index) => (
                        <div key={index} className="mb-4 border-b pb-4">
                            <h3 className="font-bold mb-2">Order {index + 1}</h3>
                            <p><strong>Address:</strong> 
                            <br />Street : {order.Address.Street || "N/A"}
                            <br />State : {order.Address.State || "N/A"}
                            <br />Pincode : {order.Address.Pincode || "N/A"}
                            <br />Country : {order.Address.Country || "N/A"}
                            <br />City : {order.Address.City || "N/A"}
                            <br />Area : {order.Address.Area || "N/A"}
                            <br />PaymentMethod : {order.Address.PaymentMethod || "N/A"}
                            </p>
                            <p><strong>Canceled:</strong> {order.Canceled ? "Yes" : "No"}</p>
                            {order.Canceled && (
                                <p><strong>Reason:</strong> {order.Reason}</p>
                            )}
                            <div>
                                <strong>Products:</strong>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {order.Product.map((product, idx) => (
                                        <div
                                        key={index}
                                        className="p-4 bg-gray-100 rounded-lg shadow"
                                    >
                                        <img
                                            src={product.Image}
                                            alt={product.Name}
                                            className="rounded-lg mb-4 w-full h-32 object-cover"
                                        />
                                        <h3 className="font-bold">{product.Name}</h3>
                                        <p><strong>Type:</strong> {product.Type}</p>
                                        <p><strong>Price:</strong> ${product.Price}</p>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No order history available.</p>
                )}
            </div>

            {/* Cancelled Orders */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Cancelled Orders</h2>
                {data.CancelOrder ? (
                    <ul className="list-disc list-inside">
                        {data.CancelOrder.map((order, index) => (
                            <li key={index}>Order {index + 1}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No canceled orders.</p>
                )}
            </div>
        </div>
    );
};

export default DashBoardProductDetails;
