import LoadingBar from "react-top-loading-bar"
import Footer from "../../Components/Homepage_Components/Footer/Footer"
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar"
import Order from "../../Components/Order_Page_components/Order_body"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from "../../../AxiosInterseptors/TokenVerify"
import { useEffect, useState } from "react"

const ORDERS = () => {
    const Navigate = useNavigate()
    const [progress , setprogress] = useState(0)

    useEffect(() => {
        setprogress(30)
        
        window.scrollTo({ top: 0 });;
          setprogress(100)
      },[])
    return(
        <>
        <LoadingBar
    progress={progress}
    onLoaderFinished={() => setprogress(0)}
    color="#74a84a"/>
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