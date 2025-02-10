import Footer from "../../Components/Homepage_Components/Footer/Footer"
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar"
import User_Profile_Sidebar from "../../Components/UserProfileComponents/UserProfileSidebar";

const User_Profile = () => {
    return(
        <>
        <header>
            <Navbar/>
        </header>
        <article>
            <article>
                <User_Profile_Sidebar/>
            </article>
        </article>
        <footer>
            <Footer/>
        </footer>
        </>
    )
}

export default User_Profile;