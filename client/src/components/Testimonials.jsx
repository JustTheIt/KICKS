import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import ajitImg from '../assets/ajit.jpg';
import chetanImg from '../assets/chetan.jpg';
import sauravImg from '../assets/Saurav.jpg';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Ajit',
      position: 'Position 1',
      photo: ajitImg,
      review: 'Ajit review...',
      rating: 5
    },
    {
      id: 2,
      name: 'Chetan',
      position: 'Position 2',
      photo: chetanImg,
      review: 'Chetan review...',
      rating: 5
    },
    {
      id: 3,
      name: 'Saurav',
      position: 'Position 3',
      photo: sauravImg,
      review: 'Saurav review...',
      rating: 5
    }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Healing Experiences
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what our community says about these traditional remedies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 relative"
            >
              <FaQuoteLeft className="absolute top-6 left-6 text-green-100 text-4xl" />
              
              <div className="mb-6 relative z-10">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-700 mb-6 relative z-10 italic">
                "{testimonial.review}"
              </p>
              
              <div className="flex items-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden mr-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;