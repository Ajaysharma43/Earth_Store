import { useNavigate } from "react-router-dom"
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar"
import Shop_Products from "../../Components/Shop/Shop_Products/Shop_Products"
import { useEffect, useState } from "react"
import api from "../../../AxiosInterseptors/TokenVerify"
import Cookies from 'js-cookie'
import LoadingBar from "react-top-loading-bar"
import Footer from "../../Components/Homepage_Components/Footer/Footer"
import { jwtDecode } from "jwt-decode"

const Shop = () => {

    const Navigate = useNavigate()
    const [progress , setprogress] = useState(0)

    useEffect(() => {
      setprogress(30)
      const AccessToken = sessionStorage.getItem("AccessToken");
      const RefreshToken = Cookies.get("RefreshToken");
      if(AccessToken)
      { 
        if (RefreshToken) {
          const req = async () => {
            const response = await api.post("/VerifyRoute");
            if (response.data.message == "expired") {
              const Decoded = jwtDecode(RefreshToken)
              const response = await api.post("/RefreshToken", { RefreshToken , Userid : Decoded.ID });
              console.log(response.data);
              if (response.data.message == "NotExisted") {
                Navigate("/login");
              } else if (response.data.message == "expired") {
                Navigate("/login");
              }
              sessionStorage.setItem("AccessToken", response.data.AccessToken);
            }
          };
          req();
        } else {
          Navigate("/login");
        }
      }
      else
      {
        if(RefreshToken)
        {
          const getaccesstoken = async() => {
            const Decoded = jwtDecode(RefreshToken)
            const response = await api.post("/RefreshToken", { RefreshToken , Userid : Decoded.ID });
            console.log(response.data);
            sessionStorage.setItem("AccessToken", response.data.AccessToken);
          }
          getaccesstoken()
        }
        else{
          Navigate('/login')
        }
      }
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