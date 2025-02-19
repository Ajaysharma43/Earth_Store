import { useNavigate } from "react-router-dom"
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar"
import Shop_Products from "../../Components/Shop/Shop_Products/Shop_Products"
import { useEffect, useState } from "react"
import LoadingBar from "react-top-loading-bar"
import Footer from "../../Components/Homepage_Components/Footer/Footer"

const Shop = () => {

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

        <article className="mt-[90px] mb-[90px]">
            <Shop_Products/>
        </article>

        <footer>
          <Footer/>
        </footer>
        </>
    )
}

export default Shop;