import axios from "axios";

const apiinstance = axios.create({
    baseURL : `${import.meta.env.VITE_API_URL}/Data`
})

export default apiinstance;
