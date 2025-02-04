import { useEffect, useRef, useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { Upload_Review } from "../Review_Functions/Review_Functions";
import { Email } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Single_Product } from "../../../Features/DataSlice/SingleProduct";
import { ImCross } from "react-icons/im";
import Cookies from "js-cookie";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FindUserReviews,
  LoadMore,
} from "../../../Features/ProductSlice/Productslice";
import DescriptionContent from "../ReviewComponents/ProductDescription";
import UpdateReview from "./UpdateComponent";
import DeleteReview from "./DeleteReview";
import apiinstance from "../../../../../AxiosInterseptors/RefetchData";
import axios from "axios";
import { Snackbar } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const ReviewsContent = ({ datalimit, setdatalimit }) => {
  const { id } = useParams();
  const UserReviews = useSelector((state) => state.Product.UserReviews);
  const Reviews = useSelector((state) => state.Product.Reviews);
  const Product = useSelector((state) => state.SingleProduct.SingleProduct);
  const limit = useSelector((state) => state.Product.limit);
  const dispatch = useDispatch();
  const [Data, setdata] = useState(Product);
  const [Datalimit, setlimit] = useState(limit);
  const [Displayimit, setDisplayimit] = useState(1);
  const [loading, setLoading] = useState(false);
  const [UpdateLoader, SetUpdateLoader] = useState(false);
  const [DeleteLoader, setDeleteLoader] = useState(false);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [UserData, setuserdata] = useState(UserReviews);
  const [ReviewData, setReviewData] = useState(Reviews);
  const [UpdateDilog, SetUpdateDilog] = useState(false);
  const [Deletedilog, SetDeleteDilog] = useState(false);
  const [UpdateReviews, setudpateReview] = useState({});
  const [DeletedDilog, SetDeletedDilog] = useState({});
  const [Star, SetStar] = useState(<CiStar />);
  const [value, setvalue] = useState(0);

  const Review_Name = useRef();
  const Review_Email = useRef();
  const Review = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Data is updated " + Datalimit);
  }, [datalimit]);

  useEffect(() => {
    console.log("Current limit:", limit); // Debugging limit updates
    dispatch(FindUserReviews(id));
  }, [dispatch, id, limit]);

  useEffect(() => {
    dispatch(FindUserReviews(id));
    console.log(Product + "here is the product reviews");

    const data = sessionStorage.getItem("data");
    console.log(Data._id);
    const parsedData = JSON.parse(data);
    setdata(parsedData);
  }, [dispatch, Product, UpdateDilog, limit, navigate]);

  useEffect(() => {
    if (Product) {
      console.log(UserReviews, "here is the product reviews");
    }
  }, [Product, limit]);

  const Upload = async () => {
    const paramsid = id;
    const AccessToken = sessionStorage.getItem("AccessToken");
    const decoded = jwtDecode(AccessToken);
    const Userid = decoded.ID;

    if (
      Review_Name.current.value &&
      Review_Email.current.value &&
      Review.current.value
    ) {
      const id = Data._id;
      const Reviews = {
        UserName: Review_Name.current.value,
        Email: Review_Email.current.value,
        Review: Review.current.value,
        Rating: value,
        Userid: Userid,
      };

      try {
        // Wrapping Upload_Review in a timeout to delay response
        const Response = await toast.promise(
          new Promise((resolve, reject) => {
            setTimeout(async () => {
              try {
                const result = await Upload_Review({ Reviews, id, Userid });
                resolve(result);
              } catch (error) {
                reject(error);
              }
            }, 5000); // 2-second delay before resolving
          }),
          {
            pending: "Submitting your review...",
            success: "Review submitted successfully! 🎉",
            error: "Failed to submit review. Please try again. ❌",
          }
        );

        if (Response === "Already Reviwed") {
          toast.error("You have already reviewed this product.", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
            transition: Slide,
          });
        } else if (Response === "Reviewd") {
          try {
            const AccessToken = sessionStorage.getItem("AccessToken");
            const decoded = jwtDecode(AccessToken);
            const USERID = decoded.ID;

            // Fetch user review data
            const Reviews = await apiinstance.get(
              `/UserReview?id=${USERID}&productid=${paramsid}`
            );
            console.log("Review Data ID:", Reviews.data.reviews);

            // Fetch updated product reviews
            const response = await apiinstance.post(`/Product`, {
              id: paramsid,
            });
            setReviewData(response.data.Product.Reviews);
            setuserdata(Reviews.data.reviews);
            setdatalimit(response.data.Product.Reviews.length);
            console.log("Data limit is", response.data.Product.Reviews.length);

            // Reset form inputs
            Review_Name.current.value = "";
            Review_Email.current.value = "";
            Review.current.value = "";
            setvalue(0);

            // Dispatch updated reviews
            dispatch(FindUserReviews(id));
          } catch (error) {
            console.error("Error fetching updated reviews:", error);
            toast.error("Error updating reviews. Please refresh the page.", {
              position: "top-right",
              autoClose: 5000,
              theme: "colored",
            });
          }
        }
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    } else {
      console.log("Data is not filled completely");
      toast.error("Please fill in all required fields.", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
        transition: Slide,
      });
    }
  };

  const OpenDilog = (item) => {
    if (UpdateDilog == false) {
      setudpateReview(item);
      SetUpdateDilog(true);
    } else {
      setudpateReview(null);
      SetUpdateDilog(false);
    }
  };

  const DeleteDilog = (item) => {
    if (Deletedilog == false) {
      SetDeletedDilog(item);
      SetDeleteDilog(true);
    } else {
      SetDeletedDilog(null);
      SetDeleteDilog(false);
    }
  };

  const onDelete = (ReviewID) => {
    setDeleteLoader(true);
    setTimeout(() => {
      setuserdata((prevUserData) =>
        prevUserData.filter((item) => item._id !== ReviewID)
      );
      setReviewData((prevReviewData) =>
        prevReviewData.filter((item) => item._id !== ReviewID)
      );
      setdatalimit(datalimit - 1);
      SetDeleteDilog(false);
      setDeleteLoader(false);
    }, 2000);
  };

  const onSave = ({ modifiedReview, userid }) => {
    SetUpdateLoader(true);
    setTimeout(() => {
      setuserdata((prevUserData) =>
        prevUserData.map((review) =>
          review._id === userid ? { ...review, ...modifiedReview } : review
        )
      );

      setReviewData((prevReviewData) =>
        prevReviewData.map((review) =>
          review._id === userid ? { ...review, ...modifiedReview } : review
        )
      );

      SetUpdateLoader(false);
      SetUpdateDilog(false);
    }, 3000);
  };

  const Loadmore = () => {
    if (Displayimit === datalimit) {
      setDisplayimit(datalimit);
    } else {
      setLoading(true); // Set loading to true when more products are being loaded
      setTimeout(() => {
        setDisplayimit(Displayimit + 1);
        setLoading(false); // Set loading to false after data is loaded
      }, 3000); // Simulating an API request delay
    }
  };

  return (
    <>
      <DeleteReview
        open={Deletedilog}
        OpenDilog={DeleteDilog}
        Review={DeletedDilog}
        onDelete={onDelete}
        DeleteLoader={DeleteLoader}
      />
      <UpdateReview
        open={UpdateDilog}
        OpenDilog={OpenDilog}
        Review={UpdateReviews}
        onSave={onSave}
        UpdateLoader={UpdateLoader}
        SetUpdateLoader={SetUpdateLoader}
      />
      <div className="w-full max-w-3xl lg:max-w-screen-lg xl:max-w-screen-xl mx-auto p-6 md:p-8 bg-white rounded-lg text-gray-800 border border-gray-300 mb-6">
        {/* Your Reviews Section */}
        {UserData.length > 0 && (
          <>
            <h1 className="text-xl font-bold mb-4">Your Reviews</h1>
            <div className="space-y-4">
              {UserData.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-300 rounded-md flex items-start justify-between"
                >
                  <div className="flex-1">
                    <h2 className="font-bold text-lg">{item.UserName}</h2>
                    <p className="text-gray-600">{item.Review}</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          <FaStar
                            className={`h-5 w-5 ${
                              i < item.Rating
                                ? "text-[#74a84a]"
                                : "text-gray-300"
                            }`}
                          />
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    className="ml-4 p-2 rounded-full text-[#74a84a] hover:text-white hover:bg-[#74a84a] transition duration-200"
                    title="Remove Review"
                  >
                    <ImCross
                      className="h-5 w-5"
                      onClick={() => DeleteDilog(item)}
                    />
                  </button>
                  <button
                    onClick={() => OpenDilog(item)}
                    className="ml-4 p-2 rounded-full text-[#74a84a] hover:text-white hover:bg-[#74a84a] transition duration-200"
                  >
                    <MdEdit className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-300 my-6"></div>
          </>
        )}

        <h1 className="text-xl font-bold mb-4">All Reviews</h1>
        {ReviewData && ReviewData.length > 0 ? (
          <div className="space-y-4">
            {ReviewData.slice(0, Displayimit).map((item, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-md flex items-start justify-between"
              >
                <div className="flex-1">
                  <h2 className="font-bold text-lg">{item.UserName}</h2>
                  <p className="text-gray-600">{item.Review}</p>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        <FaStar
                          className={`h-5 w-5 ${
                            i < item.Rating ? "text-[#74a84a]" : "text-gray-300"
                          }`}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={Loadmore}
              className="px-4 py-2 bg-[#74a84a] text-white rounded-md hover:bg-[#2c541d] transition duration-300"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-t-4 border-gray-200 border-t-[#74a84a] rounded-full animate-spin"></div>
              ) : (
                "Load More"
              )}
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-600 uppercase mt-4">
            No reviews yet
          </p>
        )}
      </div>

      <div className="w-full max-w-3xl lg:max-w-screen-lg xl:max-w-screen-xl mx-auto p-6 md:p-8 bg-white rounded-lg text-gray-800 border border-gray-300">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            {ReviewData.length == 0 ? (
              <h1 className="text-xl md:text-2xl font-bold mb-4">
                Be the first to review {Data.Name}
              </h1>
            ) : (
              <h1 className="text-xl md:text-2xl font-bold mb-4">
                Share your Review to {Data.Name}
              </h1>
            )}
          </h2>
          <p className="mb-4">
            Your email address will not be published. Required fields are marked
            *
          </p>
          <div className="mb-4">
            <label htmlFor="rating" className="block font-medium mb-2">
              Your rating *
            </label>
            <div>
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setvalue(rating)}
                  className="p-2"
                >
                  <FaStar
                    className={
                      rating <= value ? "text-[#74a84a]" : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="review" className="block font-medium mb-2">
              Your review *
            </label>
            <textarea
              id="review"
              rows="4"
              ref={Review}
              placeholder="Write your review here"
              className="w-full p-3 border rounded-md"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">
              Name *
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              ref={Review_Name}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email *
            </label>
            <input
              id="email"
              type="email"
              ref={Review_Email}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="flex items-center mb-4">
            <input type="checkbox" id="save-info" className="mr-2" />
            <label htmlFor="save-info">
              Save my name, email, and website in this browser for the next time
              I comment.
            </label>
          </div>
          <button
            className="w-32 py-3 mt-4 bg-[#74a84a] text-white rounded-md hover:bg-[#2c541d] transition duration-300"
            onClick={() => Upload()}
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </>
  );
};

export default ReviewsContent;
