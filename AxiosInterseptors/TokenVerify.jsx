import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/Autheorize`,
});


api.interceptors.request.use(
  async (config) => {
    const AccessToken = sessionStorage.getItem("AccessToken");
    const Decoded  = jwtDecode(AccessToken)
    
    if (AccessToken) {
      config.headers["Authorization"] = `Bearer ${AccessToken}`;
      config.headers["User-Agent"] = `${Decoded.Role}`
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) =>  {
//     console.log("Response Interceptor - Success:");
//     console.log("URL:", response.config.url);
//     console.log("Status:", response.status);
//     console.log("Data:", response.data);
//     console.log(response);
//   },
//   async (error) => {
//     console.log(error);
    
//     const originalRequest = error.config;
    
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         const RefreshToken = Cookies.get("RefreshToken");
//         const response = await api.post('/RefreshToken',{RefreshToken});
//         console.log(response.data);
//         sessionStorage.setItem('AccessToken' , response.data.AccessToken)
//         api.defaults.headers.common['Authorization'] = `Bearer ${response.data.AccessToken}`
//         return api(originalRequest)
//       } catch (error) {
//         console.error("the error is " + error);
//       }
//     }
//   }
// );

export default api;
