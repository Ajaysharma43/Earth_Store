import { Dialog, DialogContent } from "@mui/material"

const DeleteReview = ({ open, OpenDilog, Review, onDelete }) => {
    return(
        <>
        <Dialog>
            <DialogContent>
                <div>
                    <h1>ARE YOU SURE? YOUR WANT TO DELETE YOUR REVIEW</h1>
                </div>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default DeleteReview;