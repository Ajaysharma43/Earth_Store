import { ButtonGroup } from "@mui/material";
import { useSelector } from "react-redux";
import NavImageSkeleton from "../../Sekeleton/ProductNavSekeleton/NavImageSkeleton";
import PriceSkeleton from "../../Sekeleton/ProductSekeleton/PriceSkeleton";

const ProductNav = () => {
  const Product = useSelector((state) => state.product.Product);
  console.log(Product);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md flex items-center px-8 py-4 z-50 break-words whitespace-pre-wrap">
      <section className="flex items-center gap-4">
        {Product ? (
          <>
            <img
              src={Product.Image}
              alt={Product.Name}
              className="w-14 h-14 object-cover rounded-md"
            />
            <div>
              <h1 className="text-lg font-semibold text-[#74a84a]">
                {Product.Name}
              </h1>
            </div>
          </>
        ) : (
          <NavImageSkeleton/>
        )}
      </section>

      {/* Price and Cart Section */}
      <section className="ml-auto w-full flex items-center gap-6">
            <h1 className="text-xl font-bold text-[#74a84a]">
          {Product?.Price || <PriceSkeleton/>}
        </h1>
        <div className="flex items-center gap-2">
          <ButtonGroup className="">
            <button className="w-8 h-8  hover:bg-gray-300 text-[#74a84a] font-bold border">
              -
            </button>
            <h1 className="w-8 h-8 flex items-center justify-center  text-gray-800 font-semibold border">
              0
            </h1>
            <button className="w-8 h-8  hover:bg-gray-300 text-[#74a84a] font-bold border">
              +
            </button>
          </ButtonGroup>
          <button className="px-4 py-2 bg-[#74a84a] text-white text-sm uppercase font-medium shadow-md hover:bg-[#2c541d]">
            Add to cart
          </button>
        </div>
      </section>
    </nav>
  );
};

export default ProductNav;
