import React, { useState } from 'react';
import {motion} from "framer-motion";
import { useSelector } from 'react-redux';
import { staggerFadeInOut } from '../animations';
import { statuses } from '../utils/styles';
import { IoBasket } from 'react-icons/io5';
import { SliderCard } from '../components';

const FilterSection = () => {
    const [category, setCategory] = useState("iPhone");
    const products = useSelector((state) => state.products);

  return (
    <motion.div className="w-full flex items-start justify-start flex-col">
     <div className=" w-full flex items-center justify-between ">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-2xl text-headingColor font-bold">
          What Are You Shopping for Today?
          </p>
          <div className="w-40 h-1 rounded-md bg-blue-500"></div>
        </div>
      </div>


    <div className="w-full pt-6 flex items-center justify-center gap-6 py-8">
    {statuses &&
          statuses.map((data, i) => (
            <FilterCard
              data={data}
              category={category}
              setCategory={setCategory}
              index={i}
            />
          ))}
    </div>

    <div className=" w-full flex items-center justify-evenly flex-wrap gap-4 mt-12 ">
        {products &&
          products
            .filter((data) => data.product_category === category)
            .map((data, i) => <SliderCard key={i} data={data} index={i} />)}
      </div>
   </motion.div>
  );
}

export const FilterCard = ({data, index, category, setCategory}) => {
    return (

        <motion.div
        key={index}
        {...staggerFadeInOut(index)}
        onClick={() => setCategory(data.category)}
        className={`group w-28 min-w-[128px] cursor-pointer rounded-2xl  py-6 ${
          category === data.category ? "bg-blue-500" : "bg-primary"
        } hover:bg-blue-500 shadow-md flex flex-col items-center justify-center gap-4`}
      >
        <div
          className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center group-hover:bg-primary ${
            category === data.category ? "bg-primary" : "bg-blue-500"
          }`}
        >
          <IoBasket
            className={`${
              category === data.category ? "text-blue-500" : "text-primary"
            } group-hover:text-blue-500 text-2xl`}
          />
        </div>
        <p
          className={`text-xl font-semibold ${
            category === data.category ? "text-primary" : "text-textColor"
          } group-hover:text-primary`}
        >
          {data.title}
        </p>
      </motion.div>
    )
}

export default FilterSection;
