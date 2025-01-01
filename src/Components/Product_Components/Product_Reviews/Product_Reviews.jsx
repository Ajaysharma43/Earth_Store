import { useState } from "react";

export const DescriptionContent = () => {
  return (
    <div>
      <h1>Hello</h1>
      <p>This is the description content for the product.</p>
    </div>
  );
};

export const ReviewsContent = () => {
    return (
        <>
        <h1>this is reviews part</h1>
        </>
    )
}

const Product_Reviews = () => {
  const [activeContent, setActiveContent] = useState("description");

  const renderContent = () => {
    if (activeContent === "description") {
      return <DescriptionContent />;
    } else if (activeContent === "reviews") {
      return <ReviewsContent/>;
    }
  };

  return (
    <>
      <div className="flex justify-center gap-[20px] mr-[30%]">
        <button onClick={() => setActiveContent("description")}>
          <h1>Description</h1>
        </button>
        <button onClick={() => setActiveContent("reviews")}>
          <h1>Reviews</h1>
        </button>
      </div>
      <div className="grid justify-center mr-[50%]">{renderContent()}</div>
    </>
  );
};

export default Product_Reviews;
