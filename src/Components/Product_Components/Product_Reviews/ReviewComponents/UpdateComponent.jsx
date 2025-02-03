import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { UpdateUserReveiws } from "../../../Features/ProductSlice/Productslice";
import Loader from "../../../Loaders/Loader";

const UpdateReview = ({
  open,
  OpenDilog,
  Review,
  onSave,
  UpdateLoader,
  SetUpdateLoader,
}) => {
  const [updatedReview, setUpdatedReview] = useState(Review?.Review || "");
  const [updatedRating, setUpdatedRating] = useState(Review?.Rating || 0);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (Review) {
      setUpdatedReview(Review.Review || "");
      setUpdatedRating(Review.Rating || 0);
    }
  }, [Review]);

  const handleSave = () => {
    if (Review) {
      const modifiedReview = {
        ...Review,
        Review: updatedReview,
        Rating: updatedRating,
      };
      dispatch(
        UpdateUserReveiws({
          ProductID: id,
          ID: Review._id,
          Review: modifiedReview,
        })
      );
      const userid = Review._id;
      onSave({ modifiedReview, userid });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={OpenDilog}>
        <DialogContent>
          {Review ? (
            UpdateLoader ? (
              /* From Uiverse.io by Javierrocadev */
              <Loader/>
            ) : (
              <div className="space-y-4">
                {/* Editable Input Field */}
                <input
                  type="text"
                  value={updatedReview}
                  onChange={(e) => setUpdatedReview(e.target.value)}
                  className="border p-2 w-full"
                  placeholder="Update your review"
                />

                {/* Star Rating */}
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setUpdatedRating(rating)}
                      className="p-2"
                    >
                      <FaStar
                        className={
                          rating <= updatedRating
                            ? "text-[#74a84a]"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className="bg-[#74a84a] text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            )
          ) : (
            <div>No data is available for update</div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateReview;
