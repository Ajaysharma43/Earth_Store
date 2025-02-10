import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCart } from "../Features/CartSlice/CartSlice";

const Order = () => {
    const Checkout = useSelector((state) => state.Cart.Checkout) || [];
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetCart())
        console.log(Checkout);
        
    },[Checkout.length])
    return(
        <>
        <div>
            {Checkout.length > 0 ?
                Checkout.map((item) => (
                    <div>
                        <h1>{item.Name}</h1>
                    </div>
                ))
                :
                (
                    <>
                    <h1>no orders are available</h1>
                    </>
                )
            }
        </div>
        </>
    )
}

export default Order;