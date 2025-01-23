import { useNavigate } from "react-router-dom"
import Cart_Body from "../../Components/Cart_Componnets/Cart_Body/Cart_Body"
import Cookie from "js-cookie"
import { useEffect } from "react"

const Cart = () => {

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
        <article>
            <Cart_Body/>
        </article>
        </>
    )
}

export default Cart;