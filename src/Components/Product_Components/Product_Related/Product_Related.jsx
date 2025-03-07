import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Cart, SetCart } from "../../Features/CartSlice/CartSlice";
import { Related } from "../../Features/DataSlice/RelatedProducts";
import AddToCartLoader from "../../Loaders/CartLoader/CartLoader2";
import AddToCartLoader2 from "../../Loaders/CartLoader/CartLoader3";

const URL = import.meta.env.VITE_API_URL;

const ProductRelated = () => {
  const [related, setRelated] = useState([]);
  const Product = useSelector((state) => state.product.Product);
  const Quantity = useSelector((state) => state.Qunatity.Quantity);
  const [CartItems, setCartItems] = useState(Quantity);
  const ID = useSelector((state) => state.ID.ID);
  const { data } = useSelector((state) => state.related);
  const [Addcart, setaddcart] = useState(false);
  const dispatch = useDispatch();
  const cartRefs = useRef([]);

  useEffect(() => {
    const User = sessionStorage.getItem("data");
    if (User) {
      const ParsedUser = JSON.parse(User);
      const GetData = async () => {
        try {
          console.log(ParsedUser.Type);
          const test = ParsedUser.Type;
          const id = ParsedUser._id;
          console.log(test, "Type");
          dispatch(Related({ id, test }));
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
      GetData();
      window.scrollTo({ top: 0 });
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

  const HandleCart = (Product) => {
    const CartData = {
      ProductID: Product._id,
      Name: Product.Name,
      Type: Product.Type,
      Price: Product.Price,
      Image: Product.Image,
      Description: Product.Description,
      Quantity: Quantity,
    };
    setaddcart(true)
    setTimeout(() => {
      dispatch(Cart({ CartData }));
      setaddcart(false)
    }, 3000);
    
  };

  return (
    <div className="p-8">
      <h1 className="text-center text-3xl font-semibold text-gray-800 mb-8">
        Related Products
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {data.map((item, index) => (
          <Link to={`/Product/${item._id}`} key={item._id}>
            <div className="w-[300px] flex flex-col gap-4">
              <section className="relative">
                <div
                  style={{ backgroundImage: `url(${item.Image})` }}
                  className="relative h-[200px] w-full bg-cover bg-center rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
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
                    {Addcart ? (
                      <AddToCartLoader2 />
                    ) : (
                      <FaBagShopping size={20} />
                    )}
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
        ))}
      </div>
    </div>
  );
};

export default ProductRelated;
