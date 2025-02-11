import { useEffect, useState } from "react";
import CheckoutInstance from "../../../AxiosInterseptors/CheckoutInterseptor";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { JWTTOken } from "../JWTDecode/JWTdecode";

const Checkout_Product = () => {
    const {id} = useParams();
    const [Product  ,setProduct] = useState({})
    useEffect(() => {
        const GetProduct = async() => {
            const decoded = JWTTOken();
            const UserID = decoded.ID;
            const response = await CheckoutInstance.get(`/GetSingleProduct?UserID=${UserID}&ProductID=${id}`)
            setProduct(response.data.CheckoutProduct)
        }
        GetProduct()
    },[])
    return(
        <>
        <h1>{Product.Name}</h1>
        </>
    )
}

export default Checkout_Product;