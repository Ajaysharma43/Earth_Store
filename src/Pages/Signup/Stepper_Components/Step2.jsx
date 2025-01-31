import { useDispatch, useSelector } from "react-redux";
import { GetOtp, Setdata } from "../../../Components/Features/AuthSlice/Signup";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { Block } from "@mui/icons-material";

const Step2 = ({ nextStep }) => {
  const Data = useSelector((state) => state.UserData.Data);
  const PhoneNumber = useSelector((state) => state.UserData.Data.PhoneNumber);
  const [Timer, settimer] = useState(60);
  const dispatch = useDispatch();
  const OTP = useRef();
  const Resend = useRef();
  const Timeref = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (Timer == 0) {
        settimer(0);
        Resend.current.style.display = "block";
        Timeref.current.style.display = "none";
      } else {
        settimer(Timer - 1);
      }
    }, 1000);
  }, [Timer]);

  const VerifyOTP = () => {
    const VerifyOTP = Cookies.get("OTP");
    const CurrentOTP = OTP.current.value;
    if (VerifyOTP == CurrentOTP) {
      dispatch(Setdata({ Data }));
      nextStep();
    }
  };

  const ReSendOPT = () => {
    dispatch(GetOtp({ PhoneNumber }));
    Resend.current.style.display = "none";
    Timeref.current.style.display = "block";
    settimer(60);
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Step 2: OTP Verify
      </h2>
      <p className="text-gray-600 mb-6">
        Enter the OTP sent to your phone number.
      </p>
      <form
  action=""
  onSubmit={(e) => e.preventDefault()}
  className="space-y-6"
>
  {/* OTP Input Section */}
  <label htmlFor="otp" className="block">
    <span className="block text-sm font-medium text-gray-700 mb-2">
      OTP
    </span>
    <input
      type="text"
      id="otp"
      ref={OTP}
      placeholder="Enter OTP"
      className="block w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
    />
  </label>

  {/* Timer Section */}
  <div className="text-center text-sm text-gray-600">
    <h1 ref={Timeref}>
      Resend in <span className="font-semibold text-blue-600">{Timer}</span>
    </h1>
  </div>

  {/* Resend OTP Section */}
  <div className="flex justify-center mt-2">
    <h1
      onClick={() => ReSendOPT()}
      ref={Resend}
      className=" hidden cursor-pointer text-[#74a84a] hover:text-[#2c541d] focus:outline-none transition duration-200"
    >
      ReSend OTP
    </h1>
  </div>

  {/* Submit Button Section */}
  <button
    type="submit"
    className="w-full flex justify-center py-3 px-6 text-white font-medium bg-[#74a84a] hover:bg-[#2c541d]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c541d]"
    onClick={() => VerifyOTP()}
  >
    Submit
  </button>
</form>

    </div>
  );
};

export default Step2;
