/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import HoverButton from "../ux/HoverButton";

const ProductCard = ({ product, userId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  // Function to save rating to API
  const saveRating = async (starValue) => {
    try {
      const payload = {
        productId: product._id,
        rating: starValue,
      };

      const response = await fetch("api/listing/saverating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to save rating. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Rating saved successfully:", data);
    } catch (error) {
      console.error("Error saving rating:", error.message);
    }
  };

  // Handle star rating click
  const handleRating = (starValue) => {
    setRating(starValue);
    saveRating(starValue); // Send rating to API
  };

  return (
    <div className="w-[289px] h-[440px] flex flex-col border border-gray-300 relative group overflow-hidden">
      {/* Floating Discount Tag */}
      {product.discount && (
        <div className="absolute top-2 right-2 bg-[#F5A3B7] text-white text-xs px-3 py-1 rounded z-10 ">
          {`${product.discount} OFF`}
        </div>
      )}

      {/* Product Image */}
      <Link
        to={`/product/${product._id}/${userId}`}
        className="flex justify-center items-center h-[70%] relative overflow-hidden"
      >
        <div className="w-[300px] h-[250px] transition-transform duration-500 transform group-hover:scale-110">
          <img
            src={product.imageUrls}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-3 flex flex-col flex-grow text-left bg-white">
        {/* Product Name */}
        <h3 className="text-[24px] font-[Poppins] text-[#383838] mt-2 transition-colors duration-300 group-hover:text-[#F5A3B7]">
          {product.name}
        </h3>

        {/* Ratings */}
        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((star, index) => (
            <FaStar
              key={index}
              onClick={() => handleRating(star)} // Save the rating
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              color={(hover || rating) >= star ? "#FFD700" : "#b9bcc7"}
              className="cursor-pointer transition-colors duration-200"
            />
          ))}
        </div>

        {/* Product Description */}
        <p className="text-[16px] font-[Montserrat] text-[#697586] mt-2 whitespace-pre-line leading-6">
          {product.description}
        </p>

        {/* Price */}
        <h3 className="text-base text-[#697586] font-[Montserrat] mt-2">
          Ksh {product.price.replace(/[^0-9]/g, "")}
        </h3>

        {/* Action Buttons */}
        <div className="mt-auto flex flex-col gap-4">
          <HoverButton
            pretittle="Continue Shopping"
            title="Add to Cart"
            link={`/cart/${product._id}/${userId}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
