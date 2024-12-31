import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import data from "/DataAPI/Porducts.json?url";
import "./Product.css";
import { FaBagShopping } from "react-icons/fa6";

const Product = () => {
  const [products, setProducts] = useState([]);
  const cartRefs = useRef([]);
  const AddProduct = useRef([]);

  useEffect(() => {
    const GetProducts = async () => {
      try {
        const response = await axios.get(data);
        setProducts(response.data.slice(0, 3));
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
      <div id="Products">
        {products.map((item, index) => (
          <motion.div
            id="Product_card"
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
            <div id="Product_Image_Section">
              <img src={item.image} alt="" id="Product_Image" />
              <div id="Content_Overlay">
                <div
                  style={{
                    width: "100%",
                    textAlign: "right",
                    transition: "1s",
                  }}
                >
                  <span
                    id="Add_Product_Text"
                    ref={(el) => (AddProduct.current[index] = el)}
                    style={{ display: "none" }} 
                  >
                    <h1>Add to cart</h1>
                  </span>
                </div>

                <div
                  ref={(el) => (cartRefs.current[index] = el)}
                  style={{ display: "none" }} 
                  onMouseOver={() => RevealAddProduct(index)} 
                  onMouseOut={() => HideAddProduct(index)} 
                >
                  <span id="Icon_Overlay">
                    <span id="Icon_Overlay_1">
                      <FaBagShopping size={25} id="Icon_Cart" />
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <h3 id="Product_Type">{item.type}</h3>
            <h1 id="Product_Name">{item.name}</h1>
            <h3 id="Product_Price">{item.price}</h3>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Product;
