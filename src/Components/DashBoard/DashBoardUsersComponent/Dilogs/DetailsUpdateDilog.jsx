import { Dialog, DialogContent } from "@mui/material"

const DetailsUpdateDilog = ({ open, HandleClose, User , Operation}) => {
    return(
        <>
        <Dialog open={open}>
            <DialogContent>
                <h1>this is the details update dilog</h1>
                <button onClick={HandleClose}>close</button>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default DetailsUpdateDilog;