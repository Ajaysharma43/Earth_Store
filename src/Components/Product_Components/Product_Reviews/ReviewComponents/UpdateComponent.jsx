import { Dialog, DialogContent } from "@mui/material";
import { useEffect } from "react";

const UpdateReview = ({ open, OpenDilog, Review }) => {
  return (
    <>
      <Dialog open={open} onClose={OpenDilog}>
        <DialogContent>
          {Review ? (
            <div>
              <input type="text" value={Review.Review} onChange={(e) => e.target.value()}/>
            </div>
          ) : (
            <div>no data is avaliable</div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateReview;
