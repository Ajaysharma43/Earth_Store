import { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useParams } from "react-router-dom";

export const DescriptionContent = () => {
  return (
    <div className="w-full max-w-3xl ml-4 p-6 bg-white rounded-lg text-gray-800 break-words whitespace-pre-wrap">
      <h1 className="text-xl font-semibold text-[#2b2b2b] mb-6">Framed Without Borders:</h1>

      <ul className="list-disc pl-6 mb-6 space-y-3">
        <li className="text-lg">Printed on High-Quality vinyl.</li>
        <li className="text-lg">1-inch thick wooden back frame.</li>
        <li className="text-lg">No additional hanging hardware is required.</li>
        <li className="text-lg">Care: Dust with a soft, dry cloth.</li>
      </ul>

      <h1 className="text-xl font-semibold text-[#2b2b2b] mb-6">Framed With Borders & Acrylic Glass:</h1>

      <ul className="list-disc pl-6 space-y-3">
        <li className="text-lg">Printed on High-Quality matte photo paper.</li>
        <li className="text-lg">Acrylic borders are used.</li>
        <li className="text-lg">Highly durable acrylic glass is used on the top to protect it from damage.</li>
        <li className="text-lg">Hooks are attached to the back of each frame for hanging.</li>
      </ul>

      <p className="italic text-sm text-gray-600 mt-6">
        Note: There may be a slight difference in actual color, due to the colors of the display.
      </p>
    </div>
  );
};

export const ReviewsContent = () => {
  const { id } = useParams();
  const [Data, setdata] = useState({});

  useEffect(() => {
    const data = sessionStorage.getItem('data');
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    setdata(parsedData);
  }, []);

  return (
    <div className="w-full max-w-3xl ml-4 p-6 bg-white rounded-lg text-gray-800">
      <h2 className="text-2xl font-bold mb-4">Be the first to review {Data.Name}</h2>
      <p className="mb-4">Your email address will not be published. Required fields are marked *</p>

      <div className="mb-4">
        <label htmlFor="rating" className="block font-medium mb-2">Your rating *</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button key={rating} className="p-2 border rounded-full"><StarBorderIcon /></button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="review" className="block font-medium mb-2">Your review *</label>
        <textarea
          id="review"
          rows="4"
          placeholder="Write your review here"
          className="w-full p-3 border rounded-md"
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block font-medium mb-2">Name *</label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          className="w-full p-3 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block font-medium mb-2">Email *</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border rounded-md"
        />
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="save-info"
          className="mr-2"
        />
        <label htmlFor="save-info">Save my name, email, and website in this browser for the next time I comment.</label>
      </div>
      
      <button className="w-[124px] py-3 mt-4 bg-[#74a84a] text-white  hover:bg-[#2c541d] transition duration-300">
        Submit
      </button>
    </div>
  );
};

const Product_Reviews = () => {
  const [activeContent, setActiveContent] = useState("description");

  const renderContent = () => {
    if (activeContent === "description") {
      return <DescriptionContent />;
    } else if (activeContent === "reviews") {
      return <ReviewsContent />;
    }
  };

  return (
    <div className="py-6">
      <div className="flex justify-start gap-6 mb-6 ">
        <button
          onClick={() => setActiveContent("description")}
          className="text-xl font-semibold text-gray-600 hover:text-blue-600"
        >
          Description
        </button>
        <button
          onClick={() => setActiveContent("reviews")}
          className="text-xl font-semibold text-gray-600 hover:text-blue-600"
        >
          Reviews
        </button>
      </div>
      <div className="w-full max-w-3xl lg:ml-4 md:ml-0 sm:ml-0">{renderContent()}</div>
    </div>
  );
};

export default Product_Reviews;
