import { useNavigate } from "react-router-dom"
import Cart_Body from "../../Components/Cart_Componnets/Cart_Body/Cart_Body"
import Cookie from "js-cookie"
import { useEffect } from "react"

const Cart = () => {
    return(
        <>
        <article>
            <Cart_Body/>
        </article>
        </>
    )
}

export default Cart;