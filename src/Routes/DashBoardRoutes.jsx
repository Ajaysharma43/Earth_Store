import { useRoutes } from "react-router-dom";
import DashboardHomepage from "../Components/DashBoardPages/HomePage/HomePage";
import UploadPage from "../Components/DashBoardPages/UploadPage/Upload";

const DashBoardRoutes = () => {
    const routes = useRoutes([
        {element:<DashboardHomepage/>,path:"/dashboard"},
        {element:<UploadPage/>,path:"/dashboard/upload"}
    ])

    return routes;
}

export default DashBoardRoutes;
