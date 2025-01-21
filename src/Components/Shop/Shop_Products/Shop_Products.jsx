import { useEffect, useRef } from "react";
import { useSelector , useDispatch } from "react-redux";
import { GetData } from "../../Features/DataSlice/DataSlice";
import { FaBagShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Shop_Products = () => {

    const dispatch = useDispatch();
    const Data = useSelector((state) => state.Data.data)
     const cartRefs = useRef([]);
    

    useEffect(() => {
        dispatch(GetData())
        console.log(Data);
    },[])

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
    return(
        <>
        <div>
            {
                Data.map((item , index) => (
                    <>
                    <Link to={`/Product/${item._id}`} key={item._id}>
            <div className="w-[300px] flex flex-col gap-4">
              <section className="relative">
                <div
                  style={{ backgroundImage: `url(${item.Image})` }}
                  className="relative h-[300px] w-full bg-cover bg-center rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                  onMouseEnter={() => ShowCart(index, true)}
                  onMouseLeave={() => ShowCart(index, false)}
                >
                  <button
                    className="absolute top-4 right-4 bg-white text-[#74a84a] p-2 rounded-full w-10 h-10 flex items-center justify-center opacity-0 scale-75 transition-all duration-300 ease-in-out shadow-md"
                    ref={(el) => (cartRefs.current[index] = el)}
                    onClick={(e) => {
                      e.preventDefault(); // Prevents navigation when clicking inside the button
                      HandleCart(item);
                    }}
                  >
                    <FaBagShopping size={20} />
                  </button>
                </div>
              </section>

              <section className="text-center">
                <h1 className="text-sm text-gray-500">{item.Type}</h1>
                <h1 className="text-lg font-semibold text-gray-800">
                  {item.Name}
                </h1>
                <h1 className="text-base text-[#74a84a] font-medium">
                  {item.Price}
                </h1>
              </section>
            </div>
          </Link>
                    </>
                ))
            }
        </div>
        </>
    )
}

export default Shop_Products;