import React from 'react'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import { useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

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

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: 'Alex Johnson',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      review: 'The most comfortable sneakers I\'ve ever worn! Perfect for all-day use.',
      rating: 5
    },
    {
      id: 2,
      name: 'Sarah Miller',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      review: 'Great selection and fast delivery. My new favorite shoe store!',
      rating: 5
    },
    {
      id: 3,
      name: 'David Wilson',
      photo: 'https://randomuser.me/api/portraits/men/75.jpg',
      review: 'Impressive quality and style. Will definitely buy again.',
      rating: 4
    }
  ]

  return (
    <section className='bg-white pb-16'>
      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Step Into Style</span>
                  <span className="block text-indigo-400">with KICKS</span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Discover the latest trends in footwear. Our collection combines comfort, quality, and style for every step of your journey.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:scale-105"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full transition-transform duration-500 hover:scale-105"
            src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80"
            alt="Trending shoes collection"
          />
        </div>
      </div>

      {/* Category Grid Container with Horizontal Scroll */}
      <div className='container mx-auto px-4 my-10'>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className='relative'>
          {/* Horizontal Scrollable Category List */}
          <div className='overflow-x-auto pb-6 scrollbar-hide'>
            <div className='inline-flex space-x-6 min-w-max w-full'>
              {loadingCategory ? (
                [...Array(12)].map((_, index) => (
                  <div 
                    key={`loadingcategory-${index}`} 
                    className='flex-shrink-0 w-24 h-28 bg-white rounded-lg shadow-md p-3 animate-pulse'
                  >
                    <div className='bg-gray-200 rounded-md w-full h-16'></div>
                    <div className='bg-gray-200 rounded-md w-full h-4 mt-3'></div>
                  </div>
                ))
              ) : (
                categoryData.map((cat) => (
                  <div 
                    key={`${cat._id}-displayCategory`} 
                    className='flex-shrink-0 w-24 h-28 cursor-pointer group'
                    onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
                  >
                    <div className='bg-white rounded-lg shadow-md p-3 h-full flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1'>
                      <div className='w-14 h-14 mb-2 overflow-hidden'>
                        <img 
                          src={cat.image}
                          className='w-full h-full object-contain transition-transform duration-300 group-hover:scale-110'
                          alt={cat.name}
                          loading='lazy'
                          onError={(e) => {
                            e.target.src = '/placeholder-product.png'
                            e.target.onerror = null
                          }}
                        />
                      </div>
                      <p className='text-xs text-center font-medium text-gray-700 line-clamp-1 group-hover:text-indigo-600'>
                        {cat.name}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category-wise Product Display Sections */}
      <div className='container mx-auto px-4 space-y-12'>
        {categoryData?.map((c) => (
          <CategoryWiseProductDisplay 
            key={`${c._id}-CategorywiseProduct`} 
            id={c._id} 
            name={c.name}
          />
        ))}
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 mt-20 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-14">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <img
                    className="w-12 h-12 rounded-full object-cover mr-4 transition-transform duration-300 hover:scale-110"
                    src={testimonial.photo}
                    alt={testimonial.name}
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 hover:text-indigo-600 transition-colors">{testimonial.name}</h3>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} transition-transform hover:scale-125`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic hover:text-gray-800 transition-colors">"{testimonial.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home