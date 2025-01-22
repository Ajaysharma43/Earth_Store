import { Password, Phone } from "@mui/icons-material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import { useSelector, useDispatch } from "react-redux";
import {
  GetOtp,
  Setdata,
  updateValue,
} from "../../../Components/Features/AuthSlice/Signup";
import { useForkRef } from "@mui/material";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Step1 = ({ nextStep }) => {
    const Data = useSelector((state) => state.UserData.Data);
    const dispatch = useDispatch();
    const Phone = useRef();
    const Username = useRef();
    const Passowrd = useRef();
    const ConfirmPassword = useRef();
  
    const Sentopt = async () => {
      const PhoneNumber = Phone.current.value;
      console.log("number is" + PhoneNumber);
  
      if (
        Username.current.value &&
        Phone.current.value &&
        Passowrd.current.value
      ) {
        if (Passowrd.current.value == ConfirmPassword.current.value) {
          const Data = {
            Username: Username.current.value,
            Phone: Phone.current.value,
            Password: Passowrd.current.value,
          };
          console.log(Data);
          dispatch(GetOtp({ PhoneNumber }));
          dispatch(updateValue({ Data , PhoneNumber }));
          nextStep();
        }
      }
    };
    return (
      <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Step 1: Basic Information
        </h2>
        <p className="text-gray-600 mb-6">Enter your name and phone number.</p>
  
        <div className="grid gap-6">
          <form action="" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="fullName" className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </span>
              <input
                type="text"
                id="fullName"
                ref={Username}
                placeholder="Enter your full name"
                className="block w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              />
            </label>
  
            <label htmlFor="phoneNumber" className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </span>
              <input
                type="number"
                id="phoneNumber"
                ref={Phone}
                placeholder="Enter your phone number"
                className="block w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              />
            </label>
  
            <label htmlFor="password" className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </span>
              <input
                type="password"
                id="password"
                ref={Passowrd}
                placeholder="Enter your password"
                className="block w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              />
            </label>
  
            <label htmlFor="confirmPassword" className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </span>
              <input
                type="password"
                id="confirmPassword"
                ref={ConfirmPassword}
                placeholder="Confirm your password"
                className="block w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              />
            </label>
  
            <button onClick={() => Sentopt()}>Submit</button>
          </form>
        </div>
      </div>
    );
  };

  export default Step1;