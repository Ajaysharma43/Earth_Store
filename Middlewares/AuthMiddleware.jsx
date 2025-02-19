import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../AxiosInterseptors/TokenVerify";
import {jwtDecode} from "jwt-decode";

const AuthMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const accessToken = sessionStorage.getItem("AccessToken");
        const refreshToken = Cookies.get("RefreshToken");

        if (accessToken) {
          if (refreshToken) {
            const response = await api.post("/VerifyRoute");
            if (response.data.message === "expired") {
              const decoded = jwtDecode(refreshToken);
              const refreshResponse = await api.post("/RefreshToken", {
                RefreshToken: refreshToken,
                Userid: decoded.ID,
                Role: decoded.Role,
                Block : decoded.Block,
              });

              if (
                refreshResponse.data.message === "NotExisted" ||
                refreshResponse.data.message === "expired"
              ) {
                navigate("/login");
                setVerified(false); // User is not verified
                return;
              }

              sessionStorage.setItem("AccessToken", refreshResponse.data.AccessToken);
              setVerified(true);
            } else {
              setVerified(true); 
            }
          } else {
            navigate("/login"); 
            setVerified(false);
          }
        } else {
          if (refreshToken) {
            const decoded = jwtDecode(refreshToken);
            const refreshResponse = await api.post("/RefreshToken", {
              RefreshToken: refreshToken,
              Userid: decoded.ID,
              Role: decoded.Role,
              Block : decoded.Block,
            });

            if (
              refreshResponse.data.message === "NotExisted" ||
              refreshResponse.data.message === "expired"
            ) {
              navigate("/login");
              setVerified(false);
              return;
            }

            sessionStorage.setItem("AccessToken", refreshResponse.data.AccessToken);
            setVerified(true);
          } else {
            navigate("/login"); // No RefreshToken
            setVerified(false);
          }
        }
      } catch (error) {
        console.error("Authentication error:", error);
        navigate("/login");
        setVerified(false);
      }
    };

    verifyUser();
  }, [navigate]);

  // Show a loading indicator while verifying
  if (verified === null) {
    return navigate("/login");
  }

  if(verified == false)
  {
    return navigate("/login");
  }

  return children;
};

export default AuthMiddleware;
