import React, { useEffect, useState } from 'react';
import {LoginBg, Logo} from "../assets";
import { LoginInput } from '../components';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import {motion} from "framer-motion";
import { buttonClcik } from '../animations';
import { FcGoogle } from 'react-icons/fc';
import {useNavigate} from "react-router-dom";
import {getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {app} from "../config/firebase.config";
import { validateUserJWTToken } from '../api';
import { setUserDetails } from '../context/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { alertInfo, alertWarning } from '../context/actions/alertAction';

const Login = () => {

    const [userEmail, setuserEmail] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_password] = useState("");

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const user = useSelector((state) => state.user);
    const alert = useSelector((state) => state.alert);
    
    useEffect(() => {
        if(user){
            navigate("/", { replace: true });
        }
        
    }, [user]);



    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCred) => { 
            firebaseAuth.onAuthStateChanged((cred) => {
                if(cred){
                    cred.getIdToken().then((token) => {
                        validateUserJWTToken(token).then((data) => {
                            dispatch(setUserDetails(data));
                        });
                        navigate("/", {replace : true});
                    });
                }   
            });
        });
    };


    const signUpWithEmailAndPass = async () => {
        if(userEmail ==="" || password ==="" || confirm_password ===""){
            dispatch(alertInfo("Required Fields Should Not br Empty"));
        }else{
            if(password === confirm_password){
                setuserEmail("")
                setConfirm_password("")
                setPassword("")
                await createUserWithEmailAndPassword(
                    firebaseAuth,
                    userEmail, 
                    password
                    ).then((userCred) => {
                    firebaseAuth.onAuthStateChanged((cred) => {
                        if(cred){
                            cred.getIdToken().then((token) => {
                                validateUserJWTToken(token).then((data) => {
                                    dispatch(setUserDetails(data));
                                });
                            navigate("/", {replace : true});
                            });
                        }
                    });
                })
            }else{
            dispatch(alertWarning("Password Doesn't Match"));
            }
        }
    };


    
const signInWithEmailPass = async () => {
    if (userEmail !=="" && password !==""){
        await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCred) => {
            firebaseAuth.onAuthStateChanged((cred) => {
                if(cred){
                    cred.getIdToken().then((token) => {
                        validateUserJWTToken(token).then((data) => {
                            dispatch(setUserDetails(data));
                        });
                        navigate("/", {replace : true});
                    });
                }
            });
        });
    }else{
        dispatch(alertWarning("Error When Fields Are Empty"));
    }
};
 
  return (
    <div className="relative flex w-screen h-screen overflow-hidden">
    
      {/* background image */}
      <img src={LoginBg} className='absolute top-0 left-0 object-cover w-full h-full'  alt="" />

      {/* content Box */}
        <div className='flex flex-col items-center bg-[rgba(256,256,256,0.4)] w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6'>


            {/* top logo section */}
                <div className="flex items-center justify-start w-full gap-4">
                    <img src={Logo}  alt="" />
                </div>

            {/* welcome text */}
            <p className='text-3xl font-semibold text-headingColor'>Welcome Back</p>
            <p className='-mt-6 text-md'>{isSignup ? "Sign Up" : "Login"} with Following</p>

            {/* Input Section */}
            <div className='flex flex-col items-center justify-center w-full gap-6 px-4'>
                <LoginInput 
                    placeHolder={"Enter Your Email"} 
                    icon={<FaEnvelope className='text-xl text-textColor' />} 
                    inputState={userEmail} 
                    inputStateFunc={setuserEmail} 
                    type="email" 
                    isSignup={isSignup}
                />
                <LoginInput 
                    placeHolder={"Enter Paasword"} 
                    icon={<FaLock className='text-xl text-textColor' />} 
                    inputState={password} 
                    inputStateFunc={setPassword} 
                    type="password" 
                    isSignup={isSignup}
                />

                {isSignup && (
                    <LoginInput 
                    placeHolder={"Confirm Password"} 
                    icon={<FaLock className='text-xl text-textColor' />} 
                    inputState={confirm_password} 
                    inputStateFunc={setConfirm_password} 
                    type="password" 
                    isSignup={isSignup}
                />
                )}

                {!isSignup ? ( 
                    <p>
                        Doesn't Have an Account:{" "}
                        <motion.button {...buttonClcik} className="text-red-400 underline bg-transparent cursor-pointer" 
                        onClick={() => setIsSignup(true)}
                        >
                            Create one
                        </motion.button>
                    </p>
                    ) : ( 
                    <p>
                        Already Have an Account:{" "}
                        <motion.button {...buttonClcik} className="text-red-700 underline bg-transparent cursor-pointer"
                        onClick={() => setIsSignup(false)}
                        >
                            Sign-in here
                        </motion.button>
                    </p>
                    )}


                    {/* Button section */}
                   {isSignup ? ( 
                   <motion.button 
                    {...buttonClcik} 
                    className='w-full px-4 py-2 text-xl font-semibold text-white capitalize transition-all duration-150 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700'
                    onClick={signUpWithEmailAndPass}
                    >
                        Sign Up
                    </motion.button>
                    ) : (
                        <motion.button 
                        {...buttonClcik} 
                        onClick={signInWithEmailPass}
                        className='w-full px-4 py-2 text-xl font-semibold text-white capitalize transition-all duration-150 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700'>
                        Sign in 
                    </motion.button>
                    )}
            </div>

                    <div className='flex items-center justify-between gap-16'>
                        <div className='w-24 h-[2px] rounded-lg bg-white'></div>
                        <p className='font-semibold text-white'> or</p>
                        <div className='w-24 h-[2px] rounded-lg bg-white'></div>
                    </div>
                    <motion.div
                     {...buttonClcik} 
                     className='flex items-center justify-center px-20 py-2 bg-[rgba(256,256,256,0.4)] backdrop-blur-md cursor-pointer rounded-full gap-4' 
                     onClick={loginWithGoogle}
                     >
                        <FcGoogle className='text-3xl' />
                        <p className='text-base font-medium capitalize text-headingColor'>Signin with Google</p>
                    </motion.div>
        </div>
    </div>
  );
}

export default Login;
