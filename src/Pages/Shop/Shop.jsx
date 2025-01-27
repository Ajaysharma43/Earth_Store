import { useNavigate } from "react-router-dom"
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar"
import Shop_Products from "../../Components/Shop/Shop_Products/Shop_Products"
import { useEffect } from "react"
import api from "../../../AxiosInterseptors/TokenVerify"
import Cookies from 'js-cookie'

const Shop = () => {

    const Navigate = useNavigate()

    useEffect(() => {
        const AccessToken = sessionStorage.getItem("AccessToken");
        const RefreshToken = Cookies.get("RefreshToken");
        if(AccessToken)
        {
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
        }
        else
        {
          if(RefreshToken)
          {
            const getaccesstoken = async() => {
              const response = await api.post("/RefreshToken", { RefreshToken });
              console.log(response.data);
              sessionStorage.setItem("AccessToken", response.data.AccessToken);
            }
            getaccesstoken()
          }
          else{
            Navigate('/login')
          }
        }
    },[])

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