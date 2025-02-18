import { useEffect } from "react";
import DashboardNavbar from "../../DashBoard/DashBoardHomepage/Navbar/Navbar";
import { JWTTOken } from "../../JWTDecode/JWTdecode";
import VerifyRole from "../../../../AxiosInterseptors/RoleVerify";
import { useNavigate } from "react-router-dom";

const DashboardHomepage = () => {
    const Navigate = useNavigate();
    useEffect(() => {
        const VerifyUserrole = async() => {
            const decoded = JWTTOken()
            console.log(decoded.Role); 
            const response = await VerifyRole.post('/Verify')
            if(response.data.Success == false)
            {
                Navigate('*')
            }
        }
        VerifyUserrole()
    },[])
    return(
        <>
        <header>
            <DashboardNavbar/>
        </header>
        </>
    )
}

export default DashboardHomepage;