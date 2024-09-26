 /* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import Header from "../components/header";
import HoverButton from "../ux/HoverButton";

const ProductListing = () => {
  const { id } = useParams(); // Getting product ID from route
  const [quantity, setQuantity] = useState(1);
  const [showIngredients, setShowIngredients] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);
  const [product, setProduct] = useState();
  const [selectedImage, setSelectedImage] = useState(""); // New state to track selected image
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null);

  // Fetch product data from API
  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:3003/api/listing/products/${id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProduct(data); // Update product state with fetched data
      setSelectedImage(data.imageUrls[0]); // Set the first image as default
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]); // Re-fetch data when the id changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <>
      <Header />
      <div className="flex border-black border-2">
        {/* Left Section */}
        <div className="w-2/3 p-4 border-black border-2  flex flex-col">
          {/* Main Image */}
          <div className="items-center border-black border-2 justify-center pl-64 " >
            <div className="  border-black border-2 h-96 w-72 mb-2">
              <img
                src={selectedImage} // Display selected image here
                alt={product.name}
                className="h-full border-blue-500 border-4 object-cover"
              />
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-5 border-black border-2 gap-2 mb-4">
              {product.imageUrls.map((img, index) => (
                <div
                  key={index}
                  className="h-20 p-1 gap-3  cursor-pointer"
                  onClick={() => setSelectedImage(img)} // Update the main image on click
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full border-black border-2 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Ingredient and How to Use Buttons */}
          <div className="flex border-black border-2 justify-between">
            <button
              onClick={() => setShowIngredients(!showIngredients)}
              className="bg-gray-200 p-2 border-black border-2 rounded"
            >
              Ingredients
            </button>
            <button
              onClick={() => setShowHowToUse(!showHowToUse)}
              className="bg-gray-200 p-2 border-black border-2 rounded"
            >
              How to Use
            </button>
          </div>

          {/* Displaying Ingredients or How to Use */}
          {showIngredients && (
            <ul className="mt-2 border-black border-2">
              {product.ingridients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          )}
          {showHowToUse && (
            <ul className="mt-2 border-black border-2">
              {product.howtouse.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Section */}
        <div className="w-1/3 p-4 flex border-black border-2 flex-col">
          <h2 className="text-2xl  border-black border-2 font-bold">
            {product.name}
          </h2>
          <h3 className="text-xl border-black border-2 pt-2 text-[#BFA181]">
            {product.price}
          </h3>

          {/* Quantity Section */}
          <div className="flex border-gray-300 border-2 w-fit items-center mt-4">
            <button
              onClick={handleDecrement}
              className=" p-2  rounded"
            >
              -
            </button>
            <span className="mx-4  text-lg">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className=" p-2 rounded"
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col gap-2">
        <HoverButton title="Add to Cart" link={`/cart/${product._id}`} />
        <HoverButton title="Buy Now" link={`/buy/${product._id}`} />
      </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;
