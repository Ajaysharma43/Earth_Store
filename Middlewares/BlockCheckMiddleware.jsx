import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'

const BlockCheckMiddleware = ({ children }) => {
    const Navigate = useNavigate();
    const [Verifed , setVerified] = useState(null)

    useEffect(() => {
        const AccessToken = sessionStorage.getItem('AccessToken')
        const decode = jwtDecode(AccessToken);
        if(decode.Block == true)
        {
            setVerified(false)
        }
    },[])

    if(Verifed == false)
    {
        Navigate('/BlockedUserpage')
    }
    return children;
}

export default BlockCheckMiddleware;