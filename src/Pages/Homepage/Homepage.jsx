import { useEffect } from "react";
import Footer from "../../Components/Homepage_Components/Footer/Footer";
import Front_Page from "../../Components/Homepage_Components/Front_Page/Front_Page";
import Homepage_Ending from "../../Components/Homepage_Components/Homepage_Ending/Homepage_Ending";
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar";
import Postcard from "../../Components/Homepage_Components/Postcard/Postcard";
import Product from "../../Components/Homepage_Components/Product/Product";
import Reviews from "../../Components/Homepage_Components/Reviews/Reviews";
import Cookie from "js-cookie"
import "../Homepage/Homepage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const URL = import.meta.env.VITE_API_URL;

const Homepage = () => { 

  const Navigate = useNavigate()

  useEffect(() => {
    const AccessToken = sessionStorage.getItem('AccessToken')
    const RefreshToken = Cookie.get('RefreshToken')
    const Authorize = async() => {
      if(AccessToken)
      { 
        console.log("called");
      const Response = await axios.post(`${URL}/Autheorize/VerifyRoute`,{},{headers:{'Authorization': `Bearer ${AccessToken}`}})
      console.log(Response.data);
      
      if(Response.data.message == "expired")
      {
        const Response = await axios.post(`${URL}/Autheorize/RefreshToken`,{RefreshToken})
        console.log(Response.data.message);
        if(Response.data.message == 'verified')
        {
          console.log("regenerated");
          const AccessToken = Response.data.AccessToken;
          sessionStorage.setItem('AccessToken' , AccessToken)
        }
        else if(Response.data.message == 'expired')
        {
          Navigate('/login')
        }
        else if(Response.data.message == 'NotExisted')
        {
          Navigate('/login')
        }
        
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



  return (
    <>
      <header id="Homepage_Header">
        <Navbar />

        <Front_Page />
      </header>

      <article>
        <article>
          <Product />
        </article>

        <div id="Empty_Line"></div>

        <article id="Reviews_Article">
          <Reviews />
        </article>

        <article id="Postcard_Article">
            <Postcard/>
        </article>

        <article id="Homepage_Ending_Article">
          <Homepage_Ending/>
        </article>

        <div id="Empty_Line"></div>

        <article id="Homepage_Footer">
          <Footer/>
        </article>
      </article>
    </>
  );
};

export default Homepage;
