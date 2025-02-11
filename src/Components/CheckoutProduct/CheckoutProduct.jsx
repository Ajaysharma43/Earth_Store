import { useEffect, useState } from "react";
import CheckoutInstance from "../../../AxiosInterseptors/CheckoutInterseptor";
import { useParams } from "react-router-dom";
import { JWTTOken } from "../JWTDecode/JWTdecode";

const Checkout_Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const GetProduct = async () => {
            try {
                const decoded = JWTTOken();
                const UserID = decoded.ID;
                const response = await CheckoutInstance.get(`/GetSingleProduct?UserID=${UserID}&ProductID=${id}`);
                setProduct(response.data.CheckoutProduct);
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

    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-bold text-gray-700">Product Not Found</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Product Image */}
                <div className="flex justify-center">
                    <img
                        src={product.Image}
                        alt={product.Name}
                        className="rounded-lg shadow-lg object-cover w-full max-w-sm md:max-w-md lg:max-w-lg"
                    />
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-gray-900">{product.Name}</h1>
                    <p className="text-xl font-semibold text-green-600">💰 ${product.Price.toFixed(2)}</p>
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-md">
                        {product.Type}
                    </span>
                    <p className="text-gray-600 leading-relaxed">{product.Description}</p>

                    
                </div>
            </div>
        </div>
    );
};

export default Checkout_Product;
