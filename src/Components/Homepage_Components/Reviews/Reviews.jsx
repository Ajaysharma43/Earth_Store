import { useEffect, useState } from "react";
import data from "/DataAPI/Reviews.json?url";
import "./Reviews.css";
import axios from "axios";
import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(data);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    getData();
  }, []);

  // Animation variants for review cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div id="Reviews">
      <div id="Reviews_Header">
        <h1>What Our Customers Say</h1>
      </div>
      <div id="Reviews_User">
        {reviews.map((item, index) => (
          <motion.div
            key={index}
            className="Reviews_item"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2, // Staggered animation for each review
            }}
          >
            <div className="Review_Section">
              <FaQuoteLeft size={30} color="#2c541d" />
              <p className="User_Review">{item.Review}</p>
            </div>
            <div className="User_Section">
              <div className="Userpic">
                {item.Userpic ? (
                  <img src={item.Userpic} alt={item.User} />
                ) : (
                  <div className="Placeholder_Icon">👤</div>
                )}
              </div>
              <h2 className="User_Name">{item.User}</h2>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
