import { useNavigate } from "react-router-dom"
import Cart_Body from "../../Components/Cart_Componnets/Cart_Body/Cart_Body"
import Cookies from "js-cookie"
import api from "../../../AxiosInterseptors/TokenVerify"
import { useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import Checkout_Payment from "../../Components/Checkout_Component/Checkout_Payment"
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar"
import Footer from "../../Components/Homepage_Components/Footer/Footer"

const Cart = () => {
    const Navigate = useNavigate();

    useEffect(() => {
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