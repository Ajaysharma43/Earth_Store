import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import { IoMdWarning } from "react-icons/io";
import errorImage from "../../assets/Homapage_Images/a9588ac4be92480bbf420071afe1043d.png";

const Unknowm = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center relative flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${errorImage})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        {/* Animated Header */}
        <motion.h1
          className="text-8xl font-extrabold drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          404
        </motion.h1>

        {/* Warning Icon */}
        <motion.div
          className="mt-4 text-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <IoMdWarning />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-2xl mt-4 drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          Sorry, the page you're looking for cannot be found.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="mt-10 flex gap-4 justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
        >
          <Link
            to="/"
            className="px-6 py-3 bg-[#74a84a] rounded-lg text-white text-lg font-medium shadow-md hover:bg-[#2c541d] transition-all flex items-center gap-2"
          >
            <FaHome className="text-xl" />
            Go to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Unknowm;
