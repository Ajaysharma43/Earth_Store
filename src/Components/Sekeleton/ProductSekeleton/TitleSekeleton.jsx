import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const TiitleSkeleton = () => {
    return(
        <>
        <Skeleton count={1} width={130} height={42}/>
        </>
    )
}

export default TiitleSkeleton