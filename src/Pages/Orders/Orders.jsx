import Footer from "../../Components/Homepage_Components/Footer/Footer"
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar"
import Order from "../../Components/Order_Page_components/Order_body"

const ORDERS = () => {
    return(
        <>
        <header>
            <Navbar/>
        </header>
        <article>
            <Order/>
        </article>
        <footer>
            <Footer/>
        </footer>
        </>
    )
}
export default ORDERS