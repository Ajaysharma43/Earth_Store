import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/Autheorize`,
});

api.interceptors.request.use(
  (config) => {
    const AccessToken = sessionStorage.getItem("AccessToken");
    console.log(AccessToken);
    
    if (AccessToken) {
      config.headers["Authorization"] = `Bearer ${AccessToken}`;
    }
    console.log(config);
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        console.log("called");
        const RefreshToken = Cookies.get("RefreshToken");
        const response = await api.post('/RefreshToken',{RefreshToken});
        console.log(response.data);
        sessionStorage.setItem('AccessToken' , response.data.AccessToken)
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.AccessToken}`
        return api(originalRequest)
      } catch (error) {
        Cookies.remove('RefreshToken')
        sessionStorage.removeItem('AccessToken')
        const navigate = useNavigate();
        navigate('/login')
        console.error("the error is " + error);
      }
    }
  }
);

export default api;
