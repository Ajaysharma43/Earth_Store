import { Link, useParams } from "react-router-dom";
import "../Product_Info/Product_Info.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  ButtonGroup,
  CardActionArea,
  Dialog,
  DialogContent,
  DialogTitle,
  BottomNavigation,
} from "@mui/material";
import { MdZoomOutMap } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaSearch, FaCompress } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { LoadMore, setproduct } from "../../Features/ProductSlice/Productslice";
import { Cart, SetCart } from "../../Features/CartSlice/CartSlice";
import { setID } from "../../Features/Idslice/Idslice";
import {
  Increament,
  Decreament,
  Reset,
} from "../../Features/CartQuantity/CartQunatity";
import TiitleSkeleton from "../../Sekeleton/ProductSekeleton/TitleSekeleton";
import ImageSkeleton from "../../Sekeleton/ProductSekeleton/ImageSkeleton";
import ParagraphSkeleton from "../../Sekeleton/ProductSekeleton/Paragraph";
import PriceSkeleton from "../../Sekeleton/ProductSekeleton/PriceSkeleton";
import CatageorySkeleton from "../../Sekeleton/ProductSekeleton/Catageory";
import RouteBarSkeleton from "../../Sekeleton/ProductSekeleton/RouteBarSekeleton";
import LoadingBar from "react-top-loading-bar";
import { Single_Product } from "../../Features/DataSlice/SingleProduct";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartLoader from "../../Loaders/CartLoader/CartLoader";
import AddToCartLoader from "../../Loaders/CartLoader/CartLoader2";

const URL = import.meta.env.VITE_API_URL;

