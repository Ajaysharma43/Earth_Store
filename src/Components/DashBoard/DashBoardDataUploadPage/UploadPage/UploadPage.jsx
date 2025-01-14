import React, { useReducer } from "react";
import {Upload , UploadReducer} from "../../DashBoardReducer/Upload_Reducer/Upload_Reducer"

const SimpleForm = () => {
    
    const [State , Reducer] = useReducer(UploadReducer,Upload)


  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Upload</h2>
      <form>
        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
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
            type="email"
            id="email"
            name="email"
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
            type="tel"
            id="phone"
            name="phone"
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
            id="address"
            name="address"
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
            id="message"
            name="message"
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
