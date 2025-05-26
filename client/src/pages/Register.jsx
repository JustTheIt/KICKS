import React from 'react';
import { FaRegEyeSlash, FaRegEye, FaUserPlus } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import ShoeImage from '../assets/1.png';

const allowedDomains = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'protonmail.com',
  'zoho.com',
  'aol.com',
  'mail.com',
  // Add more as needed
];

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Full name is required')
    .min(3, 'Full name must be at least 3 characters')
    .max(50, 'Full name must be at most 50 characters')
    .matches(/^[A-Za-z\s]+$/, 'Full name can only contain letters and spaces')
    .test(
      'no-leading-trailing-spaces',
      'Full name cannot have leading or trailing spaces',
      value => value && value.trim() === value
    )
    .test(
      'at-least-two-words',
      'Full name must contain at least two words',
      value => value && value.trim().split(/\s+/).length >= 2
    ),
  email: Yup.string()
    .required('Email is required')
    .test(
      'includes-at',
      'Email must include "@" symbol',
      value => value && value.includes('@')
    )
    .test(
      'ends-with-com',
      'Email must end with ".com"',
      value => value && value.endsWith('.com')
    )
    .test(
      'allowed-domain',
      'Email domain is not supported',
      value => {
        if (!value) return false;
        const domain = value.split('@')[1];
        return allowedDomains.includes(domain);
      }
    )
    .email('Invalid email address'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must include at least one uppercase letter')
    .matches(/[a-z]/, 'Must include at least one lowercase letter')
    .matches(/[0-9]/, 'Must include at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must include at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  mobile: Yup.string()
    .matches(/^(98|97)\d{8}$/, 'Phone number must be a valid 10-digit Nepali number')
    .required('Phone number is required'),
  referral: Yup.string()
    .matches(/^$|^[A-Za-z0-9]{6}$/, 'Referral code must be exactly 6 alphanumeric characters')
});

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

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
            >
              <img src={ShoeImage} alt="Shoe" className="w-full h-full object-contain" />
            </motion.div>
          ))}
        </motion.div>

        {/* Center floating shoe */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 opacity-10"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.5 8.5c0-1.1-.9-2-2-2h-3c-.6 0-1.1.3-1.4.8l-1.1 1.7c-.3.5-.8.8-1.4.8H8c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2v-6c0-.3-.1-.6-.2-.9l-1.3-2.6zM8 16.5v-6h3.6l1.1-1.7c.3-.5.8-.8 1.4-.8h3c.3 0 .5.2.5.5v8c0 .3-.2.5-.5.5H8z"/>
          </svg>
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
                Create Account
              </motion.h2>
              <motion.p
                className="text-text-secondary text-center mt-2"
                variants={itemVariants}
              >
                Step into our community
              </motion.p>
            </motion.div>

          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              mobile: '',
              referral: ''
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm, setStatus }) => {
              setStatus(undefined);
              try {
                const response = await Axios({
                  ...SummaryApi.register,
                  data: {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    mobile: values.mobile,
                    referral: values.referral || undefined
                  }
                });

                if (response.data.error) {
                  toast.error(response.data.message);
                  setStatus({ error: response.data.message });
                }

                if (response.data.success) {
                  toast.success(response.data.message);
                  setStatus({ success: 'Registration successful!' });
                  resetForm();
                  navigate('/login');
                }
              } catch (error) {
                AxiosToastError(error);
                setStatus({ error: 'Registration failed. Please try again.' });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, status, touched, errors }) => (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Form className="space-y-6">
                    <motion.div
                      className="space-y-2"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <label htmlFor="name" className="block text-sm font-medium text-text-primary">
                        Full Name
                      </label>
                  <Field
                        type="text"
                        id="name"
                        name="name"
                        className={`w-full px-4 py-3 rounded-xl bg-white/50 border ${
                          touched.name && errors.name ? 'border-red-500' : 'border-white/20'
                        } focus:border-primary-sage focus:ring-2 focus:ring-primary-sage/20 outline-none transition-all duration-300`}
                        placeholder="Enter your full name"
                      />
                      <AnimatePresence>
                        {touched.name && errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-500 text-xs mt-1"
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                        Email
                      </label>
                  <Field
                        type="email"
                        id="email"
                        name="email"
                        className={`w-full px-4 py-3 rounded-xl bg-white/50 border ${
                          touched.email && errors.email ? 'border-red-500' : 'border-white/20'
                        } focus:border-primary-sage focus:ring-2 focus:ring-primary-sage/20 outline-none transition-all duration-300`}
                        placeholder="Enter your email"
                      />
                      <AnimatePresence>
                        {touched.email && errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-500 text-xs mt-1"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <label htmlFor="password" className="block text-sm font-medium text-text-primary">
                        Password
                      </label>
                      <div className="relative">
                    <Field
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          className={`w-full px-4 py-3 rounded-xl bg-white/50 border ${
                            touched.password && errors.password ? 'border-red-500' : 'border-white/20'
                          } focus:border-primary-sage focus:ring-2 focus:ring-primary-sage/20 outline-none transition-all duration-300`}
                          placeholder="Create a password"
                        />
                        <motion.button
                      type="button"
                          onClick={() => setShowPassword(prev => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary-sage transition-colors"
                          whileHover={{ scale: 1.2, rotate: 180 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </motion.button>
                      </div>
                      <AnimatePresence>
                        {touched.password && errors.password && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-500 text-xs mt-1"
                          >
                            {errors.password}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary">
                        Confirm Password
                      </label>
                      <div className="relative">
                    <Field
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          className={`w-full px-4 py-3 rounded-xl bg-white/50 border ${
                            touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-white/20'
                          } focus:border-primary-sage focus:ring-2 focus:ring-primary-sage/20 outline-none transition-all duration-300`}
                          placeholder="Confirm your password"
                        />
                        <motion.button
                      type="button"
                          onClick={() => setShowConfirmPassword(prev => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary-sage transition-colors"
                          whileHover={{ scale: 1.2, rotate: 180 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </motion.button>
                      </div>
                      <AnimatePresence>
                        {touched.confirmPassword && errors.confirmPassword && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-500 text-xs mt-1"
                          >
                            {errors.confirmPassword}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <label htmlFor="mobile" className="block text-sm font-medium text-text-primary">
                        Phone Number
                      </label>
                  <Field
                        type="text"
                        id="mobile"
                        name="mobile"
                        className={`w-full px-4 py-3 rounded-xl bg-white/50 border ${
                          touched.mobile && errors.mobile ? 'border-red-500' : 'border-white/20'
                        } focus:border-primary-sage focus:ring-2 focus:ring-primary-sage/20 outline-none transition-all duration-300`}
                        placeholder="98XXXXXXXX"
                      />
                      <AnimatePresence>
                        {touched.mobile && errors.mobile && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-500 text-xs mt-1"
                          >
                            {errors.mobile}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <AnimatePresence>
                      {status && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className={`text-sm mt-2 ${
                            status.error ? 'text-red-500' : 'text-green-600'
                          }`}
                        >
                          {status.error || status.success}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                  disabled={isSubmitting}
                      className={`w-full py-3 rounded-xl text-white font-medium transition-all duration-300 ${
                        isSubmitting
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-gradient-to-r from-primary-sage to-primary-sage-dark hover:shadow-lg hover:shadow-primary-sage/20"
                      }`}
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                      <motion.div
                        animate={{ x: isSubmitting ? 5 : 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="flex items-center justify-center"
                      >
                        <FaUserPlus className="mr-2" />
                        {isSubmitting ? "Creating Account..." : "Create Account"}
                      </motion.div>
                    </motion.button>
              </Form>
                </motion.div>
            )}
          </Formik>

            <motion.p
              className="text-center mt-8 text-text-secondary"
              variants={itemVariants}
            >
              Already have an account?{" "}
            <Link
                to="/login"
                className="font-medium text-primary-sage hover:text-primary-sage-dark hover:underline transition-colors"
            >
              Login here
            </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;