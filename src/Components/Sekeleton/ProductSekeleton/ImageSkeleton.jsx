import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ImageSkeleton = () => {
    return(
        <>
        <SkeletonTheme>
        <Skeleton count={1} width={500} height={500} className=' object-contain'/>
        </SkeletonTheme>
        </>
    )
}

export default ImageSkeleton