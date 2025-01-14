import axios from "axios"
import { useEffect } from "react"

const URL = import.meta.env.VITE_API_URL;

const ProductRelated = () => {
    useEffect(()=>{
        const User = sessionStorage.getItem('data')
        const ParsedUser = JSON.parse(User)
        console.log(ParsedUser);
        const GetData = async () => {
            const id = ParsedUser._id
            const response = await axios.post(`${URL}/Data/RelatedProduct`,{id})
        }
        GetData()
    },[])
    return(
        <>
        
        </>
    )
}

export default ProductRelated