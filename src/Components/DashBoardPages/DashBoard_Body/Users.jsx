import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "../../Features/DashboardSlice/DashboardData";

const TotalUsers = () => {
  const Data = useSelector((state) => state.Dashboardreducer.UsersLength);
  const dispatch = useDispatch();

  useEffect(() => {
    const GetUserLength = () => {
      dispatch(GetAllUsers());
    };
    GetUserLength();
  }, [dispatch]);

  return (
    <>
      {/* Total Users Card */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-700 rounded-xl p-8 sm:p-10 max-w-sm text-black text-center">
        <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-4 tracking-wide">
          Total Users
        </h2>
        <p className="text-5xl sm:text-6xl font-extrabold">{Data || 0}</p>
        <p className="text-lg mt-4 opacity-90">Registered on the platform</p>
      </div>
    </>
  );
};

export default TotalUsers;
