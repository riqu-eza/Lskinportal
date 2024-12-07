/* eslint-disable react/prop-types */
import ProductCard from "./product";
import "./components.css";
import Ctabutton from "../ux/ctabutton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const CategoryRow = ({ categoryName, products, userId }) => {
  return (
    <div className="">
      <div>
      <h2 className="text-[24px] text-center font-bold font-[Poppins]  md:p-1 ">
      
      {categoryName} 
      </h2>
      </div>
      <div className="text-center pb-2 ">
        <Ctabutton
          text={`see all `}
          link={`/category/${categoryName}`}
          userId={userId}
        />
      </div>

      <Swiper spaceBetween={10} slidesPerView={"auto"} >
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
