import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetCart } from "../../Features/CartSlice/CartSlice";

const URL = import.meta.env.VITE_API_URL;

const Product = () => {
  const [products, setProducts] = useState([]);
  const Product = useSelector((state) => state.Cart.Cart);
  const dispatch = useDispatch();
  const cartRefs = useRef([]);
  const AddProduct = useRef([]);
  
  useEffect(() => {
    const GetProducts = async () => {
      try {
        const response = await axios.get(`${URL}/Data/data?limit=3`);
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, 
    visible: { opacity: 1, y: 0 }, 
  };

  const HandleCart = (e, Product) => {
    e.stopPropagation(); // Prevents event from triggering parent Link navigation

    // Check if the product is already in the cart
    const existingProduct = Product.find((item) => item.ProductId === Product._id);

    if (existingProduct) {
      // If the product is already in the cart, increment the quantity
      const updatedCart = Product.map((item) => 
        item.ProductId === Product._id ? { ...item, ProductQuantity: item.ProductQuantity + 1 } : item
      );
      dispatch(SetCart(updatedCart));
    } else {
      // If the product is not in the cart, add it
      const Cart = {
        ProductId: Product._id,
        ProductName: Product.Name,
        ProductType: Product.Type,
        ProductImage: Product.Image,
        ProductPrice: Product.Price,
        ProductQuantity: 1, // Set initial quantity to 1
      };
      dispatch(SetCart([...Product, Cart]));
    }
  };

  return (
    <div className="p-8 flex flex-wrap justify-center mt-[6%] mb-[6%] w-full gap-6">
      {products.map((item, index) => (
        <motion.div
          className="w-[300px] flex flex-col gap-4 group"
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
                 // Call HandleCart on clicking the div
              >
                
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
  );
};

export default Product;
