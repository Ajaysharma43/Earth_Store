import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const NavImageSkeleton = () => {
    return(
        <>
        <div className='flex justify-around gap-3'>
        <Skeleton count={1} width={50} height={50} className=' object-contain md:hidden sm:hidden lg:block xl:block 2xl:block hidden'/>
        <Skeleton count={1} width={100} height={20} className=' object-contain'/>
        </div>
        </>
    )
}

export default NavImageSkeleton