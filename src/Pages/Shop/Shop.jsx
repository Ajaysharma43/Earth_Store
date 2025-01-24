import { useNavigate } from "react-router-dom"
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar"
import Shop_Products from "../../Components/Shop/Shop_Products/Shop_Products"
import { useEffect } from "react"
import Cookie from 'js-cookie'

const Shop = () => {

    const Navigate = useNavigate()
    return(
        <>
        <header>
            <Navbar/>
        </header>

        <article className="mt-[90px] mb-[90px]">
            <Shop_Products/>
        </article>
        </>
    )
}

export default Shop;