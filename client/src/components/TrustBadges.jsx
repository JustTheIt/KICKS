import React from 'react';
import { FaTruck, FaExchangeAlt, FaLock, FaAward } from 'react-icons/fa';

const TrustBadges = () => {
  const badges = [
    {
      id: 1,
      icon: <FaTruck className="text-green-600" />,
      title: 'Free Shipping',
      description: 'On orders over NPR 1500',
      highlight: 'Nationwide delivery'
    },
    {
      id: 2,
      icon: <FaExchangeAlt className="text-green-600" />,
      title: 'Easy Returns',
      description: '15-day return policy',
      highlight: 'No questions asked'
    },
    {
      id: 3,
      icon: <FaLock className="text-green-600" />,
      title: 'Secure Payment',
      description: '100% protected transactions',
      highlight: 'SSL encrypted'
    },
    {
      id: 4,
      icon: <FaAward className="text-green-600" />,
      title: 'Quality Guaranteed',
      description: 'Authentic Ayurvedic products',
      highlight: 'Lab tested'
    }
  ];

  return (
    <section className="py-12 bg-white border-t border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex flex-col items-center text-center p-6 hover:shadow-sm rounded-lg transition-all duration-300 group"
            >
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                <span className="text-2xl">{badge.icon}</span>
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{badge.title}</h3>
              <p className="text-gray-600 text-sm mb-1">{badge.description}</p>
              <p className="text-green-600 text-xs font-medium mt-1">{badge.highlight}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;