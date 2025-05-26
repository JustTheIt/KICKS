import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import { useNavigate, useLocation } from 'react-router-dom'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import CardProduct from '../components/CardProduct'
import Loading from '../components/Loading'
import { FaMapMarkerAlt, FaLeaf, FaFilter } from "react-icons/fa"
import ajitImg from '../assets/ajit.jpg'
import chetanImg from '../assets/chetan.jpg'
import sauravImg from '../assets/Saurav.jpg'
import { motion } from "framer-motion";

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()
  const { hash } = useLocation();
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Animation variants for text and buttons
  const introTextVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.6 }
    },
  };

  const kicksVariants = {
    initial: { opacity: 0, scale: 0.8, rotate: -10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { type: "spring", stiffness: 120, damping: 10, delay: 0.8 }
    },
  };

  const underlineVariants = {
      initial: { scaleX: 0 },
      animate: { scaleX: 1, transition: { duration: 0.5, ease: "easeOut", delay: 1.1 } }
  }

  const paragraphVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15, delay: 1.3 }
    },
  };

  const buttonVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
  };

  const buttonsContainerVariants = {
      animate: { transition: { staggerChildren: 0.2, delayChildren: 1.5 } }
  }

  const containerVariants = {
    animate: { transition: { delayChildren: 0.3 } }
  }

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: 'Nirajan Singh',
      // position: 'Position 1',
      photo: ajitImg,
      review: 'As a fitness trainer, I demand the best in footwear. These sneakers provide exceptional support and comfort during intense workouts. The quality is outstanding, and they\'ve maintained their shape and performance even after months of use.',
      rating: 5
    },
    {
      id: 2,
      name: 'Chetan Koirala',
      // position: 'Position 2',
      photo: chetanImg,
      review: 'The premium collection exceeded my expectations. The attention to detail in craftsmanship is remarkable. I appreciate the professional service and the way they handle orders. The delivery was prompt and the packaging was impeccable.',
      rating: 5
    },
    {
      id: 3,
      name: 'Saurav Subedi',
      // position: 'Position 3',
      photo: sauravImg,
      review: 'I\'ve tried numerous brands, but these stand out for their perfect balance of style and functionality. The materials are top-notch, and the design is both modern and practical. The customer service team was incredibly helpful with sizing recommendations.',
      rating: 5
    }
  ]

  const fetchProducts = async (categoryId = null) => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          category: categoryId,
          page: 1,
          limit: 20
        }
      })

      const { data: responseData } = response
      if (responseData.success) {
        setProducts(responseData.data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(selectedCategory)

    // Check if the URL has the #hero-section hash
    if (hash === '#hero-section') {
      // Add a small delay to allow the initial scroll to complete
      const timer = setTimeout(() => {
        const targetSection = document.getElementById('hero-section');
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Adjust delay as needed

      return () => clearTimeout(timer); // Clean up the timer
    }

  }, [selectedCategory, hash])

  const handleRedirectProductListpage = (id, cat) => {
    try {
      const subcategory = subCategoryData.find(sub => {
        return sub.category?.some(c => c._id === id)
      })

      if (!subcategory) {
        navigate(`/${valideURLConvert(cat)}-${id}`)
        return
      }

      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`
      navigate(url)
    } catch (error) {
      navigate(`/${valideURLConvert(cat)}-${id}`)
    }
  }

  return (
    <section className='bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 min-h-screen'>
      {/* Hero Section */}
      <div id="hero-section" className='relative bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden'>
        {/* Animated Background Slideshow */}
        <div className="absolute inset-0">
          {/* Background Images */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center animate-slide-1"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center animate-slide-2"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center animate-slide-3"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center animate-slide-4"></div>
          
          {/* Color Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/70 to-gray-800/80"></div>
          
          {/* Animated Light Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_100%)] animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-shine"></div>

          {/* Abstract Animated Elements */}
          <motion.div
              className="absolute top-1/4 left-1/4 w-60 h-60 bg-primary-sage/20 rounded-full mix-blend-screen blur-2xl"
              animate={{
                  y: [0, 50, 0],
                  rotate: [0, 30, 0],
                  opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
              }}
          />
          <motion.div
              className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-gray-300/10 rounded-full mix-blend-screen blur-2xl"
               animate={{
                  y: [0, -50, 0],
                  rotate: [0, -30, 0],
                  opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut"
              }}
          />
          <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-sage/10 rounded-full mix-blend-screen blur-3xl"
               animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
              }}
          />

        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        
        <div className='mx-auto max-w-7xl'>
          <div className='relative lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8'>
            {/* Left Content */}
            <motion.div
            id="hero-content"
              className='px-6 pb-16 pt-8 sm:pb-24 lg:col-span-7 lg:px-0 lg:pb-32 lg:pt-32 xl:col-span-6'
              variants={containerVariants}
              initial="initial"
              animate="animate"
            >
              <div className='mx-auto max-w-2xl lg:mx-0'>
                <h1 className='mt-16 text-4xl font-bold tracking-tight text-white sm:mt-8 sm:text-6xl'>
                  <motion.span variants={introTextVariants}>Step into Style with</motion.span>{' '}
                  <motion.span 
                      className='text-primary-sage relative inline-block'
                      variants={kicksVariants}
                  >
                    KICKS
                    <motion.span 
                        className="absolute -bottom-2 left-0 w-full h-1 bg-primary-sage/50 transform origin-left"
                        variants={underlineVariants}
                    ></motion.span>
                  </motion.span>
                </h1>
                <motion.p 
                  className='mt-4 text-lg leading-8 text-gray-300'
                  variants={paragraphVariants}
                >
                  Discover our latest collection of premium footwear. From casual sneakers to formal shoes, find your perfect pair.
                </motion.p>
                <motion.div 
                  className='mt-8 flex items-center gap-x-6'
                  variants={buttonsContainerVariants} 
                  initial="initial"
                  animate="animate"
                >
                  <motion.button
                    onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                    className='rounded-md bg-primary-sage px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-primary-sage-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-sage transition-all duration-300 hover:scale-105 hover:shadow-primary-sage/25'
                    variants={buttonVariants}
                  >
                    Shop Now
                  </motion.button>
                  <motion.button
                    onClick={() => document.getElementById('categories').scrollIntoView({ behavior: 'smooth' })}
                    className='text-base font-semibold leading-6 text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group'
                    variants={buttonVariants}
                  >
                    View Categories 
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content - Image Grid */}
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="grid grid-cols-2 gap-3 h-full p-3">
                <div className="space-y-3">
                  <div className="relative group">
                    <img
                      className="h-44 w-full object-cover rounded-lg shadow-xl transition-transform duration-500 group-hover:scale-105"
                      src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80"
                      alt="Trending shoes collection"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </div>
                  <div className="relative group">
                    <img
                      className="h-44 w-full object-cover rounded-lg shadow-xl transition-transform duration-500 group-hover:scale-105"
                      src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80"
                      alt="Casual sneakers"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </div>
                </div>
                <div className="space-y-3 pt-6">
                  <div className="relative group">
                    <img
                      className="h-44 w-full object-cover rounded-lg shadow-xl transition-transform duration-500 group-hover:scale-105"
                      src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80"
                      alt="Formal shoes"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </div>
                  <div className="relative group">
                    <img
                      className="h-44 w-full object-cover rounded-lg shadow-xl transition-transform duration-500 group-hover:scale-105"
                      src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80"
                      alt="Sports shoes"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Grid Container */}
      <div id="categories" className='max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-8 bg-white/80 backdrop-blur-sm shadow-lg -mt-1 relative'>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 to-transparent pointer-events-none"></div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
            <p className="text-gray-600 mt-1">Explore our curated collections</p>
          </div>
        </div>
        <div className='relative'>
          <div className='flex gap-6 overflow-x-auto pb-6 scrollbar-hide'>
            {loadingCategory ? (
              [...Array(12)].map((_, index) => (
                <div 
                  key={`loadingcategory-${index}`} 
                  className='flex-shrink-0 w-32 h-36 bg-white rounded-lg shadow-md p-4 animate-pulse'
                >
                  <div className='bg-gray-200 rounded-md w-full h-24'></div>
                  <div className='bg-gray-200 rounded-md w-full h-4 mt-4'></div>
                </div>
              ))
            ) : (
              categoryData.map((cat) => (
                <div 
                  key={`${cat._id}-displayCategory`} 
                  className='flex-shrink-0 w-28 h-32 cursor-pointer group'
                  onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
                >
                  <div className='bg-white rounded-lg shadow-md p-3 h-full flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100'>
                    <div className='w-20 h-20 mb-2 overflow-hidden bg-gray-50 rounded-lg'>
                      <img 
                        src={cat.image}
                        className='w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-110'
                        alt={cat.name}
                        loading='lazy'
                        onError={(e) => {
                          e.target.src = '/placeholder-product.png'
                          e.target.onerror = null
                        }}
                      />
                    </div>
                    <p className='text-sm text-center font-medium text-gray-700 line-clamp-1 group-hover:text-primary-sage'>
                      {cat.name}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* All Products Section */}
      <div className='max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-16 relative'>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 via-transparent to-gray-900/10 pointer-events-none"></div>
        <div className='flex items-center justify-between mb-8 relative'>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
            <p className="text-gray-600 mt-1">Discover our complete collection</p>
          </div>
          <div className='flex items-center gap-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md border border-gray-100'>
            <FaFilter className="text-primary-sage text-lg" />
            <select 
              className='border-0 bg-transparent px-4 py-2 focus:outline-none focus:ring-0 text-gray-700 min-w-[200px] cursor-pointer'
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">All Categories</option>
              {categoryData.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div id="products" className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative'>
          {loading ? (
            [...Array(10)].map((_, index) => (
              <div key={`loading-${index}`} className='animate-pulse'>
                <div className='bg-white/90 backdrop-blur-sm rounded-xl shadow-md h-[500px] w-full'>
                  <div className='h-64 bg-gray-200 rounded-t-xl'></div>
                  <div className='p-6 space-y-4'>
                    <div className='h-5 bg-gray-200 rounded w-3/4'></div>
                    <div className='h-5 bg-gray-200 rounded w-1/2'></div>
                    <div className='h-5 bg-gray-200 rounded w-1/4'></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            products.slice(0, 12).map((product) => (
              <div key={product._id} className='w-full transform transition-all duration-300 hover:scale-105'>
                <CardProduct data={product} />
              </div>
            ))
          )}
        </div>
        {!loading && products.length > 12 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate('/products')}
              className="px-8 py-3 bg-primary-sage text-white rounded-lg font-semibold shadow hover:bg-primary-sage-dark transition-all"
            >
              See More
            </button>
          </div>
        )}
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-b from-gray-200 via-gray-100 to-white mt-20 py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Customer Experiences
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trusted by professionals and enthusiasts worldwide. Read what our valued customers have to say about their experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full ring-2 ring-primary-sage/20 object-cover"
                      onError={e => { e.target.onerror = null; e.target.src = '/placeholder-user.png'; }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h3>
                    {testimonial.position && (
                      <p className="text-sm text-primary-sage font-medium">{testimonial.position}</p>
                    )}
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-2 top-0 text-4xl text-primary-sage/20">"</div>
                  <p className="text-gray-600 leading-relaxed pl-4">{testimonial.review}</p>
                  <div className="absolute -right-2 bottom-0 text-4xl text-primary-sage/20">"</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home