import { Dialog, DialogContent } from "@mui/material";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NewUser } from "../../../Features/DashboardSlice/DashboardData";

const AddUser = ({ open, handleClose }) => {
    const dispatch = useDispatch()
    const [Loading , setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handlePasswordToggle = () => {
    setShowPassword((prevState) => !prevState);
    if (passwordRef.current) {
      passwordRef.current.type =
        passwordRef.current.type === "password" ? "text" : "password";
    }
  };

  const handleConfirmPasswordToggle = () => {
    setConfirmPasswordVisible((prevState) => !prevState);
    if (confirmPasswordRef.current) {
      confirmPasswordRef.current.type =
        confirmPasswordRef.current.type === "password" ? "text" : "password";
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" })); // Clear error on input

    if (id === "password") {
      evaluatePasswordStrength(value); // Update password strength
    }
  };

  const evaluatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 20; // Length
    if (/[A-Z]/.test(password)) strength += 20; // Uppercase
    if (/[a-z]/.test(password)) strength += 20; // Lowercase
    if (/\d/.test(password)) strength += 20; // Numeric
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 20; // Special character

    setPasswordStrength(strength);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must include at least one uppercase letter.";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Password must include at least one lowercase letter.";
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "Password must include at least one numeric digit.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = "Password must include at least one special character.";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateUser = async() => {
    if (validateForm()) {
      const newUser = {
        UserName: formData.username,
        PhoneNumber: formData.phoneNumber,
        Password: formData.password,
      };
      console.log("User created:", newUser);
      setLoading(true)
setTimeout(async() => {
    await dispatch(NewUser({FormData : newUser}))
      // Reset form and close dialog
      setFormData({
        username: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
      setLoading(false)
      handleClose();
}, 3000);
      
    }
  };

  return (
    <>
      <Dialog
        open={open}
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.01)",
          backdropFilter: "blur(3px)",
          borderRadius: "8px",
          padding: "16px",
        }}
      >
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
                  value={formData.username}
                  onChange={handleInputChange}
                  className="bg-transparent h-fit w-full border-b border-solid border-gray-400 focus:outline-none focus:border-black"
                  placeholder="Enter username"
                />
                {errors.username && (
                  <span className="text-red-500 text-sm">{errors.username}</span>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="font-mono font-bold">
                  Phone Number:
                </label>
                <input
                  type="number"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="bg-transparent h-fit w-full border-b border-solid border-gray-400 focus:outline-none focus:border-black"
                  placeholder="Enter phone number"
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-sm">{errors.phoneNumber}</span>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label htmlFor="password" className="font-mono font-bold">
                  Password:
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    ref={passwordRef}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-transparent h-fit w-full border-b border-solid border-gray-400 focus:outline-none focus:border-black"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={handlePasswordToggle}
                    className="absolute right-0 top-0 mt-2 text-sm text-gray-500 hover:text-black"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password}</span>
                )}
                {/* Password Strength Bar */}
                <div className="mt-2">
                  <div className="w-full bg-gray-300 h-2 rounded-full">
                    <div
                      className={`h-full rounded-full ${
                        passwordStrength >= 80
                          ? "bg-green-500"
                          : passwordStrength >= 60
                          ? "bg-yellow-500"
                          : passwordStrength >= 40
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {passwordStrength < 40
                      ? "Weak"
                      : passwordStrength < 60
                      ? "Moderate"
                      : passwordStrength < 80
                      ? "Strong"
                      : "Very Strong"}
                  </span>
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
                    ref={confirmPasswordRef}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-transparent h-fit w-full border-b border-solid border-gray-400 focus:outline-none focus:border-black"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={handleConfirmPasswordToggle}
                    className="absolute right-0 top-0 mt-2 text-sm text-gray-500 hover:text-black"
                  >
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
                )}
              </div>
            </form> 

            {/* Buttons */}
            <div className="flex flex-wrap justify-between mt-4">
              <button
                onClick={handleCreateUser}
                className="h-fit w-full md:w-auto p-3 m-1 text-white uppercase rounded-md transition-all duration-300 bg-blue-600 hover:bg-white hover:text-black hover:border hover:border-spacing-1 hover:border-blue-600"
              >
                {Loading == true ? "Creating" : "Create"}
              </button>
              <button
                onClick={handleClose}
                className="h-fit w-full md:w-auto p-3 m-1 text-white uppercase rounded-md transition-all duration-300 bg-red-600 hover:bg-white hover:text-black hover:border hover:border-spacing-1 hover:border-red-600"
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
