import { Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../../../Loaders/Loader";

const URL = import.meta.env.VITE_API_URL;

const DeleteReview = ({ open, OpenDilog, Review, onDelete, DeleteLoader }) => {
  const { id } = useParams();

  const DeleteSelectedReview = async () => {
    console.log(Review._id, id);
    const ReviewID = Review._id;
    const userid = Review.Userid;
    const Response = await axios.delete(
      `${URL}/Data/DeleteReview?ReviewID=${ReviewID}&id=${id}&Userid=${userid}`
    );
    console.log(Response.data);
    if (Response.data.message == "Review deleted successfully") {
      onDelete(ReviewID);
    }
  };
  return (
    <>
      <Dialog open={open} onClose={OpenDilog}>
        <DialogContent>
          {Review ? (
            DeleteLoader ? (
              <Loader/>
            ) : (
              <div className="bg-white p-6 rounded-lg max-w-md mx-auto text-center">
                <h1 className="text-xl font-bold mb-4 text-gray-800">
                  ARE YOU SURE? YOU WANT TO DELETE YOUR REVIEW
                </h1>
                <div className="flex justify-center space-x-4 gap-2">
                  <button
                    onClick={() => DeleteSelectedReview()}
                    className="px-6 py-2 bg-[#74a84a] text-white font-semibold rounded-lg shadow-md hover:bg-[#2c541d] focus:outline-none transition duration-200"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => OpenDilog()}
                    className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none transition duration-200"
                  >
                    No
                  </button>
                </div>
              </div>
            )
          ) : (
            <>
              <h1>no data available</h1>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteReview;
