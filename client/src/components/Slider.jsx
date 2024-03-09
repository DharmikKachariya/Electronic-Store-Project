import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import { SliderCard } from "../components";


const Slider = () => {
  const products = useSelector((state) => state.products);
  const [iPhone, setIphone] = useState(null);
  useEffect(() => {
    setIphone(products?.filter((data) => data.product_category === "iPhone"));
    console.log(iPhone);
  }, [products]);

  return (
    <div className="w-full pt-24">
      <Swiper
        slidesPerView={3}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        className="mySwiper"
      >
        {iPhone && iPhone.map((data,i) => (
            <SwiperSlide key={i}>
                <SliderCard key={i} data={data} index={i}/>
            </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
