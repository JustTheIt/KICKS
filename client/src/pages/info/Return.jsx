import React from 'react'
import { FaLeaf, FaUndo, FaExclamationTriangle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const Return = () => {
  const returnPolicy = [
    {
      title: "30-Day Return Window",
      description: "You have 30 days from the delivery date to initiate a return for most items.",
      icon: <FaUndo className="text-2xl text-primary-sage" />
    },
    {
      title: "Product Condition",
      description: "Items must be unused, unopened, and in their original packaging with all seals intact.",
      icon: <FaCheckCircle className="text-2xl text-primary-sage" />
    },
    {
      title: "Return Shipping",
      description: "Return shipping costs are the responsibility of the customer unless the item was damaged or incorrect.",
      icon: <FaExclamationTriangle className="text-2xl text-primary-sage" />
    }
  ]

  const returnProcess = [
    {
      step: "1",
      title: "Initiate Return",
      description: "Contact our customer service team to initiate the return process. Please have your order number ready."
    },
    {
      step: "2",
      title: "Package Items",
      description: "Securely package the items in their original packaging. Include all original documentation and accessories."
    },
    {
      step: "3",
      title: "Ship Back",
      description: "Ship the package to our return address using a trackable shipping method. Keep the tracking number for your records."
    },
    {
      step: "4",
      title: "Refund Process",
      description: "Once we receive and inspect the items, we'll process your refund within 5-7 business days."
    }
  ]

  const nonReturnableItems = [
    "Opened or used products",
    "Products without original packaging",
    "Products purchased more than 30 days ago",
    "Products marked as 'Final Sale'",
    "Custom or personalized items"
  ]

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
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <FaLeaf className="text-primary-sage text-2xl" />
          <h1 className="font-heading font-semibold text-2xl text-text-primary">Return Policy</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-text-secondary mb-8">
            We want you to be completely satisfied with your purchase. Our return policy is designed to be fair and straightforward, ensuring a hassle-free experience if you need to return any items.
          </p>

          <h2 className="font-heading font-semibold text-xl text-primary-sage mt-8 mb-6">Return Policy Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {returnPolicy.map((policy, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-4">{policy.icon}</div>
                <h3 className="font-medium text-lg mb-2">{policy.title}</h3>
                <p className="text-text-secondary">{policy.description}</p>
              </div>
            ))}
          </div>

          <h2 className="font-heading font-semibold text-xl text-primary-sage mt-8 mb-6">Return Process</h2>
          <div className="space-y-6 mb-12">
            {returnProcess.map((process, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-sage/10 rounded-full flex items-center justify-center">
                    <span className="text-primary-sage font-medium">{process.step}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">{process.title}</h3>
                    <p className="text-text-secondary">{process.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FaTimesCircle className="text-primary-sage text-xl" />
                <h3 className="font-medium text-lg">Non-Returnable Items</h3>
              </div>
              <ul className="list-none space-y-2">
                {nonReturnableItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary-sage">•</span>
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-4">Refund Information</h3>
              <div className="space-y-4">
                {refundInfo.map((info, index) => (
                  <div key={index}>
                    <h4 className="font-medium mb-1">{info.title}</h4>
                    <p className="text-text-secondary">{info.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-neutral-cream p-6 rounded-lg mt-8">
            <h3 className="font-medium text-lg mb-4">Need Help with a Return?</h3>
            <p className="text-text-secondary">
              If you need assistance with a return or have any questions about our return policy, please contact our customer service team. We're here to help make the return process as smooth as possible for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Return 