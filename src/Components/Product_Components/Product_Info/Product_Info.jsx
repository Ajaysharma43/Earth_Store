import { useParams } from "react-router-dom";
import "../Product_Info/Product_Info.css";
import data from "/DataAPI/Porducts.json?url";
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
import { FaSearch,FaCompress  } from "react-icons/fa";
import Idcontext from "../../Context/IdContext";

const Product_Info = () => {
  const id = useParams();

  const [Product, setproduct] = useState({});
  const [CartItems, setCartItems] = useState(0);
  const [open, setOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false); 
  const [SizeAdjust,SetSizeAdjust] = useState(<MdZoomOutMap color="gray" size={20}/>)
  const [ZoomIcon,SetZoomIcon] = useState(<FaSearch color="gray" size={20}/>)

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
        SetZoomIcon(<FaSearch color="gray" size={20}/>)
        SetSizeAdjust(<MdZoomOutMap color="gray" size={20}/>)
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        SetZoomIcon(<FaSearch color="gray" size={20}/>)
        SetSizeAdjust(<MdZoomOutMap color="gray" size={20}/>)
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        SetZoomIcon(<FaSearch color="gray" size={20}/>)
        SetSizeAdjust(<MdZoomOutMap color="gray" size={20}/>)
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        SetZoomIcon(<FaSearch color="gray" size={20}/>)
        SetSizeAdjust(<MdZoomOutMap color="gray" size={20}/>)
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    } else {
      // Request full-screen mode
      if (dilogbox.requestFullscreen) {
        SetZoomIcon(null)
        SetSizeAdjust(<FaCompress color="gray" size={20}/>)
        dilogbox.requestFullscreen();
      } else if (dilogbox.webkitRequestFullscreen) {
        SetZoomIcon(null)
        SetSizeAdjust(<FaCompress color="gray" size={20}/>)
        dilogbox.webkitRequestFullscreen();
      } else if (dilogbox.mozRequestFullScreen) {
        SetZoomIcon(null)
        SetSizeAdjust(<FaCompress color="gray" size={20}/>)
        dilogbox.mozRequestFullScreen();
      } else if (dilogbox.msRequestFullscreen) {
        SetZoomIcon(null)
        SetSizeAdjust(<FaCompress color="gray" size={20}/>)
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
    Image.style.object = 
    Image.style.transform = "scale(1.9)"
  }

  const NavFix = () => {
    const Nav = Fixed_Nav.current;
    if(window.scrollY = 0)
    {
      Nav.style.display = "flex"
    }
    else
    {
      Nav.style.display = "hidden"
    }
  }

  useEffect(() => {
    async function Getproducts() {
      const response = await axios.get(data);
      const Single = response.data.find((Product) => Product.id == id.id);
      setproduct(Single);
      sessionStorage.setItem('data',JSON.stringify(Single))
    }

    Getproducts();
  }, []);

  return (
    <>

    <nav className="fixed hidden justify-center w-full gap-[63%] bg-white" ref={Fixed_Nav} onScroll={()=>NavFix()}>
      <section className="flex gap-6">
        <img src={Product.image} alt="" className="w-[80px] h-[80px]"/>
        <h1>{Product.name}</h1>
      </section>

      <section className="flex">
        <h1>{Product.price}</h1>
        <ButtonGroup variant="contained" aria-label="Basic button group">
              <button onClick={() => RemoveCartItems()}>-</button>
              <h1>{CartItems}</h1>
              <button onClick={() => AddCartItems()}>+</button>
            </ButtonGroup>
            <span>
              <button>Add to cart</button>
            </span>
      </section>
    </nav>



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
      <button onClick={() => ImageFullScreen()}>
        {SizeAdjust}
      </button>

      {/* Close button */}
      <button onClick={() => handleDialogClose()}>
        <IoMdClose color="gray" size={30} />
      </button>
    </div>

    <DialogContent className="p-0 items-center" style={{ padding: 0 }}>
      <CardActionArea>
        <img
          ref={DilogImage}
          src={Product.image}
          alt="Product"
          className="h-[80vh] w-[80vw] object-contain" 
        />
      </CardActionArea>
    </DialogContent>
    <h1 className="text-center text-gray-500">{Product.name}</h1>
  </div>
</Dialog>

      <div className="flex flex-wrap justify-center gap-[40px] mt-[5%] w-full">
      <section className="overflow-hidden w-1/2 flex justify-center">
  <div
    className="group relative h-[300px] w-[300px] overflow-hidden"
    onMouseMove={(e) => Zoom(e)}
    onMouseLeave={() => ResetZoom()}

  >
    <img
      src={Product.image}
      ref={Imageref}
      alt="Product"
      className="h-full w-full object-contain"
    />
    <div className="absolute top-2 right-2 z-10 bg-opacity-50 bg-white p-2 rounded-full cursor-pointer" onClick={handleDialogOpen}>
      <FaSearch size={20} color="black" />
    </div>
  </div>
</section>


        <section className="w-[25%]">
          <h3>
            Home/{Product.type}/{Product.name}
          </h3>
          <h3>{Product.type}</h3>
          <h1>{Product.name}</h1>
          <h1>{Product.price}</h1>
          <p className="w-[550px]">{Product.description}</p>
          <h1 className="flex">
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <button onClick={() => RemoveCartItems()} className="w-[40px] h-[40px] border">-</button>
              <h1 className="w-[40px] h-[40px] text-center pt-3 border">{CartItems}</h1>
              <button onClick={() => AddCartItems()} className="w-[40px] h-[40px] border-none border-rl-slate-600 border">+</button>
            </ButtonGroup>
            <span>
              <button className="w-[200px] h-[40px] ml-[30px] bg-[#74a84a] text-white uppercase tracking-[2px] text-[17px] transition duration-500 hover:bg-[#2c541d]">Add to cart</button>
            </span>
          </h1>
          <h1>Category: {Product.type}</h1>
        </section>
      </div>
    </>
  );
};

export default Product_Info;
