import Navbar from "../../Components/Homepage_Components/Navbar/Navbar";
import Product_Info from "../../Components/Product_Components/Product_Info/Product_Info";
import ProductRelated from "../../Components/Product_Components/Product_Related/Product_Related";
import Product_Reviews from "../../Components/Product_Components/Product_Reviews/Product_Reviews";
import "../Product/Product.css"

const Product = () => {
    return(
        <>
        <header>
            <Navbar/>
        </header>


        <article className="w-full border-t border-t-gray-600">
            <Product_Info/>
        </article>

        <article>
            <Product_Reviews/>
        </article>

        <article>
            <ProductRelated/>
        </article>
        </>
    )
}

export default Product;