const Product_Info = () => {
  const { id } = useParams();
  const product = useSelector((state) => state.product);
  const { isloading, iserror, SingleProduct } = useSelector(
    (state) => state.SingleProduct
  );
  const ID = useSelector((state) => state.ID.ID);
  const CartData = useSelector((state) => state.Cart);
  const Qunatity = useSelector((state) => state.Qunatity.Quantity);
  const limit = useSelector((state) => state.Product.limit);
  const [progress, setprogress] = useState(0);
  const dispatch = useDispatch();
  const [Product, setProduct] = useState({});
  const [CartItems, setCartItems] = useState(Qunatity);
  const [open, setOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [AddToCart, setAddToCart] = useState(false);
  const [SizeAdjust, SetSizeAdjust] = useState(
    <MdZoomOutMap color="gray" size={20} />
  );
  const [ZoomIcon, SetZoomIcon] = useState(<FaSearch color="gray" size={20} />);

  const dilog = useRef(null);
  const Imageref = useRef();
  const DilogImage = useRef();
  const Fixed_Nav = useRef();

  useEffect(() => {
    dispatch(Reset());
    const Getproducts = async () => {
      setprogress(30);
      dispatch(Single_Product(id));

      try {
        const response = await axios.post(`${URL}/Data/Product`, { id });

        if (response.data) {
          setprogress(60);
          console.log("Res: ", response.data.Product);

          const totalReviews = response.data.Product.Reviews || [];
          const limitedReviews = totalReviews.slice(0, limit);

          dispatch(
            setproduct({
              data: { ...response.data.Product, Reviews: limitedReviews },
              length: totalReviews.length,
            })
          );

          dispatch(setID(id));
          dispatch(LoadMore());
          setProduct({ ...response.data.Product, Reviews: limitedReviews }); // Update local state with limited reviews

          sessionStorage.setItem(
            "data",
            JSON.stringify({
              ...response.data.Product,
              Reviews: limitedReviews,
            })
          );

          setprogress(100);
        } else {
          sessionStorage.removeItem("data");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    Getproducts();
  }, [id, limit]);

  const Zoom = (e) => {
    const image = Imageref.current;
    const { left, top, width, height } = image.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    image.style.transformOrigin = `${x}% ${y}%`;
    image.style.transform = "scale(2)";
  };

  const ResetZoom = () => {
    const image = Imageref.current;
    image.style.transform = "scale(1)";
  };

  const ImageFullScreen = () => {
    const dilogbox = dilog.current;
    const image = DilogImage.current;
    image.style.transform = "scale(1)";

    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        SetZoomIcon(<FaSearch color="gray" size={20} />);
        SetSizeAdjust(<MdZoomOutMap color="gray" size={20} />);
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        SetZoomIcon(<FaSearch color="gray" size={20} />);
        SetSizeAdjust(<MdZoomOutMap color="gray" size={20} />);
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        SetZoomIcon(<FaSearch color="gray" size={20} />);
        SetSizeAdjust(<MdZoomOutMap color="gray" size={20} />);
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        SetZoomIcon(<FaSearch color="gray" size={20} />);
        SetSizeAdjust(<MdZoomOutMap color="gray" size={20} />);
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    } else {
      if (dilogbox.requestFullscreen) {
        SetZoomIcon(null);
        SetSizeAdjust(<FaCompress color="gray" size={20} />);
        dilogbox.requestFullscreen();
      } else if (dilogbox.webkitRequestFullscreen) {
        SetZoomIcon(null);
        SetSizeAdjust(<FaCompress color="gray" size={20} />);
        dilogbox.webkitRequestFullscreen();
      } else if (dilogbox.mozRequestFullScreen) {
        SetZoomIcon(null);
        SetSizeAdjust(<FaCompress color="gray" size={20} />);
        dilogbox.mozRequestFullScreen();
      } else if (dilogbox.msRequestFullscreen) {
        SetZoomIcon(null);
        SetSizeAdjust(<FaCompress color="gray" size={20} />);
        dilogbox.msRequestFullscreen();
      }
      setIsFullScreen(true);
    }
  };

  const AddCartItems = () => {
    dispatch(Increament(1));
  };

  const RemoveCartItems = () => {
    if (CartItems === 0) {
      dispatch(Reset());
    } else {
      dispatch(Decreament(1));
    }
  };

  const handleDialogClose = () => {
    setIsFullScreen(false);
    setOpen(false);
    SetSizeAdjust(<MdZoomOutMap color="gray" size={20} />);
    SetZoomIcon(<FaSearch color="gray" size={20} />);
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleScale = () => {
    const Image = DilogImage.current;
    Image.style.object = Image.style.transform = "scale(1.9)";
  };

  // const HandleCart = () => {
  //   const Cart = {
  //     ProductId: Product._id,
  //     ProductName: Product.Name,
  //     ProductType: Product.Type,
  //     ProductImage: Product.Image,
  //     ProductPrice: Product.Price,
  //     ProductQuantity: CartItems,
  //   };
  //   console.log(Cart);
  //   dispatch(SetCart(Cart));
  // };

  const AddCart = () => {
    const CartData = {
      ProductID: Product._id,
      Name: Product.Name,
      Type: Product.Type,
      Price: Product.Price,
      Image: Product.Image,
      Description: Product.Description,
      Quantity: Qunatity,
    };
    setAddToCart(true);
    setTimeout(() => {
      dispatch(Cart({ CartData }));
      setAddToCart(false);
    }, 5000);
  };

  return (
    <>
      <LoadingBar
        color="#74a84a"
        progress={progress}
        height={2}
        onLoaderFinished={() => setprogress(0)}
      />
      <Dialog
        open={open}
        onClose={handleDialogClose}
        style={{ backgroundColor: "#000000b8" }}
      >
        <DialogContent className="p-0 items-center" style={{ padding: 0 }}>
          <div
            ref={dilog}
            className={`object-cover ${isFullScreen ? "fullscreen" : ""}`}
          >
            <div className="fixed top-4 right-4 z-20 flex gap-[20px]">
              <button onClick={() => handleScale()}>{ZoomIcon}</button>
              <button onClick={() => ImageFullScreen()}>{SizeAdjust}</button>
              <button onClick={() => handleDialogClose()}>
                <IoMdClose color="gray" size={30} />
              </button>
            </div>
            <CardActionArea>
              <img
                ref={DilogImage}
                src={Product.Image}
                alt="Product"
                className="w-[80vw] object-contain"
              />
            </CardActionArea>
          </div>
        </DialogContent>
        <h1 className="text-center text-gray-500">{Product.Name}</h1>
      </Dialog>

      <div className="flex flex-wrap justify-center mt-[5%] mb-[5%] w-full h-full pl-[5%]">
        <section className="overflow-hidden w-full lg:w-[38%] flex justify-center relative h-fit mr-[5%]">
          <div className="group relative overflow-hidden">
            {Product.Image ? (
              <>
                <button
                  className="absolute top-2 right-2 z-10 bg-opacity-50 bg-white p-2 rounded-full cursor-pointer"
                  onClick={handleDialogOpen}
                >
                  <FaSearch size={20} color="black" />
                </button>
                <img
                  src={Product.Image}
                  ref={Imageref}
                  className="relative object-cover w-full h-auto max-h-[500px] max-w-full sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]"
                  onMouseMove={(e) => Zoom(e)}
                  onMouseLeave={() => ResetZoom()}
                />
              </>
            ) : (
              <ImageSkeleton />
            )}
          </div>
        </section>

        <section className="w-[95%] md:w-[72%] flex flex-col lg:w-[38%] md:px-6 lg:px-8 mr-[5%]">
          {Product.Type && Product.Name ? (
            <h3 className="mt-2 text-sm md:text-base text-gray-500">
              <Link to={"/"}>Home</Link> / {Product.Type} / {Product.Name}
            </h3>
          ) : (
            <>
              <RouteBarSkeleton className="h-4 w-[200px] sm:w-[100px] md:w-[200px] lg:w-[200px]" />
            </>
          )}

          <h3 className="mt-2 text-sm md:text-base text-[#74a84a]">
            {Product.Type ? (
              Product.Type
            ) : (
              <CatageorySkeleton className="h-4 w-1/2 md:w-1/3" />
            )}
          </h3>

          <h1 className="mt-2 text-lg md:text-xl font-bold">
            {Product.Name ? (
              Product.Name
            ) : (
              <TiitleSkeleton className="h-6 w-[80%] md:w-[60%]" />
            )}
          </h1>

          <h1 className="mt-2 text-lg md:text-xl font-semibold text-gray-500">
            $
            {Product.Price ? (
              Product.Price * Qunatity
            ) : (
              <PriceSkeleton className="h-5 w-1/3" />
            )}
          </h1>

          <p className="w-full text-gray-600 mt-2 text-sm md:text-base">
            {Product.Description ? (
              Product.Description
            ) : (
              <ParagraphSkeleton className="h-[119px] w-full " />
            )}
          </p>

          <h1 className="flex mt-4 items-center">
            <ButtonGroup>
              <button
                onClick={() => RemoveCartItems()}
                className="w-10 h-10 border text-[#74a84a] text-sm md:text-base"
              >
                -
              </button>
              <h1 className="w-10 h-10 text-center pt-2 border text-gray-500 text-sm md:text-base">
                {Qunatity}
              </h1>
              <button
                onClick={() => AddCartItems()}
                className="w-10 h-10 border text-[#74a84a] text-sm md:text-base"
              >
                +
              </button>
            </ButtonGroup>

            <span>
              <button
                className="w-[140px] sm:w-[155px] h-10 ml-4 bg-[#74a84a] text-white uppercase tracking-wide text-sm md:text-base transition duration-500 hover:bg-[#2c541d]"
                onClick={() => AddCart()}
              >
                {AddToCart == true ? (
                  <div className="">
                    <AddToCartLoader />
                  </div>
                ) : (
                  "Add to cart"
                )}
              </button>
            </span>
          </h1>

          <span className="h-px w-full bg-gray-200 mt-3"></span>

          <h1 className="flex flex-wrap mt-4 text-sm md:text-base">
            Category:{" "}
            <span className="text-[#74a84a] ml-2">
              {Product.Type ? (
                Product.Type
              ) : (
                <CatageorySkeleton className="h-4 w-1/4" />
              )}
            </span>
          </h1>
        </section>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default Product_Info;
