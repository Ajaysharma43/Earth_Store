import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Features/AuthSlice/Login";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const Removetoken = () => {
    dispatch(logout())
    navigate("/login"); 
  };

  return (
    <div>
      <button
        onClick={()=>Removetoken()}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
