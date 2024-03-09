import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Avatar, Logo } from '../assets';
import { isActiveStyles, isNotActiveStyles } from '../utils/styles';
import {setCartOn } from "../context/actions/displayCartAction"
import {motion} from "framer-motion";
import { buttonClcik, slideTop } from '../animations';
import { MdLogout, MdShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase.config';
import { setUserNull } from '../context/actions/userActions';
// import { signOut } from 'firebase/auth';


const Header = () => {
    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);

    const [isMenu, setIsMenu] = useState(false);
    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signOut = () => {
        firebaseAuth
        .signOut()
        .then(() => {
            dispatch(setUserNull());
            navigate("/login", {replace : true})
        })
        .catch((err) => console.log(err));
    };

  return <header className='fixed inset-x-0 top-0 z-50 flex items-center justify-between px-12 py-6 backdrop-blur-md md:px-20'>
    <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <img src={Logo} className="w-25"  alt="" />
    </NavLink>
    <nav className="flex items-center justify-center gap-8">
        <ul className="items-center justify-center hidden gap-16 md:flex"> 
            <NavLink className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles} to={"/"}>Home</NavLink>
            <NavLink className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles} to={"/bloge"}>Bloge</NavLink>
            <NavLink className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles} to={"/services"}>Service</NavLink>
            <NavLink className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles} to={"/Contact"}>Contact</NavLink>
        </ul>
        <motion.div {...buttonClcik} 
            onClick={() => dispatch(setCartOn())} 
            className='relative cursor-pointer'>
            <MdShoppingCart className="text-3xl text-textColor" />
            {cart?.length > 0 && (
                <div className="absolute flex items-center justify-center w-5 h-5 bg-red-500 rounded-full -top-3 -right-1">
                <p className="text-base font-semibold text-primary">{cart?.length}</p>
            </div>
            )}
        </motion.div>

        {user ? ( 
            <>
                <div className="relative cursor-pointer" 
                onMouseEnter={() => setIsMenu(true)}
                >
                    <div className="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full shadow-lg cursor-pointer">
                    <motion.img className="object-cover w-full h-full" src={user?.picture ? user?.picture : Avatar} whileHover={{scale : 1.15 }} referrerPolicy="no-referrer" />
                    </div>

                {isMenu && (
                    <motion.div 
                        onMouseLeave={() => setIsMenu(false)} 
                        {...slideTop}
                        className="px-6 py-4 w-48 bg-[rgba(256,256,256,0.4)] backdrop-blur-md rounded-md shadow-lg absolute top-12 right-0 flex flex-col gap-4 ">
                        
                        {user?.user_id === process.env.REACT_APP_ADMIN_ID && (
                            <Link 
                            className="text-xl hover:text-red-500 text-textColor" 
                            to={"/Dashboard/home"} > 
                            Dashboard
                            </Link>
                        )}
                        
                        <Link className="text-xl hover:text-red-500 text-textColor" to={"/Profile"} > 
                            Update Profile
                        </Link>
                        <Link className="text-xl hover:text-red-500 text-textColor" to={"/user-orders"} > 
                            Orders
                        </Link>
                        <hr />
                    <motion.div {...buttonClcik} 
                    onClick={signOut}
                    className="flex items-center justify-center gap-3 px-3 py-2 bg-gray-100 rounded-md shadow-md group hover:bg-gray-200 ">
                        <MdLogout className="text-2xl text-textColor group-hover::text-headingColor" />
                        <p 
                            className="text-xl text-textColor group-hover:text-headingColor"
                            >
                            Sign Out
                        </p>
                    </motion.div>
                </motion.div>
                )}

                </div>
            </> 
        ) : ( 
            <>
            <NavLink to={"/login"}>
                <motion.button {...buttonClcik} className="px-4 py-2 rounded-md shadow-lg bg-[rgba(256,256,256,0.4)] border border-red-300 cursor-pointer">
                    Login
                </motion.button>
            </NavLink>
        </>
        )}
    </nav>
  </header>
}

export default Header;
