import React from 'react'
import { FaLeaf, FaTruck, FaBox, FaGlobe, FaExclamationTriangle } from 'react-icons/fa'

const Shipping = () => {
  const shippingMethods = [
    {
      title: "Standard Shipping",
      description: "Delivery within 5-7 business days",
      price: "Free on orders over $50",
      icon: <FaTruck className="text-2xl text-primary-sage" />
    },
    {
      title: "Express Shipping",
      description: "Delivery within 2-3 business days",
      price: "Additional $15",
      icon: <FaBox className="text-2xl text-primary-sage" />
    },
    {
      title: "International Shipping",
      description: "Delivery within 7-14 business days",
      price: "Varies by location",
      icon: <FaGlobe className="text-2xl text-primary-sage" />
    }
  ]

  const shippingInfo = [
    {
      title: "Processing Time",
      content: "Orders are typically processed within 1-2 business days. During peak seasons or sales, processing may take 2-3 business days."
    },
    {
      title: "Shipping Destinations",
      content: "We currently ship to all 50 US states and select international destinations. International shipping rates and delivery times vary by location."
    },
    {
      title: "Order Tracking",
      content: "Once your order ships, you'll receive a tracking number via email. You can track your package's status through our website or the carrier's tracking system."
    },
    {
      title: "Shipping Restrictions",
      content: "Some products may have shipping restrictions due to local regulations. We'll notify you if any items in your order cannot be shipped to your location."
    }
  ]

  const importantNotes = [
    "Orders placed after 2 PM EST will be processed the next business day",
    "Delivery times may be affected by weather conditions or carrier delays",
    "International orders may be subject to customs duties and taxes",
    "We recommend using a business address for faster delivery",
    "Signature may be required for orders over $200"
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <FaLeaf className="text-primary-sage text-2xl" />
          <h1 className="font-heading font-semibold text-2xl text-text-primary">Shipping Policy</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-text-secondary mb-8">
            We strive to provide reliable and efficient shipping services to ensure your herbal products reach you in perfect condition. Please review our shipping policy below for detailed information about our shipping methods, delivery times, and important considerations.
          </p>

          <h2 className="font-heading font-semibold text-xl text-primary-sage mt-8 mb-6">Shipping Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {shippingMethods.map((method, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-4">{method.icon}</div>
                <h3 className="font-medium text-lg mb-2">{method.title}</h3>
                <p className="text-text-secondary mb-2">{method.description}</p>
                <p className="font-medium text-primary-sage">{method.price}</p>
              </div>
            ))}
          </div>

          <h2 className="font-heading font-semibold text-xl text-primary-sage mt-8 mb-6">Shipping Information</h2>
          <div className="space-y-6 mb-12">
            {shippingInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-3">{info.title}</h3>
                <p className="text-text-secondary">{info.content}</p>
              </div>
            ))}
          </div>

          <div className="bg-neutral-cream p-6 rounded-lg mt-8">
            <div className="flex items-start gap-3">
              <FaExclamationTriangle className="text-primary-sage text-xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-lg mb-4">Important Notes</h3>
                <ul className="list-none space-y-2">
                  {importantNotes.map((note, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary-sage">•</span>
                      <span className="text-text-secondary">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-4">Need Help?</h3>
            <p className="text-text-secondary">
              If you have any questions about shipping or need assistance with your order, please don't hesitate to contact our customer service team. We're here to help ensure a smooth shipping experience for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shipping 