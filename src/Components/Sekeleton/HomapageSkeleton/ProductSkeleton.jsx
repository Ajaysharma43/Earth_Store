import Skeleton from "react-loading-skeleton"

const Product_Skeleton = () => {
    return(
        <>
        <div className="grid">
        <Skeleton height={300} width={300}/>
        <Skeleton height={30} width={80}/>
        <Skeleton height={20} width={50}/>
        <Skeleton height={20} width={50}/>
        </div>
        </>
    )
}

export default Product_Skeleton;