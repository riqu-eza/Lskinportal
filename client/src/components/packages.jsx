/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
// import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const Packages = ({ products }) => {
  // Ensure that products is defined and not empty
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No product data available.</p>;
  }

  // Assuming products is an array, map over the first product
  const product = products[0];

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row items-center gap-8 border border-black">
    {/* Left Section: Swiper Image Carousel */}
    <div className="w-full md:w-1/2 flex justify-center border border-black">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="rounded-lg shadow-lg w-full border border-black"
      >
        {product.imageUrls && product.imageUrls.length > 0 ? (
          product.imageUrls.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <img
                src={imageUrl}
                alt={`Product ${index}`}
                className="w-full h-64 object-cover rounded-lg border border-black"
              />
            </SwiperSlide>
          ))
        ) : (
          <p>No images available.</p>
        )}
      </Swiper>
    </div>
  
    {/* Right Section: Product Details */}
    <div className="w-full md:w-1/2 flex flex-col justify-center border p-1 border-black">
      {/* Product Name */}
      <h2 className="text-3xl font-medium font-[Poppins] m-1 leading-[54px]  text-[#383838] border border-black">{product.name}</h2>
  
      {/* Product Description */}
      <p className="text-[#697586] mb-4 border m-1 font-[Montserrat] font-[16px] border-black">{product.description}</p>
  
      {/* Ingredients */}
      {product.ingridients && product.ingridients.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {product.ingridients.map((item, index) => (
            <span
              key={index}
              className="bg-gray-200 text-[#383838] pont-[Poppins] text-sm px-2 py-1 rounded border border-black"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 border border-black">No ingredients listed.</p>
      )}
  
      {/* Product Price */}
      <div className="text-lg font-semibold text-gray-700 border gap-4 border-black">
        <Link to='/' >Shop now</Link>
        <Link to='/' > Explore more </Link>
      </div>
    </div>
  </div>
  
  );
};

export default Packages;


