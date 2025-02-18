import { useEffect } from "react";
import Products from "../../DashBoard/DashBoardProductsComponents/Products";
import { JWTTOken } from "../../JWTDecode/JWTdecode";
import VerifyRole from "../../../../AxiosInterseptors/RoleVerify";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../../DashBoard/DashBoardHomepage/Navbar/Navbar";

const DashBoardProducts = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    const VerifyUserrole = async () => {
      const decoded = JWTTOken();
      console.log(decoded.Role);
      const response = await VerifyRole.post("/Verify");
      if (response.data.Success == false) {
        Navigate("*");
      }
    };
    VerifyUserrole();
  }, []);

  return (
    <>
      <header>
        <DashboardNavbar />
      </header>

      <article>
        <Products />
      </article>
    </>
  );
};

export default DashBoardProducts;
