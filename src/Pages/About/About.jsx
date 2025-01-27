import Mission from "../../Components/About_Page_components/About_Page_Mission_Page/Mission_Page";
import Front_Page from "../../Components/About_Page_components/Front_page/Front_Page";
import Footer from "../../Components/Homepage_Components/Footer/Footer";
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar";
import Postcard from "../../Components/Homepage_Components/Postcard/Postcard";
import image from "../../assets/Homapage_Images/a9588ac4be92480bbf420071afe1043d.png"
import Cookies from "js-cookie"
import api from "../../../AxiosInterseptors/TokenVerify";
import "../About/About.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const About = () => {

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
    }, []);

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