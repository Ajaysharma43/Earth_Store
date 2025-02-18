import axios from "axios";
import { jwtDecode } from "jwt-decode";

const VerifyRole = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/VerifyRole`
})


VerifyRole.interceptors.request.use(
    async (config) => {
        const AccessToken = sessionStorage.getItem("AccessToken");
        const Decoded = jwtDecode(AccessToken)
        if(Decoded.Role)
        {
            config.headers['Authorization'] = `Bearer ${Decoded.Role}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default VerifyRole;