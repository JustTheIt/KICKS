import React from 'react'
import { FaLeaf, FaShieldAlt, FaUserShield, FaDatabase, FaCookie } from 'react-icons/fa'

const Privacy = () => {
  const privacySections = [
    {
      title: "Information We Collect",
      icon: <FaDatabase className="text-2xl text-primary-sage" />,
      content: [
        {
          subtitle: "Personal Information",
          details: [
            "Name and contact information",
            "Billing and shipping addresses",
            "Payment information",
            "Email address",
            "Phone number"
          ]
        },
        {
          subtitle: "Usage Information",
          details: [
            "Order history",
            "Product preferences",
            "Website browsing behavior",
            "Device information",
            "IP address"
          ]
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <FaUserShield className="text-2xl text-primary-sage" />,
      content: [
        {
          subtitle: "Primary Uses",
          details: [
            "Process and fulfill your orders",
            "Communicate about your orders",
            "Send order confirmations and updates",
            "Provide customer support",
            "Send marketing communications (with your consent)"
          ]
        },
        {
          subtitle: "Additional Uses",
          details: [
            "Improve our website and services",
            "Personalize your shopping experience",
            "Prevent fraud and enhance security",
            "Comply with legal obligations",
            "Analyze website usage patterns"
          ]
        }
      ]
    },
    {
      title: "Information Sharing",
      icon: <FaShieldAlt className="text-2xl text-primary-sage" />,
      content: [
        {
          subtitle: "Service Providers",
          details: [
            "Payment processors",
            "Shipping partners",
            "Email service providers",
            "Website hosting services",
            "Analytics providers"
          ]
        },
        {
          subtitle: "Legal Requirements",
          details: [
            "Comply with legal obligations",
            "Protect our rights and property",
            "Prevent fraud or illegal activity",
            "Respond to legal requests",
            "Enforce our terms of service"
          ]
        }
      ]
    },
    {
      title: "Cookies and Tracking",
      icon: <FaCookie className="text-2xl text-primary-sage" />,
      content: [
        {
          subtitle: "Types of Cookies",
          details: [
            "Essential cookies for website functionality",
            "Analytics cookies to understand usage",
            "Marketing cookies for personalized content",
            "Preference cookies to remember settings",
            "Security cookies to protect your data"
          ]
        },
        {
          subtitle: "Cookie Management",
          details: [
            "Control cookie preferences in your browser",
            "Opt-out of non-essential cookies",
            "Clear cookies from your browser",
            "Manage marketing preferences",
            "Update cookie settings anytime"
          ]
        }
      ]
    }
  ]

  const rights = [
    {
      title: "Your Rights",
      items: [
        "Access your personal information",
        "Correct inaccurate data",
        "Request deletion of your data",
        "Opt-out of marketing communications",
        "Data portability",
        "Withdraw consent",
        "File a complaint"
      ]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <FaLeaf className="text-primary-sage text-2xl" />
          <h1 className="font-heading font-semibold text-2xl text-text-primary">Privacy Policy</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-text-secondary mb-8">
            At Herbal Medicine Ecommerce, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information. We are committed to ensuring that your privacy is protected and that we comply with all applicable data protection laws.
          </p>

          <div className="space-y-12">
            {privacySections.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  {section.icon}
                  <h2 className="font-heading font-semibold text-xl text-primary-sage">
                    {section.title}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {section.content.map((content, contentIndex) => (
                    <div key={contentIndex}>
                      <h3 className="font-medium text-lg mb-4">{content.subtitle}</h3>
                      <ul className="list-none space-y-2">
                        {content.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2">
                            <span className="text-primary-sage">•</span>
                            <span className="text-text-secondary">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
            <h2 className="font-heading font-semibold text-xl text-primary-sage mb-6">Your Data Rights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rights.map((right, index) => (
                <div key={index}>
                  <h3 className="font-medium text-lg mb-4">{right.title}</h3>
                  <ul className="list-none space-y-2">
                    {right.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <span className="text-primary-sage">•</span>
                        <span className="text-text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-neutral-cream p-6 rounded-lg mt-8">
            <h3 className="font-medium text-lg mb-4">Contact Us</h3>
            <p className="text-text-secondary">
              If you have any questions about our privacy policy or how we handle your personal information, please contact our privacy team at privacy@herbalmedicine.com. We're committed to addressing your concerns and ensuring your privacy is protected.
            </p>
          </div>

          <div className="mt-8 text-sm text-text-secondary/80">
            <p>Last updated: March 2024</p>
            <p>This privacy policy may be updated periodically. Please check back for any changes.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy 