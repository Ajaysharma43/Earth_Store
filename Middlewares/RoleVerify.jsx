import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VerifyRole from "../AxiosInterseptors/RoleVerify";

const RoleVerifyMiddleware = ({ children }) => {
  const [isVerified, setIsVerified] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const verifyRole = async () => {
      try {
        const response = await VerifyRole.post("/Verify");
        if (response.data.Success === false) {
          navigate("*"); 
        } else {
          setIsVerified(true); 
        }
      } catch (error) {
        console.error("Role verification failed:", error);
        navigate("*"); // Redirect on error
      }
    };

    verifyRole();
  }, [navigate]);

  // Show a loading spinner or fallback UI while verifying
  if (isVerified === null) {
    return navigate("*");
  }

  return children;
};

export default RoleVerifyMiddleware;
