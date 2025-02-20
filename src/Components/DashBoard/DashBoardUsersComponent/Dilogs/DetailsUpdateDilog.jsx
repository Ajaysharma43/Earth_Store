import { Dialog, DialogContent } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateUser } from "../../../Features/DashboardSlice/DashboardData";

const DetailsUpdateDialog = ({ open, HandleClose, User, Operation }) => {
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [FormData, setFormData] = useState({});

  // Initialize form data when the dialog opens
  useEffect(() => {
    if (open) {
      setFormData({
        _id: User?._id || "",
        UserName: User?.UserName || "",
        Password: User?.Password || "",
        PhoneNumber: User?.PhoneNumber || "",
        Role: User?.Role || "",
        StripeID: User?.StripeID || "",
        Block: User?.Block || false,
      });
    }
  }, [open, User]);

  // Toggle password visibility
  const handlePasswordToggle = () => {
    setShowPassword((prevState) => !prevState);
    if (passwordRef.current) {
      passwordRef.current.type =
        passwordRef.current.type === "password" ? "text" : "password";
    }
  };

  // Handle form input changes
  const handleInputChange = (e, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", FormData);
    await dispatch(UpdateUser({ FormData: FormData }));
    HandleClose();
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6 bg-gray-100 rounded-lg w-full"
        >
          {/* Form Header */}
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            {Operation || "Update Details"}
          </h2>

          {/* Username Field */}
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={FormData.UserName}
              onChange={(e) => handleInputChange(e, "UserName")}
              placeholder="Enter your username"
              className="bg-transparent px-3 py-2 border border-black rounded-md focus:outline-none"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="flex items-center border-black border rounded-md px-3 py-2">
              <input
                type="password"
                id="password"
                ref={passwordRef}
                value={FormData.Password}
                onChange={(e) => handleInputChange(e, "Password")}
                placeholder="Enter your password"
                className="bg-transparent px-3 py-2 rounded-md focus:outline-none"
              />
              <button
                type="button"
                onClick={handlePasswordToggle}
                className="focus:outline-none text-black"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Number Field */}
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="number"
              className="text-sm font-medium text-gray-700"
            >
              Number
            </label>
            <input
              type="number"
              id="number"
              value={FormData.PhoneNumber}
              onChange={(e) => handleInputChange(e, "PhoneNumber")}
              placeholder="Enter your number"
              className="bg-transparent px-3 py-2 border border-black rounded-md focus:outline-none"
            />
          </div>

          {/* Role Selection */}
          <div className="flex flex-col space-y-1">
            {FormData.Role == "Admin" ? (
              <h1>Role Cannot be Changed</h1>
            ) : (
              <>
                <label
                  htmlFor="role"
                  className="text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  id="role"
                  value={FormData.Role}
                  onChange={(e) => handleInputChange(e, "Role")}
                  className="bg-transparent px-3 py-2 border border-black rounded-md focus:outline-none"
                >
                  <option value="Editor">Editor</option>
                  <option value="User">User</option>
                </select>
              </>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={HandleClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Close
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsUpdateDialog;
