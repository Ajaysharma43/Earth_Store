import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CatageorySkeleton = () => {
    return(
        <>
        <Skeleton count={1} width={92} height={23}/>
        </>
    )
}

export default CatageorySkeleton