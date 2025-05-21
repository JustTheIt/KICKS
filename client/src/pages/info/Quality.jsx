import React from 'react'
import { FaLeaf, FaCheckCircle, FaFlask, FaCertificate } from 'react-icons/fa'

const Quality = () => {
  const standards = [
    {
      title: "Sourcing Excellence",
      description: "We partner with certified organic farms and sustainable suppliers who share our commitment to quality and environmental responsibility.",
      icon: <FaLeaf className="text-2xl text-primary-sage" />
    },
    {
      title: "Rigorous Testing",
      description: "Every batch of herbs undergoes comprehensive testing for purity, potency, and safety in our state-of-the-art laboratory.",
      icon: <FaFlask className="text-2xl text-primary-sage" />
    },
    {
      title: "Quality Certifications",
      description: "Our products meet or exceed international quality standards and are certified by recognized regulatory bodies.",
      icon: <FaCertificate className="text-2xl text-primary-sage" />
    }
  ]

  const qualityProcess = [
    {
      step: "1",
      title: "Careful Selection",
      description: "We carefully select herbs based on their origin, growing conditions, and traditional use. Only the finest quality herbs make it to our collection."
    },
    {
      step: "2",
      title: "Laboratory Testing",
      description: "Each herb undergoes rigorous testing for:",
      items: [
        "Purity and authenticity",
        "Heavy metal content",
        "Pesticide residues",
        "Microbial contamination",
        "Active compound levels"
      ]
    },
    {
      step: "3",
      title: "Processing Standards",
      description: "Our herbs are processed using traditional methods combined with modern technology to preserve their natural properties while ensuring safety and consistency."
    },
    {
      step: "4",
      title: "Final Quality Check",
      description: "Before packaging, each product undergoes a final quality check to ensure it meets our high standards for appearance, aroma, and potency."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <FaLeaf className="text-primary-sage text-2xl" />
          <h1 className="font-heading font-semibold text-2xl text-text-primary">Quality Standards</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-text-secondary mb-8">
            At Herbal Medicine Ecommerce, we are committed to delivering the highest quality herbal products. Our rigorous quality control processes ensure that every product meets our exacting standards for purity, potency, and safety.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {standards.map((standard, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-4">{standard.icon}</div>
                <h3 className="font-medium text-lg mb-2">{standard.title}</h3>
                <p className="text-text-secondary">{standard.description}</p>
              </div>
            ))}
          </div>

          <h2 className="font-heading font-semibold text-xl text-primary-sage mt-8 mb-6">Our Quality Process</h2>
          <div className="space-y-6 mb-12">
            {qualityProcess.map((process, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-sage/10 rounded-full flex items-center justify-center">
                    <span className="text-primary-sage font-medium">{process.step}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">{process.title}</h3>
                    <p className="text-text-secondary mb-4">{process.description}</p>
                    {process.items && (
                      <ul className="list-none space-y-2">
                        {process.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <FaCheckCircle className="text-primary-sage flex-shrink-0" />
                            <span className="text-text-secondary">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-neutral-cream p-6 rounded-lg mt-8">
            <h3 className="font-medium text-lg mb-4">Our Commitment</h3>
            <p className="text-text-secondary">
              We are committed to transparency and quality in everything we do. Our quality standards are not just a set of rules – they are a reflection of our dedication to providing you with the finest herbal products that you can trust for your wellness journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quality 