import React, { useState, useEffect } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { TbLogin2 } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import Logo from '../components/Logo';
import ShoeImage from '../assets/1.png';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => ({
            ...preve,
            [name]: value
        }));
    };

    const valideValue = Object.values(data).every(el => el);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await Axios({
                ...SummaryApi.login,
                data: data
            });
            
            if(response.data.error){
                toast.error(response.data.message);
            }

            if(response.data.success){
                toast.success(response.data.message);
                localStorage.setItem('accesstoken', response.data.data.accesstoken);
                localStorage.setItem('refreshToken', response.data.data.refreshToken);

                const userDetails = await fetchUserDetails();
                dispatch(setUserDetails(userDetails.data));

                setData({
                    email: "",
                    password: "",
                });
                navigate("/");
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-neutral-cream via-primary-sage/20 to-neutral-cream-dark relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Left side hanging shoes */}
                <motion.div
                    className="absolute left-[10%] top-0 flex flex-col items-center gap-6 w-60 h-60 opacity-80 filter invert"
                    initial={{ y: -600 }}
                    animate={{ y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        delay: 0.2
                    }}
                >
                    {/* Rope */}
                    <div className="w-1.5 h-32 bg-gradient-to-b from-primary-sage/90 to-transparent" />
                    
                    {/* Shoes */}
                    {[1, 2, 3, 4].map((index) => (
                        <motion.div
                            key={index}
                            className="w-32 h-32 opacity-20"
                            initial={{ rotate: -15, y: -20 }}
                            animate={{ 
                                rotate: [-15, 15, -15],
                                y: [0, 10, 0]
                            }}
                            transition={{
                                duration: 4 + index,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            whileHover={{ rotate: [-15, 15], x: [-5, 5] }}
                        >
                            <img src={ShoeImage} alt="Shoe" className="w-full h-full object-contain" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Right side hanging shoes */}
                <motion.div
                    className="absolute right-[10%] top-0 flex flex-col items-center gap-6 w-60 h-60 opacity-80 filter invert"
                    initial={{ y: -600 }}
                    animate={{ y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        delay: 0.4
                    }}
                >
                    {/* Rope */}
                    <div className="w-1.5 h-32 bg-gradient-to-b from-primary-sage/90 to-transparent" />
                    
                    {/* Shoes */}
                    {[1, 2, 3, 4].map((index) => (
                        <motion.div
                            key={index}
                            className="w-32 h-32 opacity-20"
                            initial={{ rotate: 15, y: -20 }}
                            animate={{ 
                                rotate: [15, -15, 15],
                                y: [0, 10, 0]
                            }}
                            transition={{
                                duration: 4 + index,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            whileHover={{ rotate: [15, -15], x: [5, -5] }}
                        >
                            <img src={ShoeImage} alt="Shoe" className="w-full h-full object-contain" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Animated gradient orbs */}
                <motion.div
                    className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary-sage/30 to-transparent rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-primary-sage/30 to-transparent rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Shoe pattern background */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDIuMjA5IDEuNzkxIDQgNCA0czQtMS43OTEgNC00LTQtMS43OTEtNC00LTQtNC00IDEuNzkxLTQgNHoiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')]"></div>
                </div>
            </div>

            {/* Main content */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
                <motion.div
                    className="w-full max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl p-8 border border-white/20"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className="flex flex-col items-center mb-8"
                            variants={itemVariants}
                        >
                            <motion.div
                                whileHover={{
                                    scale: 1.1,
                                    rotate: [0, -5, 5, -5, 0],
                                    transition: { duration: 0.5 }
                                }}
                            >
                                <Logo className="mb-6 w-24 h-24" />
                            </motion.div>
                            <motion.h2
                                className="text-3xl font-bold bg-gradient-to-r from-primary-sage to-primary-sage-dark bg-clip-text text-transparent"
                                variants={itemVariants}
                            >
                                Welcome Back
                            </motion.h2>
                            <motion.p
                                className="text-text-secondary text-center mt-2"
                                variants={itemVariants}
                            >
                                Step into your account
                            </motion.p>
                        </motion.div>

                        <motion.form
                            className="space-y-6"
                            onSubmit={handleSubmit}
                            variants={itemVariants}
                        >
                            <motion.div
                                className="space-y-2"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/20 focus:border-primary-sage focus:ring-2 focus:ring-primary-sage/20 outline-none transition-all duration-300"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                className="space-y-2"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <label htmlFor="password" className="block text-sm font-medium text-text-primary">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/20 focus:border-primary-sage focus:ring-2 focus:ring-primary-sage/20 outline-none transition-all duration-300"
                                        placeholder="Enter your password"
                                    />
                                    <motion.button
                                        type="button"
                                        onClick={() => setShowPassword(preve => !preve)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary-sage transition-colors"
                                        whileHover={{ scale: 1.2, rotate: 180 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                    </motion.button>
                                </div>
                                <Link
                                    to="/forgot-password"
                                    className="block text-sm text-primary-sage hover:text-primary-sage-dark text-right mt-1 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </motion.div>

                            <motion.button
                                disabled={!valideValue}
                                className={`w-full py-3 rounded-xl text-white font-medium transition-all duration-300 ${
                                    valideValue
                                        ? "bg-gradient-to-r from-primary-sage to-primary-sage-dark hover:shadow-lg hover:shadow-primary-sage/20"
                                        : "bg-gray-300 cursor-not-allowed"
                                }`}
                                whileHover={valideValue ? { scale: 1.02 } : {}}
                                whileTap={valideValue ? { scale: 0.98 } : {}}
                                onHoverStart={() => setIsHovered(true)}
                                onHoverEnd={() => setIsHovered(false)}
                            >
                                <motion.div
                                    animate={{ x: isHovered ? 5 : 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    className="flex items-center justify-center"
                                >
                                    <TbLogin2 className="mr-2" />
                                    Sign In
                                </motion.div>
                            </motion.button>
                        </motion.form>

                        <motion.p
                            className="text-center mt-8 text-text-secondary"
                            variants={itemVariants}
                        >
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-medium text-primary-sage hover:text-primary-sage-dark hover:underline transition-colors"
                            >
                                Register here
                            </Link>
                        </motion.p>

                        {/* Back to Home Button */}
                        <motion.div variants={itemVariants} className="text-center mt-4">
                             <Link to="/" className="text-sm text-primary-sage hover:text-primary-sage-dark transition-colors">
                                 &larr; Back to Home
                             </Link>
                        </motion.div>

                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;