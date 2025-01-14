import SimpleForm from "../../DashBoard/DashBoardDataUploadPage/UploadPage/UploadPage"
import DashboardNavbar from "../../DashBoard/DashBoardHomepage/Navbar/Navbar"

const UploadPage = () => {
    return(
        <>
        <header>
            <DashboardNavbar/>
        </header>

        <article>
            <SimpleForm/>
        </article>
        </>
    )
}

export default UploadPage;