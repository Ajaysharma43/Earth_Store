import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { custom, decreament, GetData, increament } from "../../Features/DataSlice/DataSlice";
import { FaBagShopping, FaUsersBetweenLines } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import { SetCart } from "../../Features/CartSlice/CartSlice";

const Shop_Products = () => {
  const dispatch = useDispatch();
  const Data = useSelector((state) => state.Data.data);
  const Totalpages = useSelector((state) => state.Data.totalpages)
  const currentPage = useSelector((state) => state.Data.initialpage)
  const Quantity = useSelector((state) => state.Qunatity.Quantity);
  const [Limit , setlimit] = useState(4)
  const cartRefs = useRef([]);

  useEffect(() => {
    console.log(currentPage);
    
    dispatch(GetData({Limit , currentPage}));
    console.log(Data);
  }, [currentPage]);

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

  const Nextpage = () => {
    if(currentPage == Totalpages)
    {
        dispatch(increament())
    }
    else
    {
        dispatch(increament())
    }
  }

  const PrevPage = () => {
    if(currentPage == 1)
    {
        dispatch(decreament())
    }
    else{
        dispatch(decreament())
    }
  }

  const Targetpage = (event, page) => {
    dispatch(custom(page))
  }

  const HandleCart = (Product) => {
      const Cart = {
        ProductId: Product._id,
        ProductName: Product.Name,
        ProductType: Product.Type,
        ProductImage: Product.Image,
        ProductPrice: Product.Price,
        ProductQuantity: Quantity,
      };
      dispatch(SetCart(Cart));
    };
  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 ">
        {Data.map((item, index) => (
          <>
            <Link to={`/Product/${item._id}`} key={item._id}>
              <div className="w-[300px] flex flex-col gap-4">
                <section className="relative">
                  <div
                    style={{ backgroundImage: `url(${item.Image})` }}
                    className="relative h-[250px] w-[90%] bg-cover bg-center rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
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
                    ${item.Price}
                  </h1>
                </section>
              </div>
            </Link>
          </>
        ))}
        
      </div>
      <div className="flex justify-center ">
        <button onClick={PrevPage} className=" rounded-md h-[40px] w-[90px] uppercase text-white bg-gradient-to-r from-emerald-400 to bg-emerald-500 focus:ring focus:ring-offset-1 focus:ring-emerald-700">prev</button>
      <Pagination page={currentPage} count={Totalpages} hidePrevButton hideNextButton onChange={Targetpage} className="flex justify-center"/>
      <button onClick={Nextpage} className="border-n rounded-md h-[40px] w-[90px] uppercase text-white bg-gradient-to-r from-orange-400 to bg-orange-500 focus:ring focus:ring-offset-1 focus:ring-orange-700">next</button>
      </div>
    </>
  );
};

export default Shop_Products;
