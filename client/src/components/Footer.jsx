import React from 'react';
import { Logo } from '../assets';
import { RiMastercardFill } from "react-icons/ri";
import { SiVisa } from "react-icons/si";
import { FaCcPaypal, FaFacebookSquare, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";

const Footer = () => {
  return <div className="w-screen">
    <footer className="inset-x-0 z-50 flex items-center justify-between w-full px-12 py-6 backdrop-blur-md md:px-20 "> 
            <div to={"/"} className="flex flex-col items-start justify-center gap-5 w-[15%]">
                <img src={Logo} className='w-[120px]'  alt="" />
                    <ul class="font-medium text-lg">
                        <li class="mb-1">
                            <a href="#">Home</a>
                        </li>
                        <li class="mb-1">
                            <a href="#">Services</a>
                        </li>
                        <li class="mb-1">
                            <a href="#">contact</a>
                        </li>
                        <li class="mb-1">
                            <a href="#">About</a>
                        </li>
                    </ul>
            </div>
            <div className='flex flex-col items-start justify-center row-gap-1 w-[20%]'>
                <h2 class="mb-4 sm:text-[22px] text-[20px] font-semibold ">Customer Service </h2>
                    <ul class="font-medium ">
                        <li class="mb-1">
                            <a href="#">Help Center</a>
                        </li>
                        <li class="mb-1">
                            <a href="#">FAQ's</a>
                        </li>
                        <li class="mb-1">
                            <a href="#">Accessibility</a>
                        </li>
                        <li class="mb-1">
                            <a href="#">Feedback</a>
                        </li>
                        <li class="mb-1">
                            <a href="#">Size Guide</a>
                        </li>
                        <li class="mb-1">
                            <a href="#">Payment Method</a>
                        </li>
                    </ul>
            </div>
            <div className='flex flex-col items-start justify-center row-gap-1 w-[20%]'>
                <h2 class="mb-4 sm:text-[22px] text-[20px] font-semibold ">Get to Know Us</h2>
                    <ul class="font-medium ">
                        <li class="mb-1">
                            <a href="#">About Us</a>
                        </li>
                        <li class="mb-1">
                            <a href="#">News & Blog</a>
                        </li>
                        <li class="mb-1">
                            <a href="#">Careers</a>
                        </li>
                        <li class="mb-1">
                            <a href="#">Investors</a>
                        </li>
                        <li class="mb-1">
                            <a href="#">Contact Us</a>
                        </li>
                        <li class="mb-1">
                            <a href="#">Payment Method</a>
                        </li>
                    </ul>
            </div>
            <div className='flex flex-col items-start justify-center row-gap-1 w-[30%]'>
                <h2 class="mb-4 sm:text-[22px] text-[20px] font-semibold mt-0">Let's keep in touch</h2>
                <p class=" font-medium text-black/60">Get recommendations, tips, updates and more.</p>
                <div className='flex gap-4 my-2'> 
                    <input type="text" className='py-2 border-2 rounded-full px-7' placeholder='Enter your email address' />
                    <button className='text-white bg-purple-600 rounded-full py-2 px-5 text-[18px]'>Subscribe</button>
                </div>
                <div class=" font-medium">
                    <p className='mb-2'>Stay Connected</p>
                    <ul className='flex gap-8 text-xl'>
                        <li><a href="#"><FaTwitter /></a></li>
                        <li><a href="#"><FaFacebookSquare /></a></li>
                        <li><a href="#"><FaYoutube /></a></li>
                        <li><a href="#"><FaInstagram /></a></li>
                        <li><a href="#"><FaWhatsapp /></a></li>
                    </ul>
                </div>
            </div>
        </footer>
        <hr class="mt-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:mt-8 lg:mb-4" />
        <div className='flex items-center justify-between ml-20'>
            <div class="block">Copyright © 2024<a href=""> Electronic Shop ,</a>All right reserved.</div>
            <div>
                <ul className='flex justify-center mr-20'>
                    <li className='px-[8px]'><a href="" className='text-2xl'><AiFillBank /></a></li>
                    <li className='px-[8px]'><a href="" className='text-2xl'><SiVisa /></a></li>
                    <li className='px-[8px]'><a href="" className='text-2xl'><RiMastercardFill /></a></li>
                    <li className='px-[8px]'><a href="" className='text-2xl'><FaCcPaypal /></a></li>
                </ul>
            </div>
        </div>
  </div>
       
}


export default Footer;
