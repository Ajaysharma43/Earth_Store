import { useDispatch, useSelector } from "react-redux";
import { VerifyUser } from "../../Components/Features/AuthSlice/Login";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import LoginBG from "../../assets/Login_Images/1292333.jpg";

const Login = () => {
  const { isAuthenticated, isError, errorMessage } = useSelector(
    (state) => state.Login
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const [loading, setloading] = useState(false);

  const Username = useRef();
  const Password = useRef();
  const PhoneNumber = useRef();

  const validateInputs = () => {
    const username = Username.current.value.trim();
    const password = Password.current.value.trim();
    const phoneNumber = PhoneNumber.current.value.trim();

    if (!username || !password || !phoneNumber) {
      alert("Please fill in all fields.");
      return false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneNumber)) {
      phoneNumber.current.value = "enter a valid number";
      return false;
    }

    return true;
  };

  const handleLogin = () => {
    if (!validateInputs()) {
      return;
    }

    const Data = {
      UserName: Username.current.value,
      Password: Password.current.value,
      PhoneNumber: PhoneNumber.current.value,
    };

    const Loading = setloading(true);
    dispatch(VerifyUser({ Data }));
  };

  useEffect(() => {
    setProgress(30);
    if (isAuthenticated) {
      setTimeout(() => {
        setloading(false);
        navigate("/");
      }, 3000);
    }
    setProgress(100);
  }, [isAuthenticated]);

  const handleSignupNavigation = () => {
    navigate("/signup");
  };

  return (
    <>
      <LoadingBar
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        color="#74a84a"
      />

      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${LoginBG})` }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative w-full max-w-lg bg-[#ffffff69] bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6 m-[21px] text-black"
        >
          <h2 className="text-2xl font-bold text-center text-black">Log In</h2>
          <p className="text-center text-black text-sm">
            Please fill in the details to continue
          </p>
          {isError && (
            <div className="text-red-500 text-sm text-center mt-2">
              {errorMessage}
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-black"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              ref={Username}
              className="mt-2 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              ref={Password}
              className="mt-2 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-black"
            >
              Phone Number
            </label>
            <input
              type="number"
              id="phone"
              ref={PhoneNumber}
              className="mt-2 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
              placeholder="Enter your phone number"
            />
          </div>

          {loading == true ? (
            <button
              className="w-full flex justify-center py-3 px-6 text-white uppercase font-medium bg-[#3d5826] hover:bg-[#1b3412] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c541d]"
            >
              Logging in...
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleLogin}
              className="w-full flex justify-center py-3 px-6 text-white uppercase font-medium bg-[#74a84a] hover:bg-[#2c541d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c541d]"
            >
              Submit
            </button>
          )}

          <button
            type="button"
            onClick={handleSignupNavigation}
            className="w-full flex justify-center py-3 px-6 text-white uppercase font-medium bg-[#4a90e2] hover:bg-[#357ab8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#357ab8] mt-4"
          >
            Don't have an account? Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
