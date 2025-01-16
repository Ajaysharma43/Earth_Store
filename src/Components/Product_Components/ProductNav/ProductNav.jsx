import { ButtonGroup } from "@mui/material";
import { useSelector } from "react-redux";
import NavImageSkeleton from "../../Sekeleton/ProductNavSekeleton/NavImageSkeleton";
import PriceSkeleton from "../../Sekeleton/ProductSekeleton/PriceSkeleton";

const ProductNav = () => {
  const Product = useSelector((state) => state.product.Product);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md flex items-center px-6 py-4 z-50">
      {/* Product Image and Name Section */}
      <section className="flex items-center gap-4">
        {Product ? (
          <>
            <img
              src={Product.Image}
              alt={Product.Name}
              className="w-12 h-12 object-cover rounded-md md:hidden sm:hidden lg:block xl:block 2xl:block hidden"
            />
            <div>
              <h1 className="text-lg font-semibold text-gray-800 sm:block md:block lg:block xl:block 2xl:block hidden">
                {Product.Name}
              </h1>
            </div>
          </>
        ) : (
          <NavImageSkeleton className="md:hidden sm:hidden lg:block xl:block 2xl:block hidden"/>
        )}
      </section>

      {/* Price and Cart Section */}
      <section className="ml-auto flex items-center gap-6">
        <h1 className="text-xl font-bold text-[#74a84a]">
          {Product?.Price ? `${Product.Price}` : <PriceSkeleton />}
        </h1>
        <div className="flex items-center gap-2">
          {/* Quantity Adjuster */}
          <ButtonGroup>
            <button className="w-8 h-8 flex items-center justify-center border hover:bg-gray-300 text-[#74a84a] font-bold">
              -
            </button>
            <span className="w-8 h-8 flex items-center justify-center border text-gray-800 font-semibold">
              0
            </span>
            <button className="w-8 h-8 flex items-center justify-center border hover:bg-gray-300 text-[#74a84a] font-bold">
              +
            </button>
          </ButtonGroup>

          {/* Add to Cart Button */}
          <button className="px-4 py-2 bg-[#74a84a] text-white text-sm uppercase font-medium shadow-md hover:bg-[#2c541d] transition">
            Add to cart
          </button>
        </div>
      </section>
    </nav>
  );
};

export default ProductNav;
