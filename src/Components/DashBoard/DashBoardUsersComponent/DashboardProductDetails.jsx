import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetUser } from "../../Features/DashboardSlice/DashboardData";
import axios from "axios";
import BlockDilogs from "./Dilogs/BlockDilog";
import DetailsUpdateDilog from "./Dilogs/DetailsUpdateDilog";
import { JWTTOken } from "../../JWTDecode/JWTdecode";

const DashBoardProductDetails = () => {
  const { id } = useParams();
  const data = useSelector((state) => state.Dashboardreducer.User);
  const [ReceiptLoading, setReceiptLoading] = useState("");
  const [CancelReceiptLoading, setCancelReceiptLoading] = useState("");
  const [UpdateDilog, setUpdateDilog] = useState(false);
  const [BlockDilog, setBlockDilog] = useState(false);
  const [Blockuser, setBlockuser] = useState("");
  const [UpdateUser, setUpdateUser] = useState({});
  const decoded = JWTTOken();
  const UserID = decoded.ID;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      dispatch(GetUser({ UserID: id }));
    };
    fetchData();
  }, [id, dispatch, UpdateDilog]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const GetRecipt = async (ObjectID) => {
    setReceiptLoading("Loading");
    const Response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/Checkout/CheckPaymentStatus?ObjectID=${ObjectID}`
    );
    setTimeout(() => {
      window.open(Response.data.Charge.receipt_url);
      setReceiptLoading("Check Reciept");
    }, 2000);
  };

  const GetCancelRecipt = async (ObjectID) => {
    setCancelReceiptLoading("Loading");
    const Response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/Checkout/CheckPaymentStatus?ObjectID=${ObjectID}`
    );
    setTimeout(() => {
      window.open(Response.data.Charge.receipt_url);
      setCancelReceiptLoading("Check Reciept");
    }, 2000);
  };

  const HandleBlock = () => {
    if (BlockDilog == true) {
      setBlockuser("");
      setBlockDilog(false);
    } else {
      setBlockuser(data._id);
      setBlockDilog(true);
    }
  };

  const HandleUpdate = () => {
    if (UpdateDilog == true) {
      setUpdateDilog(false);
    } else {
      setUpdateUser({
        _id: data._id,
        UserName: data.UserName,
        Password: data.Password,
        PhoneNumber: data.PhoneNumber,
        Role: data.Role,
        StripeID: data.StripeID,
        Block: data.Block,
      });
      setUpdateDilog(true);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <BlockDilogs
        open={BlockDilog}
        HandleClose={HandleBlock}
        User={Blockuser}
        Operation={data.Block}
      />
      <DetailsUpdateDilog
        open={UpdateDilog}
        HandleClose={HandleUpdate}
        User={UpdateUser}
      />
      {/* User Information */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          User Information
        </h1>
        <div className="space-y-4">
          <p className="text-gray-600">
            <strong className="text-gray-800">Name:</strong> {data.UserName}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Phone Number:</strong>{" "}
            {data.PhoneNumber}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Role:</strong> {data.Role}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Stripe ID:</strong>{" "}
            {data.StripeID}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Password:</strong> {data.Password}
          </p>
          <p className="font-medium">
            <strong className="text-gray-800">Block Status:</strong>{" "}
            <span
              className={`px-3 py-1 text-sm font-bold uppercase rounded-full ${
                data.Block
                  ? "bg-red-100 text-red-600 border border-red-600"
                  : "bg-green-100 text-green-600 border border-green-600"
              }`}
            >
              {data.Block ? "Blocked" : "Unblocked"}
            </span>
          </p>
        </div>
        <div className="mt-6">
          <button
            onClick={HandleUpdate}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-800 text-white font-medium text-sm uppercase rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:from-amber-500 hover:via-amber-700 hover:to-amber-900"
          >
            Update Details
          </button>
        </div>
      </div>

      {/* Cart Products */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Cart Products
        </h2>
        {data.CartProducts && data.CartProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.CartProducts.map((product, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <img
                  src={product.Image}
                  alt={product.Name}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.Name}
                  </h3>
                  <p className="text-gray-600">
                    <strong className="font-medium text-gray-800">Type:</strong>{" "}
                    {product.Type}
                  </p>
                  <p className="text-gray-600">
                    <strong className="font-medium text-gray-800">
                      Price:
                    </strong>{" "}
                    <span className="text-green-600 font-bold">
                      ${product.Price}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6">
            No products in the cart.
          </p>
        )}
      </div>

      {/* Checkout Details */}
      <div className="bg-white w-full rounded-2xl shadow-lg p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Checkout
        </h2>
        {data.Checkout && data.Checkout.length > 0 ? (
          data.Checkout.map((checkout, index) => (
            <div
              key={index}
              className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Order {index + 1}
              </h3>
              <div>
                <p className="font-medium text-gray-800 mb-2">
                  <strong>Products:</strong>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {checkout.Product.map((product, idx) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <img
                        src={product.Image}
                        alt={product.Name}
                        className="w-full h-[200px] object-cover"
                      />
                      <div className="p-4 space-y-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {product.Name}
                        </h3>
                        <p className="text-gray-600">
                          <strong className="font-medium text-gray-800">
                            Type:
                          </strong>{" "}
                          {product.Type}
                        </p>
                        <p className="text-gray-600">
                          <strong className="font-medium text-gray-800">
                            Price:
                          </strong>{" "}
                          <span className="text-green-600 font-bold">
                            ${product.Price}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 mt-2 bg-gray-100 rounded-lg shadow-sm">
                <p className="text-gray-700 font-medium mb-2">
                  <strong>Address:</strong>
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Street:</strong> {checkout.Address.Street || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>State:</strong> {checkout.Address.State || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Pincode:</strong> {checkout.Address.Pincode || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Country:</strong> {checkout.Address.Country || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>City:</strong> {checkout.Address.City || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Area:</strong> {checkout.Address.Area || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Payment Method:</strong>{" "}
                  {checkout.Address.PaymentMethod || "N/A"}
                </p>
                {checkout.Address.PaymentMethod === "Online Payment" ? (
                  <button
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-800 text-white text-sm font-medium rounded-md shadow-md hover:bg-gradient-to-r hover:from-cyan-500 hover:via-cyan-700 hover:to-cyan-900 transition-all duration-200"
                    onClick={() => GetRecipt(checkout.ChargeID)}
                  >
                    {ReceiptLoading ? ReceiptLoading : "Check Receipt"}
                  </button>
                ) : (
                  <p className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white text-sm font-medium rounded-md shadow-md">
                    Product is ordered on cash on delivery. Receipt not
                    available.
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-6">No checkout history.</p>
        )}
      </div>

      {/* Order History */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Order History
        </h2>
        {data.OrderHistory && data.OrderHistory.length > 0 ? (
          data.OrderHistory.map((order, index) => (
            <div
              key={index}
              className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Order {index + 1}
              </h3>
              <div>
                <p className="font-medium text-gray-800 mb-2">
                  <strong>Products:</strong>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {order.Product.map((product, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200"
                    >
                      <img
                        src={product.Image}
                        alt={product.Name}
                        className="w-full h-[200px] object-cover"
                      />
                      <div className="p-4 space-y-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {product.Name}
                        </h3>
                        <p className="text-gray-600">
                          <strong className="font-medium text-gray-800">
                            Type:
                          </strong>{" "}
                          {product.Type}
                        </p>
                        <p className="text-gray-600">
                          <strong className="font-medium text-gray-800">
                            Price:
                          </strong>{" "}
                          <span className="text-green-600 font-bold">
                            ${product.Price}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
                <p className="text-gray-700 font-medium mb-2">
                  <strong>Address:</strong>
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Street:</strong> {order.Address.Street || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>State:</strong> {order.Address.State || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Pincode:</strong> {order.Address.Pincode || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Country:</strong> {order.Address.Country || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>City:</strong> {order.Address.City || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Area:</strong> {order.Address.Area || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Payment Method:</strong>{" "}
                  {order.Address.PaymentMethod || "N/A"}
                </p>
                {order.Address.PaymentMethod === "Online Payment" ? (
                  <button
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-800 text-white text-sm font-medium rounded-md shadow-md hover:bg-gradient-to-r hover:from-cyan-500 hover:via-cyan-700 hover:to-cyan-900 transition-all duration-200"
                    onClick={() => GetCancelRecipt(order.ChargeID)}
                  >
                    {CancelReceiptLoading
                      ? CancelReceiptLoading
                      : "Check Receipt"}
                  </button>
                ) : (
                  <p className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white text-sm font-medium rounded-md shadow-md">
                    Product is ordered on cash on delivery.
                  </p>
                )}
              </div>

              <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow">
                <p className="text-gray-700 font-medium">
                  <strong>Canceled:</strong> {order.Canceled ? "Yes" : "No"}
                </p>
                {order.Canceled && (
                  <p className="mt-2 text-gray-700">
                    <strong>Reason:</strong> {order.Reason}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-6">
            No order history available.
          </p>
        )}
      </div>

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

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Operations</h1>
        {data._id === UserID ? (
          <div className="flex items-center justify-center h-fit w-full p-4 bg-gradient-to-r from-teal-300 via-teal-600 to-teal-900 rounded-md text-white uppercase font-medium shadow-md">
            You Cannot Block Yourself
          </div>
        ) : data.Role === "Admin" ? (
          <div className="flex items-center justify-center h-fit w-full p-4 bg-gray-100 rounded-md text-gray-700 uppercase font-medium shadow-md">
            You Cannot Block an Admin
          </div>
        ) : (
          <button
            onClick={HandleBlock}
            className="h-fit w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-teal-300 via-teal-600 to-teal-900 uppercase text-white font-semibold rounded-md shadow-md transition-all duration-200 hover:bg-gradient-to-r hover:from-teal-400 hover:via-teal-700 hover:to-teal-950"
          >
            {data.Block === true ? "Unblock User" : "Block User"}
          </button>
        )}
      </div>
    </div>
  );
};

export default DashBoardProductDetails;
