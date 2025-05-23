import React from 'react'
import { FaShoePrints } from 'react-icons/fa'

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <FaShoePrints className="text-primary-sage text-2xl" />
          <h1 className="font-heading font-semibold text-2xl text-text-primary">Our Story</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-text-secondary mb-6">
            Launched in 2024, our shoe brand was born out of a passion for high-quality craftsmanship and a vision to redefine everyday footwear. From the streets of Nepal to international runways, we strive to offer style, comfort, and performance for everyone.
          </p>

          <h2 className="font-heading font-semibold text-xl text-primary-sage mt-8 mb-4">Our Mission</h2>
          <p className="text-text-secondary mb-6">
            We aim to deliver exceptional shoes that blend innovative design with ultimate comfort. Whether you're on the move or making a statement, our mission is to support every step of your journey.
          </p>

          <h2 className="font-heading font-semibold text-xl text-primary-sage mt-8 mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2">Craftsmanship</h3>
              <p className="text-text-secondary">Each pair is thoughtfully crafted by skilled artisans using top-grade materials to ensure durability and elegance.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2">Comfort</h3>
              <p className="text-text-secondary">Designed with comfort in mind, our shoes offer superior fit and support for all-day wear.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2">Sustainability</h3>
              <p className="text-text-secondary">We use eco-conscious materials and practices to reduce our footprint while maintaining top-tier quality.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2">Innovation</h3>
              <p className="text-text-secondary">From design to production, we innovate with every step to bring modern, stylish footwear to life.</p>
            </div>
          </div>

          <h2 className="font-heading font-semibold text-xl text-primary-sage mt-8 mb-4">Our Journey</h2>
          <p className="text-text-secondary mb-6">
            Starting as a small boutique, we've grown into a trusted e-commerce platform loved by thousands. Our commitment to excellence and customer satisfaction has helped us build a loyal community of shoe lovers around the world.
          </p>

          <div className="bg-neutral-cream p-6 rounded-lg mt-8">
            <h3 className="font-medium text-lg mb-4">Step Into the Future</h3>
            <p className="text-text-secondary">
              Join us as we continue to innovate and inspire. Whether you're chasing dreams or pavement, we’re here to support every step—one stylish shoe at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
