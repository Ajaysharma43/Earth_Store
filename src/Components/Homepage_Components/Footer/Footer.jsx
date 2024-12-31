import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div id="HomapageFooter">
        <div>
          <nav id="Homepage_Footer_Nav">
            <h1 className="Homepage_Footer_Nav_Element">Home</h1>
            <h1 className="Homepage_Footer_Nav_Element">About</h1>
            <h1 className="Homepage_Footer_Nav_Element">Shop</h1>
            <h1 className="Homepage_Footer_Nav_Element">Contact</h1>
          </nav>
        </div>

        <div style={{    width: "11%",height:"7px",textAlign:"end"}}>
            <img src="https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/11/EARTH-STORE-200x35.png" alt="" id="Homepage_Footer_Logo"/>

        </div>

        <div>
            <h1 id="Homepage_Footer_Info">Copyright © 2024 Planet Earth Store</h1>
        </div>
      </div>
    </>
  );
};

export default Footer;
