import { useEffect, useRef, useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { Upload_Review } from "./Review_Functions/Review_Functions";
import { Email } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Single_Product } from "../../Features/DataSlice/SingleProduct";
import { ImCross } from "react-icons/im";
import Cookies from "js-cookie";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FindUserReviews, LoadMore } from "../../Features/ProductSlice/Productslice";
import DescriptionContent from "./ReviewComponents/ProductDescription";
import ReviewsContent from "./ReviewComponents/AddReview";

const Product_Reviews = () => {
  const { id } = useParams();
  const [activeContent, setActiveContent] = useState("description");
  const Product = useSelector((state) => state.SingleProduct.SingleProduct);
  const Reviews = useSelector((state) => state.Product.Reviews);
  const limit = useSelector((state) => state.Product.limit);
  const dispatch = useDispatch();
  const description = useRef();
  const reviews = useRef();

  const renderContent = () => {
    if (activeContent === "description") {
      return <DescriptionContent />;
    } else if (activeContent === "reviews") {
      return <ReviewsContent />;
    }
  };

  useEffect(() => {
    dispatch(LoadMore())
    setActiveContent("description");
  }, [id]);

  useEffect(() => {
    const Change = () => {
      dispatch(FindUserReviews(id));
      dispatch(LoadMore())
      if (activeContent === "description") {
        description.current.style.borderTop = "2px solid #74a84a";
        reviews.current.style.borderTop = "none";
      } else if (activeContent === "reviews") {
        reviews.current.style.borderTop = "2px solid #74a84a";
        description.current.style.borderTop = "none";
      }
    };
    Change();
  }, [activeContent,Product,limit]);

  return (
    <div className="pb-6 mt-10 border-t border-t-gray-300 px-4 lg:px-10">
      <div className="flex justify-start gap-6 mb-4 ml-[70px]">
        <button
          onClick={() => setActiveContent("description")}
          className="text-sm md:text-lg font-semibold text-gray-600 hover:text-[#74a84a]"
          ref={description}
        >
          Description
        </button>
        <button
          onClick={() => setActiveContent("reviews")}
          className="text-sm md:text-lg font-semibold text-gray-600 hover:text-[#74a84a]"
          ref={reviews}
        >
          Reviews({Reviews.length})
        </button>
      </div>
      <div className="flex flex-wrap gap-4 items-start">
        <section className="flex-grow">{renderContent()}</section>
      </div>
    </div>
  );
};

export default Product_Reviews;
