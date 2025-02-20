import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../Features/DashboardSlice/DashboardData";

const Products = () => {
  const Data = useSelector((state) => state.Dashboardreducer.AllProducts);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(GetAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredData(
        Data.filter(
          (item) =>
            item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.Type.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredData(Data);
    }
  }, [searchTerm, Data]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredData.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300"
          >
            {/* Product Image */}
            <div className="h-40 w-full bg-gray-100 flex items-center justify-center">
              <img
                src={item.Image || "https://via.placeholder.com/150"}
                alt={item.Name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">{item.Name}</h2>
              <p className="text-sm text-gray-600">{item.Type}</p>
              <p className="text-xl text-green-600 font-semibold mt-2">
                ${item.Price.toFixed(2)}
              </p>
            </div>

            {/* Actions */}
            <div className="px-4 py-2 bg-gray-50 border-t flex justify-between items-center">
              <button className="text-sm text-indigo-600 font-medium hover:underline">
                Edit
              </button>
              <button className="text-sm text-red-600 font-medium hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Products Found */}
      {filteredData.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-600">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
