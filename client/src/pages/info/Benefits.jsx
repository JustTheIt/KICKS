import React from 'react'
import { FaLeaf } from 'react-icons/fa'

const Benefits = () => {
  const benefits = [
    {
      title: "Natural Healing",
      description: "Herbal medicines work in harmony with your body's natural healing processes, promoting wellness without harsh side effects.",
      icon: "🌿"
    },
    {
      title: "Traditional Wisdom",
      description: "Our remedies are based on centuries of traditional knowledge, refined through generations of herbal practitioners.",
      icon: "📚"
    },
    {
      title: "Holistic Approach",
      description: "Herbal medicine treats the whole person, addressing the root cause of health issues rather than just symptoms.",
      icon: "🧘"
    },
    {
      title: "Sustainable Wellness",
      description: "Natural remedies support long-term health goals while being gentle on your body and the environment.",
      icon: "🌱"
    }
  ]

  const commonHerbs = [
    {
      name: "Ashwagandha",
      benefits: ["Stress reduction", "Energy boost", "Immune support"],
      description: "Known as the 'king of herbs' in Ayurveda, Ashwagandha helps the body adapt to stress and promotes overall vitality."
    },
    {
      name: "Tulsi (Holy Basil)",
      benefits: ["Respiratory health", "Stress relief", "Antioxidant properties"],
      description: "A sacred herb in Ayurveda, Tulsi supports respiratory health and helps maintain a balanced immune system."
    },
    {
      name: "Turmeric",
      benefits: ["Anti-inflammatory", "Joint health", "Digestive support"],
      description: "The golden spice of life, Turmeric is renowned for its powerful anti-inflammatory and antioxidant properties."
    },
    {
      name: "Ginger",
      benefits: ["Digestive aid", "Nausea relief", "Anti-inflammatory"],
      description: "A warming herb that supports digestive health and helps maintain a healthy inflammatory response."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <FaLeaf className="text-primary-sage text-2xl" />
          <h1 className="font-heading font-semibold text-2xl text-text-primary">Herbal Benefits</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-text-secondary mb-8">
            Discover the natural power of herbal medicine and how it can enhance your wellness journey. Our carefully selected herbs offer a gentle yet effective approach to maintaining health and vitality.
          </p>

          <h2 className="font-heading font-semibold text-xl text-primary-sage mt-8 mb-6">Why Choose Herbal Medicine?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="font-medium text-lg mb-2">{benefit.title}</h3>
                <p className="text-text-secondary">{benefit.description}</p>
              </div>
            ))}
          </div>

          <h2 className="font-heading font-semibold text-xl text-primary-sage mt-8 mb-6">Common Herbs and Their Benefits</h2>
          <div className="space-y-6 mb-12">
            {commonHerbs.map((herb, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-3">{herb.name}</h3>
                <p className="text-text-secondary mb-4">{herb.description}</p>
                <div className="flex flex-wrap gap-2">
                  {herb.benefits.map((benefit, bIndex) => (
                    <span 
                      key={bIndex}
                      className="px-3 py-1 bg-primary-sage/10 text-primary-sage rounded-full text-sm"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-neutral-cream p-6 rounded-lg mt-8">
            <h3 className="font-medium text-lg mb-4">Important Note</h3>
            <p className="text-text-secondary">
              While herbal medicines offer many benefits, it's important to consult with healthcare professionals before starting any new herbal regimen, especially if you have existing health conditions or are taking medications. Our products are meant to complement, not replace, professional medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Benefits 