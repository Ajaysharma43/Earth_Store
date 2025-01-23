import { useNavigate } from "react-router-dom"
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar"
import Shop_Products from "../../Components/Shop/Shop_Products/Shop_Products"
import { useEffect } from "react"
import Cookie from 'js-cookie'

const Shop = () => {

    const Navigate = useNavigate()

    useEffect(() => {
      const Token = Cookie.get('Token')
      const Authorize = async() => {
        if(Token)
        { 
          console.log("called");
        const Response = await axios.post(`${URL}/Autheorize/VerifyRoute`,{},{headers:{'Authorization': `Bearer ${Token}`}})
        console.log(Response.data);
        
        if(Response.data.message == "expired")
        {
          console.log("expired");
          Navigate('/login')
        }
        else
        {
          console.log("valid");
        }
      }
      else
      {
        console.log("token not existed");
        Navigate('/login')
      }
      }
      Authorize()
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