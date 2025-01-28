import axios from "axios";

const URL = import.meta.env.VITE_API_URL;


export const Upload_Review = async(Reviews , id , Userid) => {
    const Upload = await axios.post(`${URL}/Data/Review` , {Reviews , id , Userid})
    return Upload.data.Message;
}

export const Delete_Review = async() => {
    const DeleteReview = await axios.post(`${URL}/Data/DeleteReview` , {Reviews , id})
}