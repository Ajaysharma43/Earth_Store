import { Dialog, DialogContent } from "@mui/material";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const AddUser = ({ open, handleClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [ConfirmPassword , setConfirmPassword] = useState(false);
    const passwordRef = useRef();
    const ConfirmPasswordRef = useRef();

    const handlePasswordToggle = () => {
        setShowPassword((prevState) => !prevState);
        if (passwordRef.current) {
          passwordRef.current.type =
            passwordRef.current.type === "password" ? "text" : "password";
        }
      };

      const handleConfirmPasswordToggle = () => {
        setConfirmPassword((prevState) => !prevState);
        if (ConfirmPasswordRef.current) {
            ConfirmPasswordRef.current.type =
            ConfirmPasswordRef.current.type === "password" ? "text" : "password";
        }
      };
  return (
    <>
      <Dialog open={open} sx={{
      bgcolor: "rgba(255, 255, 255, 0.01)", 
      backdropFilter: "blur(3px)", 
      borderRadius: "8px", 
      padding: "16px", 
    }}>
        <DialogContent>
          <div className="p-8 break-words whitespace-pre-wrap max-w-lg mx-auto">
            {/* Form */}
            <form action="" onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {/* Username */}
              <div className="flex flex-col">
                <label htmlFor="username" className="font-mono font-bold">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  className="bg-transparent h-fit w-full border-b border-solid border-gray-400 focus:outline-none focus:border-black"
                  placeholder="Enter username"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="font-mono font-bold">
                  Phone Number:
                </label>
                <input
                  type="number"
                  id="phoneNumber"
                  className="bg-transparent h-fit w-full border-b border-solid border-gray-400 focus:outline-none focus:border-black"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label htmlFor="password" className="font-mono font-bold">
                  Password:
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="confirmPassword"
                    ref={passwordRef}
                    className="bg-transparent h-fit w-full border-b border-solid border-gray-400 focus:outline-none focus:border-black"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={handlePasswordToggle}
                    className="absolute right-0 top-0 mt-2 text-sm text-gray-500 hover:text-black"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="font-mono font-bold">
                  Confirm Password:
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="confirmPassword"
                    ref={ConfirmPasswordRef}
                    className="bg-transparent h-fit w-full border-b border-solid border-gray-400 focus:outline-none focus:border-black"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={handleConfirmPasswordToggle}
                    className="absolute right-0 top-0 mt-2 text-sm text-gray-500 hover:text-black"
                  >
                    {ConfirmPassword ? <FaEyeSlash/> : <FaEye />}
                  </button>
                </div>
              </div>
            </form>

            {/* Buttons */}
            <div className="flex flex-wrap justify-between mt-4">
              <button className="h-fit w-full md:w-auto p-3 m-1 text-white uppercase rounded-md transition-all duration-300 bg-blue-600 hover:bg-white hover:text-black hover:border hover:border-spacing-1 hover:border-blue-600">
                Create
              </button>
              <button
                onClick={handleClose}
                className="h-fit w-full md:w-auto p-3 m-1 text-black border border-spacing-1 border-blue-600 uppercase rounded-md transition-all duration-300 bg-white hover:bg-blue-600 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddUser;
