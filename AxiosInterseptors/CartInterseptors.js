import axios from "axios";

const URL = import.meta.env.VITE_API_URL
const CartInstance = axios.create({
    baseURL : `${URL}/Cart`
})

export default CartInstance;