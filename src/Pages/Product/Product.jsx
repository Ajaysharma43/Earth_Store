import { useState, useEffect } from "react";
import Footer from "../../Components/Homepage_Components/Footer/Footer";
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar";
import Product_Info from "../../Components/Product_Components/Product_Info/Product_Info";
import ProductRelated from "../../Components/Product_Components/Product_Related/Product_Related";
import Product_Reviews from "../../Components/Product_Components/Product_Reviews/Product_Reviews";
import ProductNav from "../../Components/Product_Components/ProductNav/ProductNav";
import "../Product/Product.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Product = () => {
  const [showNav, setShowNav] = useState(false);
  const ID = useSelector((state) => state.ID.ID)
  const Navigate = useNavigate()

  useEffect(() => {

      window.scrollTo({ top: 0 });

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

  useEffect(()=>{
    console.log(ID);
  },[ID])

  return (
    <>
    <Navbar/>
      <article className="w-full border-t border-t-gray-600 ">
        <Product_Info />
      </article>

      <article
  className={`fixed top-0 w-full z-50 transition-transform  duration-500 ease-in-out ${
    showNav ? "opacity-100 translate-y-0 block" : "opacity-0 -translate-y-full hidden"
  }`}
>
  <ProductNav />
</article>

      <article className="w-full">
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
