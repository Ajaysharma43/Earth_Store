import { useParams } from "react-router-dom";
import "../Product_Info/Product_Info.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  ButtonGroup,
  CardActionArea,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { MdZoomOutMap } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaSearch, FaCompress } from "react-icons/fa";
import { useSelector , useDispatch } from "react-redux";
import { setproduct } from "../../Features/ProductSlice/Productslice";

const URL = import.meta.env.VITE_API_URL;

const Product_Info = () => {
  const id = useParams();

  const product = useSelector((state)=> state.product)
  const dispatch = useDispatch()

  const [Product, setProduct] = useState({});
  const [CartItems, setCartItems] = useState(0);
  const [open, setOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [SizeAdjust, SetSizeAdjust] = useState(
    <MdZoomOutMap color="gray" size={20} />
  );
  const [ZoomIcon, SetZoomIcon] = useState(<FaSearch color="gray" size={20} />);

  const dilog = useRef(null);
  const Imageref = useRef();
  const DilogImage = useRef();
  const Fixed_Nav = useRef();

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

    // Check if the browser is already in full-screen mode
    if (document.fullscreenElement) {
      // Exit full-screen mode
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
      // Request full-screen mode
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
    setCartItems(CartItems + 1);
  };

  const RemoveCartItems = () => {
    if (CartItems === 0) {
      setCartItems(0);
    } else {
      setCartItems(CartItems - 1);
    }
  };

  const handleDialogClose = () => {
    setOpen(false); // Close dialog
  };

  const handleDialogOpen = () => {
    setOpen(true); // Open dialog
  };

  const handleScale = () => {
    const Image = DilogImage.current;
    Image.style.object = Image.style.transform = "scale(1.9)";
  };

  useEffect(() => {
    async function Getproducts() {
      const response = await axios.post(`${URL}/Data/Product`, { id });
      console.log("Res: ", response.data.Product);
      dispatch(setproduct(response.data.Product));

      setProduct(response.data.Product);
      sessionStorage.setItem("data", JSON.stringify(response.data.Product));
    }

    Getproducts();
  }, []);

  // console.log("Product: ", Product);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        style={{ backgroundColor: "#000000b8" }}
      >
        <div
          ref={dilog}
          className={`object-cover ${isFullScreen ? "fullscreen" : ""}`}
        >
          {/* Position the buttons fixed to the top-right corner of the screen */}
          <div className="fixed top-4 right-4 z-20 flex gap-[20px]">
            {/* Zoom button */}
            <button onClick={() => handleScale()}>{ZoomIcon}</button>

            {/* Full screen button */}
            <button onClick={() => ImageFullScreen()}>{SizeAdjust}</button>

            {/* Close button */}
            <button onClick={() => handleDialogClose()}>
              <IoMdClose color="gray" size={30} />
            </button>
          </div>

          <DialogContent className="p-0 items-center" style={{ padding: 0 }}>
            <CardActionArea>
              <img
                ref={DilogImage}
                src={Product.Image}
                alt="Product"
                className="h-[80vh] w-[80vw] object-contain"
              />
            </CardActionArea>
          </DialogContent>
          <h1 className="text-center text-gray-500">{Product.Name}</h1>
        </div>
      </Dialog>

      <div className="flex flex-wrap mt-[5%] w-full h-[572px] pl-[12%]">
        <section className="overflow-hidden w-1/2 flex justify-center">
          <div
            className="group relative h-[500px] w-[500px] overflow-hidden"
            onMouseMove={(e) => Zoom(e)}
            onMouseLeave={() => ResetZoom()}
          >
            <img
              src={Product.Image}
              ref={Imageref}
              alt="Product"
              className=" object-contain"
            />
            <div
              className="absolute top-2 right-2 z-10 bg-opacity-50 bg-white p-2 rounded-full cursor-pointer"
              onClick={handleDialogOpen}
            >
              <FaSearch size={20} color="black" />
            </div>
          </div>
        </section>

        <section className="w-[40%]">
          <h3 className="mt-[10px] text-[17px]">
            Home/{Product.Type}/{Product.Name}
          </h3>
          <h3 className="mt-[10px] text-[17px]">{Product.Type}</h3>
          <h1 className="mt-[10px] text-[42px]">{Product.Name}</h1>
          <h1 className="mt-[10px] text-[38px] font-bold text-gray-500">
            {Product.Price}
          </h1>
          <p className="w-[100%] text-[#808285] mt-[10px]">
            {Product.Description}
          </p>
          <h1 className="flex mt-[10px]">
            <ButtonGroup>
              <button
                onClick={() => RemoveCartItems()}
                className="w-[40px] h-[40px] border text-[#74a84a]"
              >
                -
              </button>
              <h1 className="w-[40px] h-[40px] text-center pt-3 border text-gray-500">
                {CartItems}
              </h1>
              <button
                onClick={() => AddCartItems()}
                className="w-[40px] h-[40px] border border-rl-slate-600 border text-[#74a84a]"
              >
                +
              </button>
            </ButtonGroup>
            <span>
              <button className="w-[155px] h-[40px] ml-[30px] bg-[#74a84a] text-white uppercase tracking-[2px] mt-[10px] text-[17px] transition duration-500 hover:bg-[#2c541d]">
                Add to cart
              </button>
            </span>
          </h1>
          <h1>
            Category: <h1>{Product.Type}</h1>
          </h1>
        </section>
      </div>
    </>
  );
};

export default Product_Info;
