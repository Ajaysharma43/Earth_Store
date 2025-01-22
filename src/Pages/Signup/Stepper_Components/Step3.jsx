import { Link } from "react-router-dom";

const Step3 = () => {
    return (
      <div className="flex flex-col items-center justify-center  bg-gray-100 p-6">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🎉 Step 3: Account Created
          </h2>
          <p className="text-gray-600 mb-6">
            Your account has been successfully created. You can now log in.
          </p>
          <Link to={"/login"}>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
              LOGIN
            </button>
          </Link>
        </div>
      </div>
    );
  };

  export default Step3;