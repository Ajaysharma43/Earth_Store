import { useEffect, useRef, useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { Upload_Review } from "../Review_Functions/Review_Functions";
import { Email } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Single_Product } from "../../../Features/DataSlice/SingleProduct";
import { ImCross } from "react-icons/im";
import Cookies from "js-cookie";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FindUserReviews } from "../../../Features/ProductSlice/Productslice";
import DescriptionContent from "../ReviewComponents/ProductDescription";
import UpdateReview from "./UpdateComponent";
import DeleteReview from "./DeleteReview";

const ReviewsContent = () => {
  const { id } = useParams();
  const UserReviews = useSelector((state) => state.Product.UserReviews);
  const Reviews = useSelector((state) => state.Product.Reviews);
  const Product = useSelector((state) => state.SingleProduct.SingleProduct);
  const dispatch = useDispatch();
  const [Data, setdata] = useState(Product);
  const [UserData, setuserdata] = useState(UserReviews);
  const [ReviewData, setReviewData] = useState(Reviews);
  const [UpdateDilog , SetUpdateDilog] = useState(false)
  const [UpdateReviews , setudpateReview] = useState({})
  const [Star, SetStar] = useState(<CiStar />);
  const [value, setvalue] = useState(0);

  const Review_Name = useRef();
  const Review_Email = useRef();
  const Review = useRef();

  useEffect(() => {
    dispatch(FindUserReviews(id));
    console.log(Product + "here is the product reviews");

    const data = sessionStorage.getItem("data");
    console.log(Data._id);
    const parsedData = JSON.parse(data);
    setdata(parsedData);
  }, [dispatch, Product , UpdateDilog]);

  useEffect(() => {
    if (Product) {
      console.log(UserReviews, "here is the product reviews");
    }
  }, [Product]);

  const Upload = async () => {
    const Userid = Cookies.get("ID");
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
      const Response = await Upload_Review({ Reviews, id, Userid });
      if (Response == "Already Reviwed") {
        toast.error("Already Review", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        console.log(Response, Product.SingleProduct);
        if (Response == "Reviewd") {
          dispatch(Single_Product(id));
          setReviewData((prevData) => [...prevData, Reviews]);
          Review_Name.current.value = "";
          Review_Email.current.value = "";
          Review.current.value = "";
          setvalue(0);
          toast.success("Review Added", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      }
    } else {
      console.log("data is not fill completely");
      toast.error("data is not fill completely", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const OpenDilog = (item) => {
    if(UpdateDilog == false)
    {
        setudpateReview(item)
        SetUpdateDilog(true)
    }
    else
    {
        setudpateReview(null)
        SetUpdateDilog(false)
    }
  }

  const onSave = ({data , id}) => {
    const review = UserData.find((item) => item._id === id)
    console.log(review);
  }

  return (
    <>
    <DeleteReview/>
    <UpdateReview open={UpdateDilog} OpenDilog={OpenDilog} Review={UpdateReviews} onSave={onSave}/>
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
                    <ImCross className="h-5 w-5" />
                  </button>
                  <button onClick={()=>OpenDilog(item)} className="ml-4 p-2 rounded-full text-[#74a84a] hover:text-white hover:bg-[#74a84a] transition duration-200">
                    <MdEdit className="h-5 w-5"/>
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-300 my-6"></div>
          </>
        )}

        {/* All Reviews Section */}
        <h1 className="text-xl font-bold mb-4">All Reviews</h1>
        {ReviewData && ReviewData.length > 0 ? (
          <div className="space-y-4">
            {ReviewData.map((item, index) => (
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
          </div>
        ) : (
          <p className="text-center text-gray-600 uppercase mt-4">
            No reviews yet
          </p>
        )}
      </div>

      <div className="w-full max-w-3xl lg:max-w-screen-lg xl:max-w-screen-xl mx-auto p-6 md:p-8 bg-white rounded-lg text-gray-800 border border-gray-300">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Be the first to review {Data.Name}
        </h2>
        <p className="mb-4">
          Your email address will not be published. Required fields are marked *
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
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </div>
        <button
          className="w-32 py-3 mt-4 bg-[#74a84a] text-white rounded-md hover:bg-[#2c541d] transition duration-300"
          onClick={() => Upload()}
        >
          Submit
        </button>
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
          transition={Bounce}
        />
      </div>
    </>
  );
};

export default ReviewsContent;
