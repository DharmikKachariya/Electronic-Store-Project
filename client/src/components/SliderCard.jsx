import React from 'react';
import { HiCurrencyRupee, IoBasket } from '../assets/icons';
import {motion} from "framer-motion"
import { buttonClcik } from '../animations';
import { addNewItemToCart, getAllCartItems } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { alertNULL, alertSuccess } from '../context/actions/alertAction';
import { setCartItems } from '../context/actions/cartAction';
 
const SliderCard = ({data, index}) => {

     const user = useSelector((state) => state.user);
     const dispatch = useDispatch();

     const sendToCart = () => {
          dispatch(alertSuccess("Added to the cart"));
          addNewItemToCart(user?.user_id, data).then((res) => {
            getAllCartItems(user?.user_id).then((items) => {
              dispatch(setCartItems(items));
            });
            setInterval(() => {
              dispatch(alertNULL());
            }, 3000);
          });
        };

  return (
    <div className="bg-[rgba(256,256,256,0.4)] hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative px-4 py-2 w-full overflow-hidden md:w-[385px] md:min-w-385 gap-2 ">
        <img src={data.imageURL} className="w-40 h-40 object-contain" alt="" />
        <div className="relative pt-12 ">
           <p className='text-lg text-textColor font-semibold'>
                {data.product_name}
           </p>
           <p className="text-lg font-semibold text-red-500 flex items-center justify-start gap-1">
                <HiCurrencyRupee className="text-red-500"/>{" "}{parseFloat(data.product_price).toFixed(2)}
           </p>
           <motion.div {...buttonClcik} 
           onClick={sendToCart}
           className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute top-2 right-3 cursor-pointer">
                <IoBasket className="text-2xl text-primary"/>
           </motion.div>
        </div>
    </div>
  );
}

export default SliderCard;
