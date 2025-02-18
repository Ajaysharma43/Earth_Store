import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../Features/DashboardSlice/DashboardData";

const TotalProducts = () => {
  const Data = useSelector((state) => state.Dashboardreducer.ProductsLength);
  const dispatch = useDispatch();

  useEffect(() => {
    const GetLength = () => {
      dispatch(GetAllProducts());
    };
    GetLength();
  }, [dispatch]);

  return (
      <>
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg shadow-lg text-white p-8 sm:p-12 max-w-sm text-center">
        <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-4 tracking-wide">
          Total Products
        </h2>
        <p className="text-5xl sm:text-6xl font-extrabold">{Data || 0}</p>
        <p className="text-lg mt-4 opacity-80">Available in inventory</p>
      </div>
      </>
  );
};

export default TotalProducts;
