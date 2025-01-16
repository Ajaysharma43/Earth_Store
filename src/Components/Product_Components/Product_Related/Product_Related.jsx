import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const URL = import.meta.env.VITE_API_URL;

const ProductRelated = () => {
  const [related, setrelated] = useState([]);
  const ID = useSelector((state) => state.ID.ID)
  const cartRefs = useRef([]); 

  useEffect(() => {
    const User = sessionStorage.getItem("data");
    if (User) {
      const ParsedUser = JSON.parse(User);

      const GetData = async () => {
        const id = ParsedUser._id;
        const response = await axios.post(`${URL}/Data/RelatedProduct`, { id });
        setrelated(response.data.result);
      };

      GetData();
    }
  }, [ID]);

  const ShowCart = (index, show) => {
    const currentCart = cartRefs.current[index];
    if (currentCart) {
      if (show) {
        currentCart.classList.remove("opacity-0", "scale-75");
        currentCart.classList.add("opacity-100", "scale-100");
      } else {
        currentCart.classList.remove("opacity-100", "scale-100");
        currentCart.classList.add("opacity-0", "scale-75");
      }
    }
  };

  return (
    <>
      <h1 className="flex justify-center w-1/3 text-[37px] font-semibold">
        Related Products
      </h1>
      <div className="flex flex-wrap justify-center gap-[20px]">
        {related.map((item, index) => (
            <Link to={`/Product/${item._id}`} key={item._id}>
          <div key={item._id}> 
            <section>
              <div
                style={{ backgroundImage: `url(${item.Image})` }}
                className="relative h-[300px] w-[300px] bg-cover bg-no-repeat"
                onMouseEnter={() => ShowCart(index, true)}
                onMouseLeave={() => ShowCart(index, false)}
              >
                <button
                  className="absolute top-4 right-4 bg-white text-[#74a84a] p-1 rounded-full w-[40px] h-[40px] flex items-center justify-center opacity-0 scale-75 transition-all duration-300 ease-in-out"
                  ref={(el) => (cartRefs.current[index] = el)}
                >
                  <FaBagShopping size={20} />
                </button>
              </div>
            </section>

            <section>
              <h1 className="text-gray-400">{item.Type}</h1>
              <h1 className="font-medium">{item.Name}</h1>
              <h1 className="text-gray-700 font-medium">{item.Price}</h1>
            </section>
          </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductRelated;
