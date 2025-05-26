import React, { useState, useEffect } from 'react';
import { FaLeaf } from 'react-icons/fa';

import HimalayanHerbs from '../assets/himalayan-herbs.jpg';
import AyurvedicPreparation from '../assets/ayurvedic-preparation.jpg';
import HerbalFarmers from '../assets/herbal-farmers.jpg';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: HimalayanHerbs,
      title: 'Ancient Wisdom in Every Dose',
      subtitle: 'Pure Himalayan herbs harvested at peak potency',
      features: [
        'Wild-crafted by local communities',
        'Authentic Ayurvedic preparations',
        'No synthetic additives'
      ]
    },
    {
      id: 2,
      image: AyurvedicPreparation,
      title: 'Traditional Knowledge, Modern Quality',
      subtitle: 'Time-tested remedies with laboratory verification',
      features: [
        'GMP-certified processing',
        'Heavy metal tested',
        'Organic certification'
      ]
    },
    {
      id: 3,
      image: HerbalFarmers,
      title: 'Direct from Nepali Growers',
      subtitle: 'Supporting sustainable farming communities',
      features: [
        'Fair trade partnerships',
        'Eco-conscious packaging',
        'Carbon-neutral shipping'
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // Longer duration for informational slides
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[70vh] max-h-[800px] overflow-hidden bg-gray-100">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full">
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover object-center"
              loading="lazy"
              role="presentation"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40 flex items-end pb-12 md:pb-20">
              <div className="container mx-auto px-6 text-white">
                <div className="max-w-4xl space-y-4">
                  <div className="flex items-center text-green-200 mb-2">
                    {/* <FaLeaf className="mr-2" /> */}
                    <span className="text-sm font-medium tracking-wider">
                      AYURVEDIC HERBAL SOLUTIONS
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
                    {slide.title}
                  </h1>

                  <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                    {slide.subtitle}
                  </p>

                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-6 text-sm md:text-base">
                    {slide.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mt-2 mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Minimal navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`View slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
