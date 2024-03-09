import React from 'react';
import { motion } from "framer-motion";
import { Slider2 } from '../components';

const HomeSLider = () => {
  return (
   <motion.div className="w-full flex items-start justify-start flex-col">
     <div className=" w-full flex items-center justify-between ">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-2xl text-headingColor font-bold">
          You Might Also Like
          </p>
          <div className="w-40 h-1 rounded-md bg-blue-500"></div>
        </div>
      </div>

      <Slider2 />
   </motion.div>
  );
}

export default HomeSLider;
