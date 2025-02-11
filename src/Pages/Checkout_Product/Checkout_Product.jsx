import Checkout_Product from "../../Components/CheckoutProduct/CheckoutProduct";
import Footer from "../../Components/Homepage_Components/Footer/Footer";
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar";

const Checkout_Product_Page = () => {
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <article>
        <Checkout_Product/>
      </article>
      <footer>
        <Footer/>
      </footer>
    </>
  );
};

export default Checkout_Product_Page