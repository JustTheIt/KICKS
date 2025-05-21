import React from 'react'
import { FaLeaf } from 'react-icons/fa'

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <FaLeaf className="text-primary-sage text-2xl" />
          <h1 className="font-heading font-semibold text-2xl text-text-primary">Our Story</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-text-secondary mb-6">
            Founded in 2024, Herbal Medicine Ecommerce emerged from a deep passion for traditional healing practices and a commitment to making authentic herbal remedies accessible to everyone. Our journey began in the heart of Nepal, where ancient wisdom meets modern wellness.
          </p>

          <h2 className="font-heading font-semibold text-xl text-primary-sage mt-8 mb-4">Our Mission</h2>
          <p className="text-text-secondary mb-6">
            We are dedicated to preserving and promoting the rich heritage of herbal medicine while ensuring the highest standards of quality and authenticity. Our mission is to bridge the gap between traditional healing practices and modern wellness needs.
          </p>

          <h2 className="font-heading font-semibold text-xl text-primary-sage mt-8 mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2">Authenticity</h3>
              <p className="text-text-secondary">We source our herbs directly from trusted farmers and traditional healers, ensuring the authenticity of every product.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2">Quality</h3>
              <p className="text-text-secondary">Every product undergoes rigorous quality testing to meet international standards while preserving traditional preparation methods.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2">Sustainability</h3>
              <p className="text-text-secondary">We are committed to sustainable practices, supporting local communities and preserving natural resources.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2">Education</h3>
              <p className="text-text-secondary">We believe in empowering our customers with knowledge about traditional healing practices and herbal benefits.</p>
            </div>
          </div>

          <h2 className="font-heading font-semibold text-xl text-primary-sage mt-8 mb-4">Our Journey</h2>
          <p className="text-text-secondary mb-6">
            From humble beginnings as a small local shop to becoming a trusted online platform, we have grown while staying true to our roots. Our commitment to quality and authenticity has helped us build a community of wellness enthusiasts who trust us for their herbal medicine needs.
          </p>

          <div className="bg-neutral-cream p-6 rounded-lg mt-8">
            <h3 className="font-medium text-lg mb-4">Join Our Journey</h3>
            <p className="text-text-secondary">
              We invite you to be part of our story as we continue to bring the best of traditional herbal medicine to modern wellness seekers. Together, let's embrace the healing power of nature.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About 