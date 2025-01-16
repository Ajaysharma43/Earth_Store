import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ParagraphSkeleton = () => {
  return (
    <>
      <Skeleton count={1} height={100}/>
    </>
  );
};

export default ParagraphSkeleton;
