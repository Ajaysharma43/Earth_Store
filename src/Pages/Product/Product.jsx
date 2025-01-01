import Navbar from "../../Components/Homepage_Components/Navbar/Navbar";
import Product_Info from "../../Components/Product_Components/Product_Info/Product_Info";
import "../Product/Product.css"

const Product = () => {
    return(
        <>
        <header>
            <Navbar/>
        </header>

        <article>
            <Product_Info/>
        </article>
        </>
    )
}

export default Product;