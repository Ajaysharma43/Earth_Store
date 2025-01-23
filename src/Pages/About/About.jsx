import Mission from "../../Components/About_Page_components/About_Page_Mission_Page/Mission_Page";
import Front_Page from "../../Components/About_Page_components/Front_page/Front_Page";
import Footer from "../../Components/Homepage_Components/Footer/Footer";
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar";
import Postcard from "../../Components/Homepage_Components/Postcard/Postcard";
import image from "../../assets/Homapage_Images/a9588ac4be92480bbf420071afe1043d.png"
import Cookie from "js-cookie"
import "../About/About.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const About = () => {

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
        <header className="
        xl:h-full xl:w-full bg-cover bg-no-repeat
        lg:w-full lg:h-[571px]
        " style={{backgroundImage:`url(${image})`}}>
            <Navbar/>
            <Front_Page/>
        </header>
        <article>
            <Mission/>
        </article>

        <article className="h-full w-full bg-cover bg-no-repeat pb-20" style={{backgroundImage:`url(${image})`}}>
            <Postcard/>
        </article>

        <footer>
            <Footer/>
        </footer>
        </>

    )
}

export default About;