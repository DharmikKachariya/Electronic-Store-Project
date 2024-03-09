import React from 'react';
import {motion } from "framer-motion";
import { credit, help, worldwide } from '../assets';


const Services = () => {
  return (
    <div>
        <motion.div className="flex flex-col items-start justify-start w-full">
            <div className="flex items-center justify-between w-full ">
                    <div className="flex flex-col items-start justify-start gap-1">
                    <p className="text-2xl font-bold text-headingColor">
                        Our Services
                    </p>
                    <div className="w-40 h-1 bg-blue-500 rounded-md"></div>
                </div>
            </div>
        
        <div className="grid items-center justify-center w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            <div className="mt-6 backdrop-blur-md rounded-xl flex items-center justify-between relative px-6 py-4 w-full overflow-hidden md:w-[328px] md:min-w-328 gap-2">
                {/* image section 1 */}
                <img src={worldwide} className="w-12" alt="" />
                <div className="relative left-3">
                    <p className="mt-4 text-xl font-semibold">Worldwide Delivery</p>
                    <p className="">200 countries and regions worldwide</p>
                </div>
            </div>
            <div className="mt-6 backdrop-blur-md rounded-xl flex items-center justify-between relative px-6 py-4 w-full overflow-hidden md:w-[328px] md:min-w-328 gap-2">
                {/* image section 1 */}
                <img src={help} className="w-12" alt="" />
                <div className="relative left-3">
                    <p className="mt-4 text-xl font-semibold">24/7 Help Center</p>
                    <p className="">We'll respond to you within 24 hours</p>
                </div>
            </div>
            <div className="mt-6 backdrop-blur-md rounded-xl flex items-center justify-between relative px-6 py-4 w-full overflow-hidden md:w-[328px] md:min-w-328 gap-2">
                {/* image section 1 */}
                <img src={credit} className="w-12" alt="" />
                <div className="relative left-3">
                    <p className="mt-4 text-xl font-semibold">60-day Return Policy</p>
                    <p className="">Merchandise must be returned within 60 days.</p>
                </div>
            </div>
            <div className="mt-6 backdrop-blur-md rounded-xl flex items-center justify-between relative px-6 py-4 w-full overflow-hidden md:w-[328px] md:min-w-328 gap-2">
                {/* image section 1 */}
                <img src={worldwide} className="w-12" alt="" />
                <div className="relative left-3">
                    <p className="mt-4 text-xl font-semibold">Worldwide Delivery</p>
                    <p className="">200 countries and regions worldwide</p>
                </div>
            </div>
        </div>
        
      </motion.div>
    </div>
  )
}

export default Services