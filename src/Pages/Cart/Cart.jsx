import Cart_Body from "../../Components/Cart_Componnets/Cart_Body/Cart_Body"
import { useEffect } from "react"
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar"
import Footer from "../../Components/Homepage_Components/Footer/Footer"

const Cart = () => {

    useEffect(() => {
      
      window.scrollTo({ top: 0 });
    },[])
    return(
        <>
        <header>
          <Navbar/>
        </header>
        <article>
            <Cart_Body/>
        </article>
        <footer>
          <Footer/>
        </footer>
        </>
    )
}

export default Cart;