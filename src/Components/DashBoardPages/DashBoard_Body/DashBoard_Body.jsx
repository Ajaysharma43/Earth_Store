import TotalProducts from "./Products";
import TotalUsers from "./Users";

const DashBoard_Body = () => {
  return (
    <div className=" flex flex-col justify-center items-center p-4">

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Total Products */}
        <div className="bg-gradient-to-r from-green-400 to-teal-600 text-white rounded-lg p-6 flex flex-col justify-center items-center">
          <TotalProducts />
        </div>

        {/* Total Users */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-700 text-white rounded-lg p-6 flex flex-col justify-center items-center">
          <TotalUsers />
        </div>
      </div>
    </div>
  );
};

export default DashBoard_Body;