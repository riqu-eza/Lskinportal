/* eslint-disable react/prop-types */

const ProductCard = ({ product }) => {
  return (
    <div className="w-[350px] h-[500px]  p-8  flex flex-col ">
      {/* Product Image */}
      <div className="flex justify-center items-center h-[70%]">
        <img
          src={product.imageUrls}
          alt={product.name}
          className=" h-full object-cover"
        />
      </div>

      {/* Product Name */}
      <h3 className="text-sm font-medium text-center mt-2">{product.name}</h3>
      <h3 className="text-sm font-medium  text-center mt-2">{product.price}</h3>

      {/* Action Buttons */}
      <div className="mt-2 flex justify-center   gap-3">
        <button className="bg-green-500 hover:bg-green-700 text-white text-xs font-semibold py-1 px-2 rounded">
          Add to Cart
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-semibold py-1 px-2 rounded">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
