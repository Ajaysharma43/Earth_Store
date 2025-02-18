import Footer from "../../Components/Homepage_Components/Footer/Footer"
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar"
import Order_History_Status_Body from "../../Components/Order_History_Component/Order_History_Status";

const Order_History_Status = () => {
    return(
        <>
        <header>
            <Navbar/>
        </header>

        <article>
            <Order_History_Status_Body/>
        </article>

        <footer>
            <Footer/>
        </footer>
        </>
    )
}

export default Order_History_Status;