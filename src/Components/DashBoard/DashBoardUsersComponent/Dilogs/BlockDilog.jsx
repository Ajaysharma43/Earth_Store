import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BlockUser } from "../../../Features/DashboardSlice/DashboardData";

const BlockDilogs = ({ open, HandleClose, User , Operation}) => {
    const dispatch = useDispatch()
    const [Loading , setLoading]  = useState(false)

    const Block = () => {
        setLoading(true)
        setTimeout(() => {
            dispatch(BlockUser({UserID : User}))
            HandleClose();
            setLoading(false)
        }, 2000);
        
    }

    return (
        <>
            <Dialog open={open}
            sx={{
                bgcolor: "rgba(255, 255, 255, 0.01)",
                backdropFilter: "blur(3px)",
                borderRadius: "8px",
                padding: "16px",
              }}>
                <DialogContent>
                    <div className="flex flex-col items-center justify-center p-6 text-center space-y-6">
                        <h1 className="text-2xl font-semibold text-gray-700">
                            Are you sure you want to {Operation== true ? "UnBlock" : "Block"} this user?
                        </h1>
                        <p className="text-gray-500 text-sm">
                        {Operation == true ? "Unblocking this user will let him access to your platform." : "Blocking this user will restrict their access to your platform."}
                        </p>
                        <div className="flex space-x-4">
                            <button className="px-6 py-2 bg-gradient-to-r from-green-400 via-green-600 to-green-800 text-white font-medium uppercase rounded-md shadow-md hover:shadow-lg hover:opacity-90 transition"
                            onClick={Block}>
                                {Loading == true ? `${Operation == true ? "UnBlocking..." : "Blocking..."}` : "Confirm"}
                            </button>
                            <button
                                onClick={HandleClose}
                                className="px-6 py-2 bg-gradient-to-r from-orange-400 via-orange-600 to-orange-800 text-white font-medium uppercase rounded-md shadow-md hover:shadow-lg hover:opacity-90 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BlockDilogs;
