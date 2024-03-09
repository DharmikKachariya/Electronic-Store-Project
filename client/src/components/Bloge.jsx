import React from 'react';
import {motion } from "framer-motion";
import { blog1, blog2, blog3 } from '../assets';


const Bloge = () => {
    const Blogdata = [
        {
            title: "How to choose perfect smartwatch",
            subtitle: "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae...",
            published: "Jan 20, 2024 by Dilshad",
            image: blog1,
        },
        {
            title: "How to choose perfect gadget",
            subtitle: "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae...",
            published: "Jan 20, 2024 by Satya",
            image: blog2,
        },
        {
            title: "Jan 20, 2024 by Sabir",
            subtitle: "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae...",
            published: "How to choose perfect VR headset",
            image: blog3,
        },
    ]
  return (
    <motion.div className="flex flex-col items-start justify-start w-full">
     <div className="flex items-center justify-between w-full ">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-2xl font-bold text-headingColor">
          Recent News
          </p>
          <div className="w-40 h-1 bg-blue-500 rounded-md"></div>
        </div>
      </div>

      {/* body section */}
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3 gap-y-8 sm:gap-4 md:gap-7">
            {/* body card */}
            {Blogdata.map((data) => (
              <div key={data.title} >
                {/* image */}
                <div className="mb-2 overflow-hidden rounded-2xl hover:shadow-lg">
                    <img src={data.image} alt="" className="w-full  h-[220px] object-cover rounded-2xl hover:scale-105 duration-500  " />
                </div>
                {/* curent section */}
                <div className="space-y-2 ">
                    <p className="text-xs text-gray-500">{data.published}</p>
                    <p className="font-bold line-clamp-1">{data.title}</p>
                    <p className="text-sm text-gray-600 line-clamp-2 dark:text-gray-400">{data.subtitle}</p>
                </div>
              </div>  
            ))}
      </div>
   </motion.div>
    
   
  )
}

export default Bloge;