import { useNavigate } from "react-router-dom"
import Cart_Body from "../../Components/Cart_Componnets/Cart_Body/Cart_Body"
import Cookies from "js-cookie"
import api from "../../../AxiosInterseptors/TokenVerify"
import { useEffect } from "react"

const Cart = () => {
    const Navigate = useNavigate();

    useEffect(() => {
        const AccessToken = sessionStorage.getItem("AccessToken");
        const RefreshToken = Cookies.get("RefreshToken");
        if (RefreshToken) {
          const req = async () => {
            const response = await api.post("/VerifyRoute");
            if (response.data.message == "expired") {
              const response = await api.post("/RefreshToken", { RefreshToken });
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
    },[])
    return(
        <>
        <article>
            <Cart_Body/>
        </article>
        </>
    )
}

export default Cart;