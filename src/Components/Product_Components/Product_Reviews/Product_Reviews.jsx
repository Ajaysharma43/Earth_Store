import { useEffect, useRef, useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Upload_Review } from "./Review_Functions/Review_Functions";
import { Email } from "@mui/icons-material";

export const DescriptionContent = () => {
  return (
    <div className="w-full max-w-3xl lg:max-w-screen-lg xl:max-w-screen-xl mx-auto p-6 md:p-8 bg-white rounded-lg text-gray-800 border border-gray-300">
      <h1 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
        Framed Without Borders:
      </h1>
      <ul className="list-disc pl-6 mb-6 space-y-3">
        <li className="text-sm md:text-base">Printed on High-Quality vinyl.</li>
        <li className="text-sm md:text-base">
          1-inch thick wooden back frame.
        </li>
        <li className="text-sm md:text-base">
          No additional hanging hardware is required.
        </li>
        <li className="text-sm md:text-base">Care: Dust with a soft, dry cloth.</li>
      </ul>
      <h1 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
        Framed With Borders & Acrylic Glass:
      </h1>
      <ul className="list-disc pl-6 space-y-3">
        <li className="text-sm md:text-base">
          Printed on High-Quality matte photo paper.
        </li>
        <li className="text-sm md:text-base">Acrylic borders are used.</li>
        <li className="text-sm md:text-base">
          Highly durable acrylic glass is used on the top to protect it from
          damage.
        </li>
        <li className="text-sm md:text-base">
          Hooks are attached to the back of each frame for hanging.
        </li>
      </ul>
      <p className="italic text-xs md:text-sm text-gray-600 mt-6">
        Note: There may be a slight difference in actual color, due to the
        colors of the display.
      </p>
    </div>
  );
};

export const ReviewsContent = () => {
  const { id } = useParams();
  const [Data, setdata] = useState({});

  const Review_Name = useRef();
  const Review_Email = useRef();
  const Review = useRef();
  const Review_Rating = useRef();

  useEffect(() => {
    const data = sessionStorage.getItem("data");
    const parsedData = JSON.parse(data);
    setdata(parsedData);
  }, []);

  const Upload = () => {
    const Reviews = {Name : Review_Name.current.value , Email : Review_Email.current.value , Review : Review.current.value , Rating : Review_Rating.current.value}
    Upload_Review(Reviews)
  }

  return (
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
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button key={rating} className="p-2 border rounded-full" ref={Review_Rating}>
              <CiStar />
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
      <button className="w-32 py-3 mt-4 bg-[#74a84a] text-white rounded-md hover:bg-[#2c541d] transition duration-300"
      onClick={() => Upload()}>
        Submit
      </button>
    </div>
  );
};

const Product_Reviews = () => {
  const [activeContent, setActiveContent] = useState("description");
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
    const Change = () => {
      if (activeContent === "description") {
        description.current.style.borderTop = "2px solid #74a84a";
        reviews.current.style.borderTop = "none";
      } else if (activeContent === "reviews") {
        reviews.current.style.borderTop = "2px solid #74a84a";
        description.current.style.borderTop = "none";
      }
    };
    Change();
  }, [activeContent]);

  return (
    <div className="pb-6 mt-10 border-t border-t-gray-300 px-4 lg:px-10">
      <div className="flex justify-start gap-6 mb-4">
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
          Reviews
        </button>
      </div>
      <div className="flex flex-wrap gap-4 items-start">
        <section className="flex-grow">{renderContent()}</section>
      </div>
    </div>
  );
};

export default Product_Reviews;
