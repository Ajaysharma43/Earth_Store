import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "../../Features/DashboardSlice/DashboardData";
import { Link } from "react-router-dom";

const DashBoardUsersComponent = () => {
  const Data = useSelector((state) => state.Dashboardreducer.AllUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    const GetUsers = () => {
      dispatch(GetAllUsers());
      console.log(Data);
    };
    GetUsers();
  }, [Data.length, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        User Dashboard
      </h1>

      {/* User List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Data.map((user, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            {/* User Name */}
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {user.UserName}
            </h2>

            {/* User Details */}
            <div className="text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-700">Role:</span>{" "}
                {user.Role}
              </p>
              <p>
                <span className="font-medium text-gray-700">Phone:</span>{" "}
                {user.PhoneNumber}
              </p>

              <p>
                <span className="font-medium text-gray-700">OrderHistory:</span>{" "}
                {user.OrderHistory.length || 0}
              </p>

              <p>
                <span className="font-medium text-gray-700">CartProducts:</span>{" "}
                {user.CartProducts.length || 0}
              </p>

              <p>
                <span className="font-medium text-gray-700">Checkout:</span>{" "}
                {user.Checkout.length || 0}
              </p>

              <Link to={`/dashboard/Productdetails/${user._id}`}>
                <button>View all Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoardUsersComponent;
