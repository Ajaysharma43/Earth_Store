import axios from "axios";

const CheckoutInstance = axios.create({
    baseURL : `${import.meta.env.VITE_API_URL}/Checkout`
})

export default CheckoutInstance;