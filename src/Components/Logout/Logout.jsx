import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const Removetoken = () => {
    Cookies.remove("RefreshToken");
    sessionStorage.removeItem('AccessToken')
    navigate("/login"); 
  };

  return (
    <div>
      <button
        onClick={Removetoken}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
