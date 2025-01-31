import { Password, Phone } from "@mui/icons-material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetOtp,
  Setdata,
  updateValue,
} from "../../../Components/Features/AuthSlice/Signup";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Step1 = ({ nextStep }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Full Name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    if (validate()) {
      const { username, phone, password } = formData;
      const userData = { Username: username, Phone: phone, Password: password };
      console.log(userData);
      dispatch(GetOtp({ PhoneNumber: phone }));
      dispatch(updateValue({ Data: userData, PhoneNumber: phone }));
      nextStep();
    }
  };

  return (
    <div className="p-6 bg-[#f7f7f796] m-[12px] rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 1: Basic Information</h2>
      <p className="text-gray-600 mb-6">Enter your name and phone number.</p>
      <div className="grid gap-6">
        <form action="" onSubmit={(e) => e.preventDefault()} className="grid gap-1">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Full Name</span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="block w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Phone Number</span>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="block w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="block w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</span>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="block w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </label>

          <button
            type="button"
            onClick={sendOtp}
            className="w-full flex justify-center py-3 px-6 text-white font-medium bg-[#74a84a] hover:bg-[#2c541d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c541d]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Step1;
