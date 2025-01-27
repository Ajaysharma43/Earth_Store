import axios from "axios";

const URL = import.meta.env.VITE_API_URL;


export const Upload_Review = async(Reviews) => {
    const Upload = await axios.post(`${URL}/Data/Review` , {Reviews})
}