import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { BlockUser, GetUser } from "../../Features/DashboardSlice/DashboardData";
import axios from "axios";
import BlockDilogs from "./Dilogs/BlockDilog";

const DashBoardProductDetails = () => {
  const { id } = useParams();
  const data = useSelector((state) => state.Dashboardreducer.User);
  const [ReceiptLoading , setReceiptLoading] = useState("")
  const [CancelReceiptLoading , setCancelReceiptLoading] = useState("")
  const [BlockDilog , setBlockDilog]  = useState(false)
  const [Blockuser , setBlockuser] = useState('')
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      dispatch(GetUser({ UserID: id }));
      console.log(data.Block);
      
    };
    fetchData();
  }, [id, dispatch]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const GetRecipt = async (ObjectID) => {
    setReceiptLoading("Loading")
    const Response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/Checkout/CheckPaymentStatus?ObjectID=${ObjectID}`
    );
    setTimeout(() => {
        window.open(Response.data.Charge.receipt_url);
    setReceiptLoading("Check Reciept")
    }, 2000);
  };

  const GetCancelRecipt = async (ObjectID) => {
    setCancelReceiptLoading("Loading")
    const Response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/Checkout/CheckPaymentStatus?ObjectID=${ObjectID}`
    );
    setTimeout(() => {
        window.open(Response.data.Charge.receipt_url);
    setCancelReceiptLoading("Check Reciept")
    }, 2000);
    
  };

  const HandleBlock = () => {
    if(BlockDilog == true)
    {
        setBlockuser("")
        setBlockDilog(false)
    }
    else
    {
        setBlockuser(data._id)
        setBlockDilog(true)
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
        <BlockDilogs open={BlockDilog} HandleClose={HandleBlock} User={Blockuser} Operation={data.Block}/>
      {/* User Information */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h1 >User Information</h1>
        <p>
          <strong>Name:</strong> {data.UserName}
        </p>
        <p>
          <strong>Phone Number:</strong> {data.PhoneNumber}
        </p>
        <p>
          <strong>Role:</strong> {data.Role}
        </p>
        <p>
          <strong>Stripe ID:</strong> {data.StripeID}
        </p>
        <p>
          <strong>Password:</strong> {data.Password}
        </p>
        <p>
            <strong className="font-medium uppercase ">Block:</strong> {data.Block== true ? "Blocked" : "UnBlocked"}
        </p>
      </div>

      {/* Cart Products */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Cart Products</h2>
        {data.CartProducts ? (
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.CartProducts.map((product, index) => (
              <div key={index} className="p-4 bg-gray-100 w-fit rounded-lg">
                <img
                  src={product.Image}
                  alt={product.Name}
                  className="rounded-lg mb-4 w-full h-fit object-cover"
                />
                <h3 className="font-bold">{product.Name}</h3>
                <p>
                  <strong>Type:</strong> {product.Type}
                </p>
                <p>
                  <strong>Price:</strong> ${product.Price}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No products in the cart.</p>
        )}
      </div>

      {/* Checkout Details */}
      <div className="bg-white w-fit rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Checkout</h2>
        {data.Checkout ? (
          data.Checkout.map((checkout, index) => (
            <div key={index} className="mb-4  w-fit  border-b pb-4">
              <h3 className="font-bold mb-2">Order {index + 1}</h3>
              <div>
                <strong>Products:</strong>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {checkout.Product.map((product, idx) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-100 rounded-lg"
                    >
                      <img
                        src={product.Image}
                        alt={product.Name}
                        className="rounded-lg mb-4 w-full h-fit object-cover"
                      />
                      <h3 className="font-bold">{product.Name}</h3>
                      <p>
                        <strong>Type:</strong> {product.Type}
                      </p>
                      <p>
                        <strong>Price:</strong> ${product.Price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="w-fit h-fit bg-gray-100 p-4 mt-2 shadow rounded-md">
                <strong>Address:</strong>
                <br />
                Street : {checkout.Address.Street || "N/A"}
                <br />
                State : {checkout.Address.State || "N/A"}
                <br />
                Pincode : {checkout.Address.Pincode || "N/A"}
                <br />
                Country : {checkout.Address.Country || "N/A"}
                <br />
                City : {checkout.Address.City || "N/A"}
                <br />
                Area : {checkout.Address.Area || "N/A"}
                <br />
                PaymentMethod : {checkout.Address.PaymentMethod || "N/A"}
                <br />
                {checkout.Address.PaymentMethod == "Online Payment" ? (
                  <button
                    className="h-fit w-fit uppercase bg-gradient-to-r from-cyan-300 via-cyan-600 to-cyan-900 text-white p-2 rounded-md shadow-md m-2 transition-all duration-200 hover:bg-gradient-to-r hover:from-cyan-400 hover:via-cyan-700 hover:to-cyan-950"
                    onClick={() => GetRecipt(checkout.ChargeID)}
                  >
                    {ReceiptLoading ? ReceiptLoading : "Check Reciept"}
                  </button>
                ) : (
                  <h1 className="h-fit w-fit p-3 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white uppercase rounded-md transition-all duration-200 m-2 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-600">Product is ordered on cash on delivery. Reciept not available</h1>
                )}
              </p>
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
                        className="rounded-lg mb-4 w-full h-fit object-cover"
                      />
                      <h3 className="font-bold">{product.Name}</h3>
                      <p>
                        <strong>Type:</strong> {product.Type}
                      </p>
                      <p>
                        <strong>Price:</strong> ${product.Price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="w-fit h-fit bg-gray-100 p-4 mt-2 shadow rounded-md">
                <strong>Address:</strong>
                <br />
                Street : {order.Address.Street || "N/A"}
                <br />
                State : {order.Address.State || "N/A"}
                <br />
                Pincode : {order.Address.Pincode || "N/A"}
                <br />
                Country : {order.Address.Country || "N/A"}
                <br />
                City : {order.Address.City || "N/A"}
                <br />
                Area : {order.Address.Area || "N/A"}
                <br />
                PaymentMethod : {order.Address.PaymentMethod || "N/A"}
                <br />
                {order.Address.PaymentMethod == "Online Payment" ? (
                  <button
                    className="h-fit w-fit uppercase bg-gradient-to-r from-cyan-300 via-cyan-600 to-cyan-900 text-white p-2 rounded-md shadow-md m-2 transition-all duration-200 hover:bg-gradient-to-r hover:from-cyan-400 hover:via-cyan-700 hover:to-cyan-950"
                    onClick={() => GetCancelRecipt(order.ChargeID)}
                  >
                    {CancelReceiptLoading ? CancelReceiptLoading : "Check Reciept"}
                  </button>
                ) : (
                  <h1 className="h-fit w-fit p-3 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white uppercase rounded-md transition-all duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-600">Product is ordered on cash on delivery</h1>
                )}
              </p>
              <p className="w-fit h-fit bg-gray-100 p-4 mt-2 shadow rounded-md">
                <strong>Canceled:</strong> {order.Canceled ? "Yes" : "No"}
              </p>
              {order.Canceled && (
                <p className="w-fit h-fit bg-gray-100 p-4 mt-2 shadow rounded-md">
                  <strong>Reason:</strong> {order.Reason}
                </p>
              )}
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

      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h1 className="text-xl font-semibold mb-4">Operations</h1>
        <button onClick={HandleBlock} className="h-fit w-fit p-3 bg-gradient-to-r from-teal-300 via-teal-600 to-teal-900 uppercase text-white rounded-md hover:bg-gradient-to-r hover:from-teal-400 hover:via-teal-700 hover:to-teal-950">{data.Block== true ? "Unblock User" : "Block User"}</button>
      </div>
    </div>
  );
};

export default DashBoardProductDetails;
