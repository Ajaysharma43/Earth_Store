import axios from "axios";

const URL = import.meta.env.VITE_API_URL;


export const Upload_Review = async(Reviews , id) => {
    const Upload = await axios.post(`${URL}/Data/Review` , {Reviews , id})
    return Upload.data.Message;
}