import { Link } from "react-router-dom";
import "./Front_Page.css"

const Front_Page = () => {
    return(
        <>
        <center>
        <div style={{height: "578px",marginTop: "0%"}} id="Front_Page">
            <h1 id="Front_Page_Title">EARTH</h1>
            <h1 id="Front_Page_Paragraph">MULTIPURPOSE STORE</h1>
            <Link to={'/shop'}>
            <button id="Front_Page_Button">SHOP NOW</button>
            </Link>
        </div>
        </center>
        </>
    )
}

export default Front_Page;