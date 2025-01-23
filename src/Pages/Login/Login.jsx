import { useDispatch, useSelector } from "react-redux";
import { VerifyUser } from "../../Components/Features/AuthSlice/Login";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@fluentui/react-components";
import Loader from "../../Components/Loaders/Loader";
import Cookies from 'js-cookie'

const Login = () => {
    const state = useSelector((state) => state.Login)
    const navigate = useNavigate()
  const dispatch = useDispatch();
  const Username = useRef();
  const Password = useRef();
  const PhoneNumber = useRef();

  useEffect(()=>{
    Cookies.remove('Token')
  },[])

  const Verify = () => {
    
    if (
      Username.current.value &&
      Password.current.value &&
      PhoneNumber.current.value
    ) {
      const Data = {
        UserName: Username.current.value,
        Password: Password.current.value,
        PhoneNumber: PhoneNumber.current.value,
      };
      dispatch(VerifyUser({Data}));
      setTimeout(() => {
        if(state.isLoading == false)
            {
              navigate('/')
            }
      }, 5000);
      
    console.log(state);
    } else {
      console.log("values is missing");
    }
  };

  if(state.isLoading)
  {
    return(
        <>
        <Loader/>
        </>
    )
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
  <form
    action=""
    onSubmit={(e) => e.preventDefault()}
    className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-6"
  >
    <h2 className="text-2xl font-bold text-center text-gray-800">Log In</h2>
    <p className="text-center text-gray-500 text-sm">
      Please fill in the details to continue
    </p>

    <div>
      <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
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
      <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
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
      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
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

    <button
      type="submit"
      onClick={() => Verify()}
      className="w-full flex justify-center py-3 px-6 text-white font-medium bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Submit
    </button>
  </form>
</div>

    </>
  );
};

export default Login;
