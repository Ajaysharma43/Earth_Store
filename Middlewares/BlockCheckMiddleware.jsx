import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VerifyRole from "../AxiosInterseptors/RoleVerify";

const BlockCheckMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    const checkBlock = async () => {
      const accessToken = sessionStorage.getItem("AccessToken");
      if (accessToken) {
        const decode = jwtDecode(accessToken);
        const response = await VerifyRole.post("/VerifyBlock", {
          UserId: decode.ID,
        });
        console.log(response.data.success);

        if (response.data.success === false) {
          setVerified(false);
        } else if (response.data.success === true) {
          setVerified(true);
        }
      } else {
        setVerified(false);
      }

    };

    checkBlock();
  }, []);

  if (verified === false) {
    console.log(verified);

    navigate("/BlockedUserpage");
  }

  return verified ? children : null;
};



export default BlockCheckMiddleware;
