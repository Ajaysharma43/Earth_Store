import DashboardNavbar from "../../DashBoard/DashBoardHomepage/Navbar/Navbar";
import DashBoardUsersComponent from "../../DashBoard/DashBoardUsersComponent/DashBoardUsersComponent"
import Navbar from "../../Homepage_Components/Navbar/Navbar"

const DashboardUsersPage = () => {
    return(
        <>
        <header>
            <DashboardNavbar/>
        </header>

        <article>
            <DashBoardUsersComponent/>
        </article>
        </>
    )
}

export default DashboardUsersPage;