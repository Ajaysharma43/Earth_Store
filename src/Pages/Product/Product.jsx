import { useState, useEffect } from "react";
import Footer from "../../Components/Homepage_Components/Footer/Footer";
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar";
import Product_Info from "../../Components/Product_Components/Product_Info/Product_Info";
import ProductRelated from "../../Components/Product_Components/Product_Related/Product_Related";
import Product_Reviews from "../../Components/Product_Components/Product_Reviews/Product_Reviews";
import ProductNav from "../../Components/Product_Components/ProductNav/ProductNav";
import "../Product/Product.css";
import { Link } from "react-router-dom";

const Product = () => {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight; // Total page height
      const scrollPosition = window.scrollY + window.innerHeight; // Current scroll position + viewport height
      const halfwayPoint = scrollHeight / 1.5;

      setShowNav(scrollPosition >= halfwayPoint);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
        <Navbar />
        <Link
            to="/home"
            className="text-black hover:bg-gray-700 px-3 py-2 rounded-md text-lg"
          >
            Home
          </Link>
      <article className="w-full border-t border-t-gray-600">
        <Product_Info />
      </article>

      <article
        className={`fixed top-0 w-full z-50 transition duration-500 ease-in-out ${
          showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <ProductNav />
      </article>

      <article>
        <Product_Reviews />
      </article>

      <article>
        <ProductRelated />
      </article>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Product;
