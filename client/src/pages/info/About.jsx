import React from 'react'
import { FaHammer, FaCloud, FaLeaf, FaLightbulb } from 'react-icons/fa'
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";

const About = () => {
  const navigate = useNavigate();

  // Animation variants for section entrance
  const sectionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  // Animation variants for staggered children
  const containerVariants = {
    animate: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden py-20 sm:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595950653106-6ed91632d080?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center scale-110"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-800/90"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
          >
            <motion.div variants={sectionVariants}>
              <Link to="/">
                <img
                  src={logo}
                  alt="KICKS Logo"
                  className="h-20 mx-auto mb-6 cursor-pointer filter invert opacity-80"
                />
              </Link>
            </motion.div>
            <motion.h1 
                className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight"
                variants={sectionVariants}
            >
                Our Story: Crafting Every Step
            </motion.h1>
            <motion.p 
                className="text-lg leading-relaxed text-gray-300 max-w-3xl mx-auto"
                 variants={sectionVariants}
            >
                Born from a vision to blend exquisite craftsmanship with modern style, KICKS is more than just a shoe brand – it's a journey. Launched in 2024, we set out to redefine footwear, bringing together tradition and innovation to create shoes that look as good as they feel.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <motion.div 
        className="container mx-auto px-4 py-16 sm:py-24"
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-semibold text-3xl text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Our mission is to empower your stride. We are dedicated to designing and delivering exceptional footwear that seamlessly blends innovative design, unparalleled comfort, and lasting quality. Every pair is crafted to support you, whether you're navigating the urban landscape or exploring the great outdoors. We believe that great shoes can elevate your entire experience, one comfortable and stylish step at a time.
          </p>
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div 
        className="bg-gray-100 py-16 sm:py-24"
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-semibold text-3xl text-gray-800 text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div 
                  className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                  variants={containerVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
              >
                <motion.div variants={sectionVariants}><FaHammer className="text-primary-sage text-4xl mb-4" /></motion.div>
                <motion.h3 variants={sectionVariants} className="font-medium text-lg mb-2 text-gray-900">Craftsmanship</motion.h3>
                <motion.p variants={sectionVariants} className="text-gray-600 text-sm">Each pair is thoughtfully crafted by skilled artisans using top-grade materials to ensure durability and elegance, a testament to our dedication to quality.</motion.p>
              </motion.div>
              <motion.div 
                 className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                 variants={containerVariants}
                 initial="initial"
                 whileInView="animate"
                 viewport={{ once: true, amount: 0.2 }}
              >
                <motion.div variants={sectionVariants}><FaCloud className="text-primary-sage text-4xl mb-4" /></motion.div>
                <motion.h3 variants={sectionVariants} className="font-medium text-lg mb-2 text-gray-900">Comfort</motion.h3>
                <motion.p variants={sectionVariants} className="text-gray-600 text-sm">Designed with your well-being in mind, our shoes offer superior fit, cushioning, and support for all-day wear, making comfort a cornerstone of our design.</motion.p>
              </motion.div>
              <motion.div 
                 className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                 variants={containerVariants}
                 initial="initial"
                 whileInView="animate"
                 viewport={{ once: true, amount: 0.2 }}
              >
                <motion.div variants={sectionVariants}><FaLeaf className="text-primary-sage text-4xl mb-4" /></motion.div>
                <motion.h3 variants={sectionVariants} className="font-medium text-lg mb-2 text-gray-900">Sustainability</motion.h3>
                <motion.p variants={sectionVariants} className="text-gray-600 text-sm">We are committed to reducing our environmental footprint by using eco-conscious materials and ethical practices throughout our production process.</motion.p>
              </motion.div>
              <motion.div 
                 className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                 variants={containerVariants}
                 initial="initial"
                 whileInView="animate"
                 viewport={{ once: true, amount: 0.2 }}
              >
                <motion.div variants={sectionVariants}><FaLightbulb className="text-primary-sage text-4xl mb-4" /></motion.div>
                <motion.h3 variants={sectionVariants} className="font-medium text-lg mb-2 text-gray-900">Innovation</motion.h3>
                <motion.p variants={sectionVariants} className="text-gray-600 text-sm">From cutting-edge design to advanced material science, we constantly innovate to bring you stylish, high-performance footwear that leads the way.</motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Journey Section */}
        <motion.div 
            className="container mx-auto px-4 py-16 sm:py-24"
            variants={sectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading font-semibold text-3xl text-gray-800 mb-6">Our Journey</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              Our journey began with a single step: a commitment to quality and style. Starting as a modest venture, we've grown alongside our community, evolving through passion and dedication. Each milestone is a testament to the trust our customers place in us and the hard work of our team. We are proud of where we come from and excited for every step ahead, continuing to build a brand that resonates with shoe lovers globally.
            </p>
          </div>
        </motion.div>

      {/* Call to Action Section */}
      <motion.div 
        className="bg-primary-sage/10 py-16 sm:py-24"
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
          <div className="container mx-auto px-4 text-center">
              <h3 className="font-heading font-semibold text-3xl text-gray-800 mb-6">Step Into Our Community</h3>
              <p className="text-lg leading-relaxed text-gray-600 max-w-3xl mx-auto mb-8">
                  Ready to experience the KICKS difference? Explore our latest collection and find the perfect pair to elevate your style and comfort.
              </p>
              <motion.div
                  variants={containerVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
              >
                 <motion.button
                      onClick={() => navigate('/products')}
                      className='rounded-md bg-primary-sage px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-primary-sage-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-sage transition-all duration-300 hover:scale-105 hover:shadow-primary-sage/25'
                      variants={sectionVariants}
                  >
                    Shop the Collection
                  </motion.button>
              </motion.div>
          </div>
      </motion.div>
    </div>
  )
}

export default About
