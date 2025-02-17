import { useEffect, useState, useRef } from "react";
import CheckoutInstance from "../../../AxiosInterseptors/CheckoutInterseptor";
import { JWTTOken } from "../JWTDecode/JWTdecode";
import LoadingBar from "react-top-loading-bar";
import { useNavigate } from "react-router-dom";

const Order_History_Body = () => {
  const [Product, setProduct] = useState([]);
  const loadingBarRef = useRef(null);
  const Navigate = useNavigate()

  useEffect(() => {
    const GetOrderHistory = async () => {
      loadingBarRef.current.continuousStart();

      try {
        const decoded = JWTTOken();
        const UserID = decoded.ID;

        const response = await CheckoutInstance.get(`/GetOrderHistory?UserID=${UserID}`);

        setProduct(response.data.Orderhistory);

        loadingBarRef.current.complete();
      } catch (error) {
        console.error("Error fetching order history:", error);
        loadingBarRef.current.complete();
      }
    };

    GetOrderHistory();
  }, []);

  const HandlePyamentStatus = () => {

  }

  return (
    <div>
      {/* Top Loading Bar */}
      <LoadingBar color="#74a84a" ref={loadingBarRef} height={3} />

      {/* Order History UI */}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">🛒 Order History</h1>

        {Product.length === 0 ? (
          <div className="flex items-center justify-center h-[60vh]">
            <h2 className="text-lg text-gray-600">No orders found.</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Product.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
              >
                {/* Order Information */}
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Order Details</h2>
                  {item.Product.map((order, i) => (
                    <div key={i} className="mb-3">
                      <h3 className="text-gray-700 font-medium">{order.Name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {order.Quantity}</p>
                      <p className="text-sm text-gray-600">Price: ${order.Price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Address Information */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">📍 Delivery Address</h3>
                  <p className="text-sm text-gray-600">
                    <strong>City:</strong> {item.Address.City}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>State:</strong> {item.Address.State}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Country:</strong> {item.Address.Country}
                  </p>

                  <p className="text-sm text-gray-600">
                    <strong>PaymentMethod:</strong> {item.Address.PaymentMethod}
                  </p>
                  {
                    item.Address.PaymentMethod == 'Online Payment' ? 
                    (
                        <button className="bg-red-100 text-red-600 font-medium text-center py-2 rounded" onClick={() => Navigate(`/Payment_Status/${item._id}`)}>Check Recipt</button>
                    )
                    :
                    (
                        <h1 className="text-sm text-gray-600">Purchace on cod</h1>
                    )
                  }
                </div>

                {/* Order Status */}
                <div className="mt-4">
                  {item.Canceled ? (
                    <div className="bg-red-100 text-red-600 font-medium text-center py-2 rounded">
                      🚫 Your order is cancelled
                    </div>
                  ) : (
                    <div className="bg-green-100 text-green-600 font-medium text-center py-2 rounded">
                      🚚 Set for delivery
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order_History_Body;
