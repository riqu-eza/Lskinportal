/* eslint-disable react/prop-types */
import { useRef } from "react";
import ProductCard from "./product";
// import { Link } from "react-router-dom";
import "./component.css";
import Ctabutton from "../ux/ctabutton";

const CategoryRow = ({ categoryName, products, userId }) => {
  const scrollRef = useRef(null);
  console.log(categoryName, products);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="mt-8   ">
      <h2 className="text-2xl text-center font-bold p-8 mb-4">
        {categoryName}
      </h2>

      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-16 bottom-0 w-10  h-[5cm]  text-5xl opacity-70 hover:bg-gray-400 z-10"
        >
          &#8249;
        </button>

        <div
          ref={scrollRef}
          className="flex   overflow-x-auto scrollbar-hide"
          style={{ whiteSpace: "nowrap" }} // Prevent wrapping of flex items
        >
          {products.map((product, index) => (
            <div key={index} className="inline-block">
              {" "}
              {/* Ensure each card is treated as a block for scrolling */}
              <ProductCard product={product} userId={userId} />
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-16 bottom-0 w-10 h-[5cm] text-5xl opacity-70 hover:bg-gray-400 z-10"
        >
          &#8250;
        </button>
      </div>
      <div className=" text-center ">
        <Ctabutton
          text={`View All ${categoryName}`}
          link={`/category/${categoryName}`}
          userId={userId}
        />
        {/* <Link
          to={`/category/${categoryName}`}
          className="text-black  hover:underline"
        >
          View All {categoryName}
        </Link> */}
      </div>
      <div>
        <hr className="border-t border-gray-900 my-4" />
      </div>
    </div>
  );
};

export default CategoryRow;
