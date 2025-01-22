import { Password, Phone } from "@mui/icons-material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import { useSelector, useDispatch } from "react-redux";
import {
  GetOtp,
  Setdata,
  updateValue,
} from "../../Components/Features/AuthSlice/Signup";
import { useForkRef } from "@mui/material";
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Children Step 1", content: <Step1 nextStep={() => setCurrentStep(1)}/> },
    { label: "Children Step 2", content: <Step2 nextStep={() => setCurrentStep(2)}/> },
    { label: "Children Step 3", content: <Step3 /> },
  ];
  
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  


  return (
    <>
      <div className="p-4 max-w-lg mx-auto">
        {/* Stepper */}
        <Stepper activeStep={currentStep}>
          {steps.map((step, index) => (
            <Step key={index} label={step.label} />
          ))}
        </Stepper>

        {/* Step Content */}
        <div className="my-6">
          <div>{steps[currentStep].content}</div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          
          
        </div>
      </div>
    </>
  );
};

// Step 1 Component
const Step1 = ({nextStep}) => {
  const Data = useSelector((state) => state.UserData.Data);
  const dispatch = useDispatch();
  const Phone = useRef();
  const Username = useRef();
  const Passowrd = useRef();
  const ConfirmPassword = useRef();

  const Sentopt = async () => {
    const PhoneNumber = Phone.current.value;
    console.log("number is" + PhoneNumber);
    
    if (Username.current.value && Phone.current.value && Passowrd.current.value) {
      if (Passowrd.current.value == ConfirmPassword.current.value) {
        const Data = { Username: Username.current.value, Phone: Phone.current.value, Password: Passowrd.current.value };
        console.log(Data);
        dispatch(GetOtp({ PhoneNumber }));
        dispatch(updateValue({ Data }));
        nextStep()
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

const Step2 = ({nextStep}) => {
    const Data = useSelector((state) => state.UserData.Data)
    const dispatch = useDispatch()
    const OTP = useRef();

    const VerifyOTP = () => {
        const VerifyOTP = Cookies.get('OTP')
        const CurrentOTP = OTP.current.value;
        if(VerifyOTP == CurrentOTP) 
        {
            dispatch(Setdata({Data}))
            nextStep()
        }
    }
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 2: OTP Verify</h2>
  <p className="text-gray-600 mb-6">Enter the OTP sent to your phone number.</p>
  <form action="" onSubmit={(e) => e.preventDefault()} className="space-y-4">
    <label htmlFor="otp" className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">OTP</span>
      <input
        type="text"
        id="otp"
        ref={OTP}
        placeholder="Enter OTP"
        className="block w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        required
      />
    </label>
    <button
      type="submit"
      className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    onClick={() => VerifyOTP()}
    >
      Submit
    </button>
  </form>
</div>

  );
};

const Step3 = () => {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 p-6">
  <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full text-center">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">🎉 Step 3: Account Created</h2>
    <p className="text-gray-600 mb-6">Your account has been successfully created. You can now log in.</p>
    <Link to={'/login'}>
    <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
      LOGIN
    </button>
    </Link>
  </div>
</div>

  );
};

export default Signup;
