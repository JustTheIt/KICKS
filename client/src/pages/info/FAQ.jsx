import React, { useState } from 'react'
import { FaLeaf, FaChevronDown, FaChevronUp } from 'react-icons/fa'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqCategories = [
    {
      title: "General Questions",
      questions: [
        {
          question: "What is herbal medicine?",
          answer: "Herbal medicine is the use of plants and plant extracts for medicinal purposes. It's one of the oldest forms of medicine, with roots in traditional healing practices from around the world. Our products are carefully selected and processed to maintain their natural healing properties."
        },
        {
          question: "Are your products organic?",
          answer: "Yes, we source our herbs from certified organic farms whenever possible. All our products are clearly labeled with their organic certification status. We believe in providing the purest, most natural products for our customers."
        },
        {
          question: "How do I choose the right herbal product?",
          answer: "We recommend consulting with a healthcare professional before starting any herbal regimen. Our product descriptions include detailed information about each herb's traditional uses and benefits. You can also contact our customer service team for personalized recommendations."
        }
      ]
    },
    {
      title: "Ordering & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping typically takes 5-7 business days. Express shipping (2-3 business days) is available for an additional fee. International shipping times vary by location. You can track your order status through your account dashboard."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to select international destinations. Shipping rates and delivery times vary by location. Some products may have shipping restrictions due to local regulations. Please check our shipping policy for more details."
        },
        {
          question: "What if my order is damaged?",
          answer: "If you receive a damaged order, please contact our customer service team within 48 hours of delivery. We'll arrange a replacement or refund. Please include photos of the damaged items in your message."
        }
      ]
    },
    {
      title: "Product Information",
      questions: [
        {
          question: "How should I store herbal products?",
          answer: "Most herbal products should be stored in a cool, dry place away from direct sunlight. Some products may require refrigeration - this will be clearly indicated on the packaging. Always check the storage instructions on the product label."
        },
        {
          question: "What is the shelf life of your products?",
          answer: "Shelf life varies by product and is clearly indicated on each item's packaging. Generally, our products have a shelf life of 1-2 years when stored properly. We recommend using products before their expiration date for maximum potency."
        },
        {
          question: "Are your products safe to use with medications?",
          answer: "Some herbs may interact with medications. We strongly recommend consulting with your healthcare provider before using any herbal products, especially if you're taking prescription medications or have existing health conditions."
        }
      ]
    },
    {
      title: "Returns & Refunds",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We accept returns within 30 days of delivery for unopened, unused products in their original packaging. Please review our return policy for complete details and exceptions."
        },
        {
          question: "How long do refunds take?",
          answer: "Refunds are typically processed within 5-7 business days after we receive the returned items. The refund will be issued to your original payment method."
        },
        {
          question: "Do I need to pay for return shipping?",
          answer: "Return shipping costs are the customer's responsibility unless the item was damaged or incorrect. We provide a return shipping label for damaged or incorrect items."
        }
      ]
    }
  ]

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <FaLeaf className="text-primary-sage text-2xl" />
          <h1 className="font-heading font-semibold text-2xl text-text-primary">Frequently Asked Questions</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-text-secondary mb-8">
            Find answers to common questions about our products, ordering process, shipping, and more. If you don't see your question answered here, please don't hesitate to contact our customer service team.
          </p>

          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-sm">
                <h2 className="font-heading font-semibold text-xl text-primary-sage p-6 border-b">
                  {category.title}
                </h2>
                <div className="divide-y">
                  {category.questions.map((item, index) => {
                    const isOpen = openIndex === `${categoryIndex}-${index}`
                    return (
                      <div key={index} className="p-6">
                        <button
                          onClick={() => toggleQuestion(`${categoryIndex}-${index}`)}
                          className="w-full flex items-center justify-between text-left"
                        >
                          <h3 className="font-medium text-lg pr-4">{item.question}</h3>
                          {isOpen ? (
                            <FaChevronUp className="text-primary-sage flex-shrink-0" />
                          ) : (
                            <FaChevronDown className="text-primary-sage flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="mt-4 text-text-secondary">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-neutral-cream p-6 rounded-lg mt-8">
            <h3 className="font-medium text-lg mb-4">Still Have Questions?</h3>
            <p className="text-text-secondary">
              If you couldn't find the answer you were looking for, our customer service team is here to help. Contact us through our contact form or email us at support@herbalmedicine.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ 