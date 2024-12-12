/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import ProductCard from "./product";
import "./components.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CategoryRow = ({ categoryName, products, userId }) => {
  // eslint-disable-next-line no-unused-vars
  const truncateContent = (content) => {
    return content?.split(" ").slice(0, 14).join(" ") + "...";
  };

  return (
    <div>
      <div>
        <h2 className="text-[24px] text-center font-bold font-[Poppins] md:p-1">
          {categoryName}
        </h2>
      </div>

      <div className="text-center pb-2">
        <Link
          to={`/category/${categoryName}`}
          className="text-[#697586] font-[Poppins] text-[18px] text-center hover:text-[#F5A3B7]"
        >
          see all
        </Link>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index} style={{ width: "auto" }}>
            <ProductCard product={product} userId={userId} />
          </SwiperSlide>
        ))}
      </Swiper>

      <hr className="border-t border-gray-900 my-4" />
    </div>
  );
};

export default CategoryRow;