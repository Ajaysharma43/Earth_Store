import Checkout_Address from "../../Components/Checkout_Component/Checkout_Address"
import Checkout_Payment from "../../Components/Checkout_Component/Checkout_Payment"
import Footer from "../../Components/Homepage_Components/Footer/Footer"
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar"

const Checkout = () => {
    return(
        <>
        <nav>
            <Navbar/>
        </nav>

        <article className="flex flex-wrap justify-center gap-[10%] w-full">
            <section className="w-1/2">
                <Checkout_Address/>
            </section>
            <section>
                <Checkout_Payment/>
            </section>
        </article>

        <footer>
            <Footer/>
        </footer>
        </>
    )
}
export default Checkout