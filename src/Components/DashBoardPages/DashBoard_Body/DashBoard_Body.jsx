import { useSelector , useDispatch } from "react-redux";
import TotalProducts from "./Products";
import { useEffect } from "react";
import TotalUsers from "./Users";

const DashBoard_Body = () => {
    
    return(
        <>
        <div>
            <TotalProducts/>
            <TotalUsers/>
        </div>
        </>
    )
}

export default DashBoard_Body;