import Footer from "../../Components/Homepage_Components/Footer/Footer";
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar";
import Payment_Status_Body from "../../Components/Payment_Status_Component/Payment_Status_body";

const Payment_Status = () => {
    return(
        <>
        <header>
            <Navbar/>
        </header>
        <article>
            <Payment_Status_Body/>
        </article>
        <footer>
            <Footer/>
        </footer>
        </>
    )
}

export default Payment_Status;