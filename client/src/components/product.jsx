/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import HoverButton from "../ux/HoverButton";

const ProductCard = ({ product , userId}) => {
  console.log("prod", product);
  console.log("id", product._id);
  return (
    <div className="w-[350px] h-[500px] p-8 flex flex-col">
      {/* Product Image */}
      <Link
        to={`/product/${product._id}/${userId}`}
        className="flex justify-center items-center h-[70%]"
      >
        <img
          src={product.imageUrls}
          alt={product.name}
          className="h-full w-full object-cover" // Ensure the image takes full height and width
        />
      </Link>

      {/* Product Name */}
      <h3 className="text-sm font-medium text-center mt-2">{product.name}</h3>
      <h3 className="text-sm font-medium text-center mt-2">{product.price}</h3>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col gap-6 p-3">
        <HoverButton pretittle={'continue Shopping'} title="Add to Cart" link={`/cart/${product._id}/${userId}`}  />
        <HoverButton  pretittle={'check-out'} title="Buy Now" link={`/buy/${product._id}/${userId}`  } />
      </div>
    </div>
  );
};

export default ProductCard;
