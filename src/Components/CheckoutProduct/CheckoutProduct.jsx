import { useEffect, useState } from "react";
import CheckoutInstance from "../../../AxiosInterseptors/CheckoutInterseptor";
import { useParams } from "react-router-dom";
import { JWTTOken } from "../JWTDecode/JWTdecode";
import { useDispatch } from "react-redux";
import { CheckPaymentStatus } from "../Features/Checkout/Checkout";

const Checkout_Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [address, setAddress] = useState(null);
    const [Charges , setcharges] = useState('')
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch()

    useEffect(() => {
        const GetProduct = async () => {
            try {
                const decoded = JWTTOken();
                const UserID = decoded.ID;

                const response = await CheckoutInstance.get(`/GetSingleProduct?UserID=${UserID}&ObjectID=${id}`);
                console.log(response.data);

                setProduct(response.data.CheckoutProduct.Product);
                setAddress(response.data.CheckoutProduct.Address);
                setcharges(response.data.CheckoutProduct.ChargeID)
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        GetProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (!product || product.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-bold text-gray-700">Product Not Found</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">🛒 Checkout Details</h1>

            {/* Products Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {product.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center hover:shadow-2xl transition-shadow"
                    >
                        <img
                            src={item.Image}
                            alt={item.Name}
                            className="w-[150px] h-[150px] rounded-lg object-cover mb-4"
                        />
                        <h2 className="text-lg font-semibold text-gray-800">{item.Name}</h2>
                        <p className="text-gray-600">Type: {item.Type}</p>
                        <p className="text-gray-600">Quantity: {item.Quantity}</p>
                        <p className="text-gray-800 font-medium mt-2">💰 ${item.Price.toFixed(2)}</p>
                    </div>
                ))}
            </div>

            {/* Address Section */}
            {address && (
                <div className="bg-gray-100 shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">📍 Delivery Address</h2>
                    <p className="text-gray-600">
                        <strong>Street:</strong> {address.Street}
                    </p>
                    <p className="text-gray-600">
                        <strong>Area:</strong> {address.Area}
                    </p>
                    <p className="text-gray-600">
                        <strong>City:</strong> {address.City}
                    </p>
                    <p className="text-gray-600">
                        <strong>State:</strong> {address.State}
                    </p>
                    <p className="text-gray-600">
                        <strong>Country:</strong> {address.Country}
                    </p>
                    <p className="text-gray-600">
                        <strong>Pincode:</strong> {address.Pincode}
                    </p>
                    <p className="text-gray-600">
                        <strong>PaymentMethod:</strong> {address.PaymentMethod}
                    </p>
                    
                </div>
            )}

            <div className="bg-gray-100 shadow-md rounded-lg p-6 mt-5 grid justify-start gap-3">
                <button className="h-[30px] w-fit bg-gradient-to-r from-orange-400 to-orange-700 pr-3 pl-3 uppercase text-white rounded-md transition-all duration-200 hover:ring hover:ring-offset-2 hover:ring-orange-500">
                    Cancel Order
                </button>

                <button className="h-[30px] w-fit bg-gradient-to-r from-orange-400 to-orange-700 pr-3 pl-3 uppercase text-white rounded-md transition-all duration-200 hover:ring hover:ring-offset-2 hover:ring-orange-500"
                onClick={() => dispatch(CheckPaymentStatus({ObjectID : Charges}))}>
                    Payment Status
                </button>
            </div>
        </div>
    );
};

export default Checkout_Product;
