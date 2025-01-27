import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetData } from "../../Features/DataSlice/DataSlice";

const Products = () => {
    const Data = useSelector((state) => state.Data)
    const dispatch = useDispatch();

    useEffect(() => {
        const Dataget = async() => {
        dispatch(GetData())
        }
        Dataget()
    },[])
    
  return(
    <>
    
    </>
  )
};

export default Products