import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/Autheorize`,
});
api.interceptors.request.use(
  (config) => {
    const AccessToken = sessionStorage.getItem("AccessToken");
    if (AccessToken) {
      config.headers["Authorization"] = `Bearer ${AccessToken}`;
    }
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
        const RefreshToken = Cookies.get("RefreshToken");
        const response = await api.post('/RefreshToken');
        sessionStorage.setItem('AccessToken' , response.data.AccessToken)
      } catch (error) {
        console.error("the error is " + error);
      }
    }
  }
);

export default api;
