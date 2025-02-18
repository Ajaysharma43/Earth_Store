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
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { jwtDecode } from "jwt-decode";

const About = () => {

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
            const response = await api.post("/RefreshToken", { RefreshToken , Userid : Decoded.ID , Role: Decoded.Role, });
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
          const response = await api.post("/RefreshToken", { RefreshToken , Userid : Decoded.ID , Role: Decoded.Role, });
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
      setprogress(100)
    }, []);

    return(
        <>
        <LoadingBar
    progress={progress}
    onLoaderFinished={() => setprogress(0)}
    color="#74a84a"/>
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