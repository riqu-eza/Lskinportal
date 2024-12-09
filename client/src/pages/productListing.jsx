/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/header";
import { FaCheck } from "react-icons/fa";

const ProductListing = () => {
  const { productId, userId } = useParams();
  const [showIngredients, setShowIngredients] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);
  const [product, setProduct] = useState();
  const [selectedImage, setSelectedImage] = useState(""); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/listing/products/${productId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProduct(data);
      setSelectedImage(data.imageUrls[0]); 
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row gap-2 p-2">
        {/* Left Section */}
        <div className="flex-1 p-1 flex flex-col items-center justify-center">
          {/* Main Image */}
          <div className="h-96 mb-2">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full border object-cover"
            />
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
            {product.imageUrls.map((img, index) => (
              <div
                key={index}
                className="h-20 cursor-pointer"
                onClick={() => setSelectedImage(img)} 
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-4 flex flex-col">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#383838] mb-2">
            {product.name}
          </h2>
          <h3 className="text-lg font-semibold text-[#383838] mb-2">
            Ksh {product.price}
          </h3>
          <p className="text-sm sm:text-base text-[#697586] mb-4">{product.description}</p>
          <p className="text-sm sm:text-base text-[#697586] mb-4">Size: {product.amount}</p>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col gap-2">
            <Link
              to={`/cart/${product._id}/${userId}`}
              className="bg-[#F5A3B7] hover:bg-[#383838] text-white font-semibold py-2 px-4 text-center rounded-md w-full sm:w-1/2"
            >
              Add to Bag
            </Link>
          </div>

          {/* Ingredients & How to Use */}
          <div className="flex flex-col mt-4">
            <button
              onClick={() => setShowIngredients(!showIngredients)}
              className="text-[#383838] font-semibold text-lg p-2 border-b border-black"
            >
              Ingredients
            </button>
            {showIngredients && (
              <ul className="bg-gray-200 rounded-md p-2 mt-2">
                {product.ingridients.map((ingredient, index) => (
                  <li className="flex items-center gap-2" key={index}>
                    <FaCheck className="text-xl" /> {ingredient}
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={() => setShowHowToUse(!showHowToUse)}
              className="text-[#383838] font-semibold text-lg p-2 border-b border-black mt-2"
            >
              How to Use
            </button>
            {showHowToUse && (
              <ul className="bg-gray-200 rounded-md p-2 mt-2">
                {product.howtouse.map((instruction, index) => (
                  <li className="flex items-center gap-2" key={index}>
                    <FaCheck className="text-xl" /> {instruction}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;
