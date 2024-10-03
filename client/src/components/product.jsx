/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import HoverButton from "../ux/HoverButton";

const ProductCard = ({ product , userId}) => {
  console.log("prod", product);
  console.log("id", product._id);
  return (
    <div className="w-[350px] h-[500px] p-8 flex flex-col"  >
      {/* Product Image */}
      <Link
        to={`/product/${product._id}/${userId}`}
        className="flex justify-center items-center h-[70%] relative overflow-hidden"
      >
       <div className="w-[300px] h-[300px] transition-transform duration-2000 transform hover:scale-110"> {/* Slower transition */}
      <img
        src={product.imageUrls}
        alt={product.name}
        className="object-cover w-full h-full" // Ensure the image takes full height and width
      />
    </div>
      </Link>

      {/* Product Name */}
      <h3 className="text-2xl font-medium text-center productname mt-2">{product.name}</h3>
      <h3 className="text-base text-slate-500 font-medium text-center mt-2">Ksh{product.price.replace(/[^0-9]/g, '')}</h3>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col cart gap-6 p-3">
        <HoverButton pretittle={'continue Shopping'} title="Add to Cart" link={`/cart/${product._id}/${userId}`}  />
        <HoverButton  pretittle={'check-out'} title="Buy Now" link={`/buy/${product._id}/${userId}`  } />
      </div>
    </div>
  );
};

export default ProductCard;
