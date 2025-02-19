import { useEffect } from "react";
import DashboardNavbar from "../../DashBoard/DashBoardHomepage/Navbar/Navbar";
import { JWTTOken } from "../../JWTDecode/JWTdecode";
import VerifyRole from "../../../../AxiosInterseptors/RoleVerify";
import { useNavigate } from "react-router-dom";
import DashBoard_Body from "../DashBoard_Body/DashBoard_Body";

const DashboardHomepage = () => {
    
    return(
        <>
        <header>
            <DashboardNavbar/>
        </header>

        <article>
            <DashBoard_Body/>
        </article>
        </>
    )
}

export default DashboardHomepage;