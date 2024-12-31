import { FaLock, FaBox, FaHandHoldingHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRef } from "react";
import "../Homepage_Ending/Homepage_Ending.css"

const Homepage_Ending = () => {
  const ending = useRef(null);
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div id="Homepage_Ending_Details">
      {[
        {
          icon: <FaLock className="text-gray-700 h-12 w-12" />,
          header: "Secure Payment",
          info: "All our payments are SSL secured",
          display: "block",
        },
        {
          icon: <FaBox className="text-white h-12 w-12 bg-gray-700 p-2 rounded-full" />,
          header: "Delivered With Care",
          info: "Super fast shipping to your door",
          display: "block",
        },
        {
          icon: <FaHandHoldingHeart className="text-red-500 h-12 w-12" />,
          header: "Excellent Service",
          info: "Live chat and phone support",
          display: "none",
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          className="Homepage_Ending_Details_1"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.5,
            delay: index * 0.2,
          }}
        >
          <section>
            <span className="icon">{item.icon}</span>
          </section>

          <section>
            <h1 className="Homepage_Ending_Header">{item.header}</h1>
            <h3 className="Homepage_Ending_Info">{item.info}</h3>
          </section>

          <section>
            <div className="Homepage_Ending_Empty" ref={ending} style={{ display: item.display }}></div>
          </section>
        </motion.div>
      ))}
    </div>
  );
};

export default Homepage_Ending;
