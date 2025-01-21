import Navbar from "../../Components/Homepage_Components/Navbar/Navbar"
import Shop_Products from "../../Components/Shop/Shop_Products/Shop_Products"

const Shop = () => {
    return(
        <>
        <header>
            <Navbar/>
        </header>

        <article>
            <Shop_Products/>
        </article>
        </>
    )
}

export default Shop;