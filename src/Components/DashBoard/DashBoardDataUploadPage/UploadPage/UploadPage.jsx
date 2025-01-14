import axios from "axios";
import React, { useReducer, useRef } from "react";

const SimpleForm = () => {

  const Product = useRef();
  const ProductType = useRef();
  const ProductPrice = useRef();
  const ProductImage = useRef();
  const ProductDescritption = useRef();


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const name = Product.current.value;
    const type = ProductType.current.value;
    const price = ProductPrice.current.value;
    const image = ProductImage.current.value;
    const description = ProductDescritption.current.value;

    const response = await axios.post(`http://localhost:3000/Upload/Data`,{name,type,price,image,description})
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Upload</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            ref={Product}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">
            Type
          </label>
          <input
            type="text"
            ref={ProductType}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Phone Input */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="phone">
            Price
          </label>
          <input
            type="text"
            ref={ProductPrice}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Address Input */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="address">
            Image URL
          </label>
          <input
            type="text"
            ref={ProductImage}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Message Textarea */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="message">
            Description
          </label>
          <textarea
          ref={ProductDescritption}
            rows="4"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimpleForm;
