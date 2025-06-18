import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import { GiRunningShoe } from 'react-icons/gi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const { name, email, phone, subject, message } = formData;
      const phoneNumber = "9779866579810";
      
      const text = encodeURIComponent(
        `New Contact Request from KICKS Website:
        
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}
Message: 
${message}

Please respond at your earliest convenience.`
      );

      const whatsappURL = `https://wa.me/${phoneNumber}?text=${text}`;
      window.open(whatsappURL, "_blank");
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <FaPhoneAlt className="text-black text-xl" />,
      title: "Customer Support",
      details: ["+977 9866579810"],
      description: "Available 10 AM - 6 PM (Mon - Sat)"
    },
    {
      icon: <FaEnvelope className="text-black text-xl" />,
      title: "Email Us",
      details: ["support@kicks.com", "sales@kicks.com"],
      description: "We'll reply within 24 hours"
    },
    {
      icon: <FaMapMarkerAlt className="text-black text-xl" />,
      title: "Visit Store",
      details: ["KICKS Shoes HQ", "Kathmandu, Nepal"],
      description: "Open Mon - Sat, 10AM-6PM"
    },
    {
      icon: <FaClock className="text-black text-xl" />,
      title: "Business Hours",
      details: ["Mon - Sat: 10 AM - 6 PM", "Sunday: Closed"],
      description: "We rest on Sundays!"
    }
  ];

  return (
    <div className="bg-neutral-cream-light min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GiRunningShoe className="text-black text-3xl" />
            <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or need support? Our team is ready to help you with anything you need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information Cards */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-6">
                Whether you have questions about sizing, need help with an order, or want to collaborate, we're here to help.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index} 
                    className="bg-neutral-cream rounded-lg p-5 border border-neutral-cream-dark transition-all hover:shadow-md"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-gray-200 p-2 rounded-full">
                        {info.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{info.title}</h3>
                    </div>
                    <div className="space-y-1.5">
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-800">{detail}</p>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{info.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ/Quick Help Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Help</h3>
              <div className="space-y-3">
                <div className="border-b border-gray-200 pb-3">
                  <h4 className="font-medium text-gray-900">Order Tracking</h4>
                  <p className="text-sm text-gray-600">Track your order status online with your order number.</p>
                </div>
                <div className="border-b border-gray-200 pb-3">
                  <h4 className="font-medium text-gray-900">Returns & Exchanges</h4>
                  <p className="text-sm text-gray-600">We offer 30-day returns on unworn items.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Size Guide</h4>
                  <p className="text-sm text-gray-600">Unsure about sizing? Check our detailed size guide.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <FaPaperPlane className="text-black text-xl" />
              <h2 className="text-2xl font-semibold text-gray-900">Send Us a Message</h2>
            </div>
            
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg">
                Thank you! Your message has been sent. We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage focus:border-transparent`}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage focus:border-transparent`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage focus:border-transparent`}
                    placeholder="+977 98XXXXXXXX"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border ${errors.subject ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage focus:border-transparent`}
                  placeholder="What's this about?"
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border ${errors.message ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage focus:border-transparent`}
                  placeholder="How can we help you?"
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-primary-sage text-white font-semibold py-3.5 rounded-lg hover:bg-primary-sage-dark transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;