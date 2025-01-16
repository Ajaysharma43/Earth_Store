import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBagShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

const URL = import.meta.env.VITE_API_URL

const Product = () => {
  const [products, setProducts] = useState([]);
  const cartRefs = useRef([]);
  const AddProduct = useRef([]);

  useEffect(() => {
    const GetProducts = async () => {
      try {
        const response = await axios.get(`${URL}/Data/data?limit=3`);
        console.log(response.data.Data)
        setProducts(response.data.Data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    GetProducts();
  }, []);

  const RevealCart = (index) => {
    const currentCart = cartRefs.current[index];
    if (currentCart) {
      currentCart.style.display = "flex"; 
    }
  };

  const HideCart = (index) => {
    const currentCart = cartRefs.current[index];
    if (currentCart) {
      currentCart.style.display = "none"; 
    }
  };

  const RevealAddProduct = (index) => {
    const Product = AddProduct.current[index];
    if (Product) {
      Product.style.display = "inline-block"; 
    }
  };

  const HideAddProduct = (index) => {
    const Product = AddProduct.current[index];
    if (Product) {
      Product.style.display = "none"; 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, 
    visible: { opacity: 1, y: 0 }, 
  };

  return (
    <>
      <div className="p-8 flex flex-wrap justify-center mt-[6%] mb-[6%] w-full gap-6">
        {products.map((item, index) => (
          <motion.div
            className="w-[300px] flex flex-col gap-4 group"  // Added `group` class for hover interaction
            key={index}
            onMouseOver={() => RevealCart(index)} 
            onMouseLeave={() => HideCart(index)}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2, 
            }}
          >
            <Link to={`/Product/${item._id}`}>
              <section className="relative">
                <div 
                  style={{ backgroundImage: `url(${item.Image})` }}
                  className="bg-cover bg-center rounded-lg shadow-md overflow-hidden transition-transform duration-300 h-[300px]"
                >
                  <button
                    className="absolute top-4 right-4 bg-white text-[#74a84a] p-2 rounded-full w-10 h-10 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out shadow-md"
                  >
                    <FaBagShopping size={20} />
                  </button>
                </div>
              </section>
            </Link>
            <section>
              <h3 className="text-gray-500">{item.Type}</h3>
              <h1 className="font-semibold text-lg">{item.Name}</h1>
              <h3 className="text-[#74a84a] font-bold">{item.Price}</h3>
            </section>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Product;
