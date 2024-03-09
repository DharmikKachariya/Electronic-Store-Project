import React, { useEffect, useState } from 'react';
import {motion} from "framer-motion";
import { buttonClcik, slideIn, staggerFadeInOut } from '../animations';
import { BiChevronsRight, FcClearFilters, HiCurrencyRupee } from '../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setCartOff } from '../context/actions/displayCartAction';
import { alertNULL, alertSuccess } from '../context/actions/alertAction';
import { baseURL, getAllCartItems, increaseItemQuantity } from '../api';
import { setCartItems } from '../context/actions/cartAction';
import axios from 'axios';

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let tot = 0;
        if (cart) {
          cart.map((data) => {
            tot = tot + data.product_price * data.quantity;
            setTotal(tot);
          });
        }
      }, [cart]);

      const handleCheckOut = () => {
        const data = {
          user: user,
          cart: cart,
          total: total,
        };
        axios
          .post(`${baseURL}/api/products/create-checkout-session`, { data })
          .then((res) => {
            if (res.data.url) {
              window.location.href = res.data.url;
            }
          })
          .catch((err) => console.log(err));
      };

  return (
    <motion.div {...slideIn} className="fixed z-50 top-0 right-0 w-300 md:w-[540px] bg-[rgba(256,256,256,0.4)] backdrop-blur-md shadow-md h-screen overflow-scroll scrollbar-none">
        <div className="flex items-center justify-between w-full px-6 py-4 pb-12">
        <motion.i
          {...buttonClcik}
          className="cursor-pointer"
          onClick={() => dispatch(setCartOff())}
        >
          <BiChevronsRight className="text-[50px] text-textColor" />
        </motion.i>
        <p className="text-2xl font-semibold text-headingColor">Your Cart</p>
        <motion.i {...buttonClcik} className="cursor-pointer">
          <FcClearFilters className="text-[30px] text-textColor" />
        </motion.i>
      </div>

      <div className="relative flex flex-col items-start justify-start flex-1 py-6 h-[92%] rounded-t-3xl bg-zinc-900">
      {cart && cart?.length > 0 ? ( 
      <>
        <div className="flex flex-col items-start justify-start w-full h-full gap-3 px-4 overflow-y-scroll scrollbar-none">
        {cart &&
                cart?.length > 0 &&
                cart?.map((item, i) => (
                  <CartItemCard key={i} index={i} data={item} />
                ))}
        </div>
        <div className="bg-zinc-800 rounded-t-[60px] w-full h-[35%] flex flex-col items-center justify-center px-4 py-6 gap-24">
      <div className="flex items-center w-full justify-evenly">
            <p className="text-3xl font-semibold text-zinc-500">Total</p>
            <p className="flex items-center justify-center gap-1 text-3xl font-semibold text-orange-500">
                 <HiCurrencyRupee className="text-primary" />{total}
                 
            </p>
        </div>

        <motion.button
                {...buttonClcik}
                className="bg-blue-400 w-[70%] px-4 py-3 text-xl text-white font-semibold hover:bg-blue-500 drop-shadow-md rounded-2xl"
                onClick={handleCheckOut}
              >
                Check Out
              </motion.button>
      </div>
      </>
      ) : (
        <>
            <h1 className="text-3xl font-bold text-primary">Empty Cart</h1>
        </> 
        )}
      </div>

      
    </motion.div>
  );
}

export const CartItemCard = ({ index, data }) => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const [itemTotal, setItemTotal] = useState(0);
    const dispatch = useDispatch();


    const decrementCart = (product_Id) => {
        dispatch(alertSuccess("Updated the cartProduct"));
        increaseItemQuantity(user?.user_id, product_Id, "decrement").then((data) => {
          getAllCartItems(user?.user_id).then((items) => {
            dispatch(setCartItems(items));
            dispatch(alertNULL());
          });
        });
    };


    const incrementCart = (product_Id) => {
        dispatch(alertSuccess("Updated the cartProduct"));
        increaseItemQuantity(user?.user_id, product_Id, "increment").then((data) => {
          getAllCartItems(user?.user_id).then((items) => {
            dispatch(setCartItems(items));
            dispatch(alertNULL());
          });
        });
    };

    useEffect(() => {
        setItemTotal(data.product_price * data.quantity);
      }, [itemTotal, cart]);

    return (
        <motion.div
          key={index}
          {...staggerFadeInOut(index)}
          className="flex items-center justify-start w-full gap-4 px-4 rounded-lg bg-zinc-800 drop-shadow-lg"
        >
        <img
            src={data?.imageURL}
            className=" w-24 min-w-[94px] h-24 object-contain"
            alt=""
        />
        <div className="flex items-center justify-start w-full gap-1">
        <p className="text-lg font-semibold text-primary">
          {data?.product_name}
          <span className="block text-sm text-gray-400 capitalize">
            {data?.product_category}
          </span>
        </p>
        <p className="flex items-center justify-center gap-1 ml-auto font-semibold text-red-400 text-md">
            <HiCurrencyRupee className="text-red-400" /> {itemTotal}
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 ml-auto">
        <motion.div
          {...buttonClcik}
          onClick={() => decrementCart(data?.product_Id)}
          className="flex items-center justify-center w-8 h-8 rounded-md cursor-pointer drop-shadow-md bg-zinc-900"
        >
          <p className="text-xl font-semibold text-primary">--</p>
        </motion.div>
        <p className="text-lg font-semibold text-primary">{data?.quantity}</p>
        <motion.div
          {...buttonClcik}
          className="flex items-center justify-center w-8 h-8 rounded-md cursor-pointer drop-shadow-md bg-zinc-900"
          onClick={() => incrementCart(data?.product_Id)}
        >
          <p className="text-xl font-semibold text-primary">+</p>
        </motion.div>
      </div>

    </motion.div>
    );
};

export default Cart;
