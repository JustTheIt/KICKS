import React from 'react';
import { 
  FaLeaf, 
  FaUndo, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaTimesCircle,
  FaHeadset,
  FaBoxOpen,
  FaShippingFast,
  FaMoneyBillWave
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Return = () => {
  const returnPolicy = [
    {
      title: "30-Day Return Window",
      description: "You have 30 days from the delivery date to initiate a return for most items.",
      icon: <FaUndo className="text-3xl text-emerald-600" />
    },
    {
      title: "Product Condition",
      description: "Items must be unused, unopened, and in their original packaging with all seals intact.",
      icon: <FaCheckCircle className="text-3xl text-emerald-600" />
    },
    {
      title: "Return Shipping",
      description: "Return shipping costs are the responsibility of the customer unless the item was damaged or incorrect.",
      icon: <FaExclamationTriangle className="text-3xl text-emerald-600" />
    }
  ];

  const returnProcess = [
    {
      step: "1",
      title: "Initiate Return",
      description: "Contact our customer service team to initiate the return process. Please have your order number ready.",
      icon: <FaHeadset className="text-xl text-emerald-600" />
    },
    {
      step: "2",
      title: "Package Items",
      description: "Securely package the items in their original packaging. Include all original documentation and accessories.",
      icon: <FaBoxOpen className="text-xl text-emerald-600" />
    },
    {
      step: "3",
      title: "Ship Back",
      description: "Ship the package to our return address using a trackable shipping method. Keep the tracking number for your records.",
      icon: <FaShippingFast className="text-xl text-emerald-600" />
    },
    {
      step: "4",
      title: "Refund Process",
      description: "Once we receive and inspect the items, we'll process your refund within 5-7 business days.",
      icon: <FaMoneyBillWave className="text-xl text-emerald-600" />
    }
  ];

  const nonReturnableItems = [
    "Opened or used products",
    "Products without original packaging",
    "Products purchased more than 30 days ago",
    "Products marked as 'Final Sale'",
    "Custom or personalized items"
  ];

  const refundInfo = [
    {
      title: "Refund Method",
      content: "Refunds will be issued to the original payment method used for the purchase."
    },
    {
      title: "Processing Time",
      content: "Refunds typically take 5-7 business days to appear in your account after we receive the returned items."
    },
    {
      title: "Partial Refunds",
      content: "If only part of your order is returned, you'll receive a partial refund for the returned items only."
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaLeaf className="text-emerald-600 text-3xl" />
            <h1 className="text-4xl font-bold text-gray-900">Return Policy</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We want you to be completely satisfied with your purchase. Our return policy is designed to be fair and straightforward.
          </p>
        </motion.div>

        {/* Policy Highlights */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {returnPolicy.map((policy, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full mb-6 mx-auto">
                {policy.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-900">{policy.title}</h3>
              <p className="text-gray-600 text-center">{policy.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Return Process */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-center mb-12 text-gray-900"
          >
            How to Return an Item
          </motion.h2>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {returnProcess.map((process, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-emerald-50 rounded-full">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">{process.step}</span>
                      {process.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">{process.title}</h3>
                    <p className="text-gray-600">{process.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Restrictions and Refunds */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <FaTimesCircle className="text-2xl text-red-500" />
              <h3 className="text-xl font-semibold text-gray-900">Non-Returnable Items</h3>
            </div>
            <ul className="space-y-3">
              {nonReturnableItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-6 text-gray-900">Refund Information</h3>
            <div className="space-y-6">
              {refundInfo.map((info, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-900 mb-2">{info.title}</h4>
                  <p className="text-gray-600">{info.content}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-emerald-50 to-blue-50 p-8 rounded-xl border border-gray-200"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help with a Return?</h3>
            <p className="text-gray-600 mb-6">
              Our customer service team is ready to assist you with any questions about returns or exchanges.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
            >
              Contact Customer Support
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Return;