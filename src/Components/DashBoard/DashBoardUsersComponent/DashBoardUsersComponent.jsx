import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUser, GetAllUsers } from "../../Features/DashboardSlice/DashboardData";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaCartPlus,
  FaHistory,
  FaCreditCard,
  FaUsers,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { AiOutlineUserAdd } from "react-icons/ai";
import AddUser from "./Dilogs/AddUser";

const DashBoardUsersComponent = () => {
  const Data = useSelector((state) => state.Dashboardreducer.AllUsers);
  const [AddUserDialog, setAddUserDialog] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const GetUsers = () => {
      dispatch(GetAllUsers());
      console.log(Data);
    };
    GetUsers();
  }, [Data.length, dispatch]);

  const HandleDialog = () => {
    setAddUserDialog((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <AddUser open={AddUserDialog} handleClose={HandleDialog} />

      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaUsers />
          User Dashboard
        </h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={HandleDialog}
        >
          <AiOutlineUserAdd className="text-xl" />
          Add User
        </button>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md border-b-2 border-gray-400">
          <thead className="bg-gray-100 border border-gray-400 border-r-0 border-l-0 border-t-2 border-b-2">
            <tr>
              <th className="font-mono text-left px-4 py-2 text-black font-bold">
                #
              </th>
              <th className="font-mono text-left px-4 py-2 text-black font-bold">
                User Name
              </th>
              <th className="font-mono text-left px-4 py-2 text-black font-bold">
                Role
              </th>
              <th className="font-mono text-left px-4 py-2 text-black font-bold">
                Phone
              </th>
              <th className="font-mono text-left px-4 py-2 text-black font-bold">
                Order History
              </th>
              <th className="font-mono text-left px-4 py-2 text-black font-bold">
                Cart Products
              </th>
              <th className="font-mono text-left px-4 py-2 text-black font-bold">
                Checkout
              </th>
              <th className="font-mono text-left px-4 py-2 text-black font-bold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Data.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-all">
                <td className="font-sans font-thin px-4 py-2 border-gray-200">
                  {index + 1}
                </td>
                <td className="font-sans font-thin px-4 py-2 border-gray-200">
                  {user.UserName}
                </td>
                <td className="font-sans font-thin px-4 py-2 border-gray-200">
                  {user.Role}
                </td>
                <td className="font-sans font-thin px-4 py-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-gray-500" />
                    {user.PhoneNumber}
                  </div>
                </td>
                <td className="font-sans font-thin px-4 py-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <FaHistory className="text-gray-500" />
                    {user.OrderHistory.length || 0}
                  </div>
                </td>
                <td className="font-sans font-thin px-4 py-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <FaCartPlus className="text-gray-500" />
                    {user.CartProducts.length || 0}
                  </div>
                </td>
                <td className="font-sans font-thin px-4 py-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <FaCreditCard className="text-gray-500" />
                    {user.Checkout.length || 0}
                  </div>
                </td>
                <td className="font-sans font-thin px-4 py-2 border-gray-200 flex gap-1">
                  <Link
                    to={`/dashboard/User/${user._id}`}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    View
                  </Link>
                  {
                    user.Role == "Admin" ? 
                    (
                      <h1 className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600">Cannot delete Admin</h1>
                    )
                    :
                    (
<button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => dispatch(DeleteUser({UserID : user._id}))}>
                    Delete
                  </button>
                    )
                  }
                  
                </td>
              </tr>
            ))}
            {Data.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-4 text-gray-500 border-gray-200"
                >
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashBoardUsersComponent;
