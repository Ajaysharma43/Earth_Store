import { useEffect, useState } from "react";
import Footer from "../../Components/Homepage_Components/Footer/Footer";
import Front_Page from "../../Components/Homepage_Components/Front_Page/Front_Page";
import Homepage_Ending from "../../Components/Homepage_Components/Homepage_Ending/Homepage_Ending";
import Navbar from "../../Components/Homepage_Components/Navbar/Navbar";
import Postcard from "../../Components/Homepage_Components/Postcard/Postcard";
import Product from "../../Components/Homepage_Components/Product/Product";
import Reviews from "../../Components/Homepage_Components/Reviews/Reviews";
import Cookie from "js-cookie";
import "../Homepage/Homepage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../../AxiosInterseptors/TokenVerify";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
const URL = import.meta.env.VITE_API_URL;

const Homepage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <header id="Homepage_Header">
        <Navbar />

        <Front_Page />
      </header>

      <article>
        <article>
          <Product />
        </article>

        <div id="Empty_Line"></div>

        <article id="Reviews_Article">
          <Reviews />
        </article>

        <article id="Postcard_Article">
          <Postcard />
        </article>

        <article id="Homepage_Ending_Article">
          <Homepage_Ending />
        </article>

        <div id="Empty_Line"></div>

        <article id="Homepage_Footer">
          <Footer />
        </article>
      </article>
    </>
  );
};

export default Homepage;
