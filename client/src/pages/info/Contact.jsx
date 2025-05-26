import React, { useState } from 'react'
import { FaLeaf, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log('Form submitted:', formData)
  }

  const contactInfo = [
    {
      icon: <FaPhone className="text-2xl text-primary-sage" />,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Available Monday to Friday, 9 AM - 6 PM EST"
    },
    {
      icon: <FaEnvelope className="text-2xl text-primary-sage" />,
      title: "Email",
      details: ["support@herbalmedicine.com", "info@herbalmedicine.com"],
      description: "We aim to respond within 24 hours"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-primary-sage" />,
      title: "Address",
      details: ["123 Herbal Way", "Wellness City, WC 12345", "United States"],
      description: "Visit our store during business hours"
    },
    {
      icon: <FaClock className="text-2xl text-primary-sage" />,
      title: "Business Hours",
      details: ["Monday - Friday: 9 AM - 6 PM", "Saturday: 10 AM - 4 PM", "Sunday: Closed"],
      description: "Closed on major holidays"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <FaPhoneAlt className="text-primary-sage text-2xl" />
          <h1 className="font-heading font-semibold text-2xl text-text-primary">Contact Us</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-text-secondary">
                We're here to help! Whether you have questions about our products, need assistance with your order, or want to learn more about herbal medicine, our team is ready to assist you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="mb-4">{info.icon}</div>
                  <h3 className="font-medium text-lg mb-2">{info.title}</h3>
                  <div className="space-y-1 mb-2">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-text-secondary">{detail}</p>
                    ))}
                  </div>
                  <p className="text-sm text-text-secondary/80">{info.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="font-medium text-xl mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-sage focus:border-primary-sage"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-sage focus:border-primary-sage"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-sage focus:border-primary-sage"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-sage focus:border-primary-sage"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-sage text-white py-3 px-6 rounded-md hover:bg-primary-sage/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact 