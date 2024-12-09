/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import ProductCard from "./product";
import "./components.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CategoryRow = ({ categoryName, products, userId }) => {
  // Function to truncate product descriptions (if needed)
  // eslint-disable-next-line no-unused-vars
  const truncateContent = (content) => {
    return content?.split(" ").slice(0, 14).join(" ") + "...";
  };

  return (
    <div>
      {/* Category Title */}
      <div>
        <h2 className="text-[24px] text-center font-bold font-[Poppins] md:p-1">
          {categoryName}
        </h2>
      </div>

      {/* CTA Button */}
      <div className="text-center pb-2">
        <Link
          to={`/category/${categoryName}`}
          className="text-[#697586] font-[Poppins] text-[18px] text-center hover:text-[#F5A3B7]"
        >
          see all
        </Link>
      </div>

      {/* Swiper Component with Navigation and Pagination */}
      <Swiper
        modules={[Navigation, Pagination]} // Enable Navigation and Pagination modules
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: 1, // 1 slide on small screens
          },
          640: {
            slidesPerView: 2, // 2 slides on medium screens
          },
          768: {
            slidesPerView: 3, // 3 slides on larger screens
          },
          1024: {
            slidesPerView: 3, // 4 slides on desktop
          },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index} style={{ width: "auto" }}>
            <ProductCard product={product} userId={userId} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Divider */}
      <hr className="border-t border-gray-900 my-4" />
    </div>
  );
};

export default CategoryRow;
