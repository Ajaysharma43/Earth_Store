import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CalcualteTotal, GetCart } from "../Features/CartSlice/CartSlice";

const Checkout_Payment = () => {
    const Product = useSelector((state) => (Array.isArray(state.Cart.Cart) ? state.Cart.Cart : []));
    const Total = useSelector((state) => state.Cart.Total)
    const [TotalPrice, setTotalPrice] = useState(0);
    const [ShippingCharges , SetShippingCharges] = useState(0)
  const dispatch = useDispatch();

  const CalCulateTotal = () => {
    const salesTaxRate = 10;
    const total = Product.reduce(
      (acc, item) => acc + item.Price * item.Quantity,
      0
    );
    setTotalPrice(total);
    SetShippingCharges(Product.length*salesTaxRate)
  };

    useEffect(() => {
        dispatch(GetCart())
        dispatch(CalcualteTotal())
        CalCulateTotal()
    },[Total])

    return(
        <>
        <h1>SubTotal : {Total}</h1>
        <h1>ShippingCharges : {ShippingCharges}</h1>
        </>
    )
}

export default Checkout_Payment