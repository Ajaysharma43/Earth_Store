import { useEffect, useState } from "react";
import Footer from "../../Components/Homepage_Components/Footer/Footer";
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar";
import Payment_Status_Body from "../../Components/Payment_Status_Component/Payment_Status_body";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const Payment_Status = () => {

    const Navigate = useNavigate()
    const [progress , setprogress] = useState(0)

    useEffect(() => {
        setprogress(30)
        
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
        <article>
            <Payment_Status_Body/>
        </article>
        <footer>
            <Footer/>
        </footer>
        </>
    )
}

export default Payment_Status;