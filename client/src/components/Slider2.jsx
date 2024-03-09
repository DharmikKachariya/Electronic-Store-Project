import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import { SliderCard } from "../components";


const Slider = () => {
  const products = useSelector((state) => state.products);
  const [Leptop, setLeptop] = useState(null);
  const [Airbird, setAirbird] = useState(null);
  const [Camera, setCamera] = useState(null);
  const [Android, setAndroid] = useState(null);
  useEffect(() => {
    setLeptop(products?.filter((data) => data.product_category === "Leptop"));
    setAirbird(products?.filter((data) => data.product_category === "Airbird"));
    setCamera(products?.filter((data) => data.product_category === "Camera"));
    setAndroid(products?.filter((data) => data.product_category === "Android"));
    console.log(products);
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
        {products && products.map((data,i) => (
            <SwiperSlide key={i}>
                <SliderCard key={i} data={data} index={i}/>
            </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
