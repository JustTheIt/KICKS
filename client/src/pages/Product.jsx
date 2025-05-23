import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import CardProduct from '../components/CardProduct'
import { FaFilter } from "react-icons/fa"
import Loading from '../components/Loading'

const Product = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const categoryData = useSelector(state => state.product.allCategory)

  const fetchProductData = async () => {
    try {
      setLoading(true)
      console.log('Fetching products with params:', { page, limit: 20, category: selectedCategory })
      
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 20,
          category: selectedCategory || undefined
        }
      })

      const { data: responseData } = response
      console.log('API Response:', responseData)

      if (responseData.success) {
        if (page === 1) {
          setProductData(responseData.data || [])
        } else {
          setProductData(prevData => [...prevData, ...(responseData.data || [])])
        }
      } else {
        console.error('API returned success: false', responseData)
        setProductData([])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      AxiosToastError(error)
      setProductData([])
    } finally {
      setLoading(false)
    }
  }

  // Reset page and data when category changes
  useEffect(() => {
    setPage(1)
    setProductData([])
  }, [selectedCategory])

  // Fetch products when page or category changes
  useEffect(() => {
    fetchProductData()
  }, [page, selectedCategory])

  return (
    <section className='bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 min-h-screen py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
            <p className="text-gray-600 mt-1">Browse our complete collection</p>
          </div>
          <div className='flex items-center gap-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md border border-gray-100'>
            <FaFilter className="text-primary-sage text-lg" />
            <select 
              className='border-0 bg-transparent px-4 py-2 focus:outline-none focus:ring-0 text-gray-700 min-w-[200px] cursor-pointer'
              value={selectedCategory || ''}
              onChange={(e) => {
                setSelectedCategory(e.target.value || null)
              }}
            >
              <option value="">All Categories</option>
              {categoryData?.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {loading && page === 1 ? (
            [...Array(12)].map((_, index) => (
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
            productData?.map((product) => (
              <div key={product._id} className='w-full transform transition-all duration-300 hover:scale-105'>
                <CardProduct data={product} />
              </div>
            ))
          )}
        </div>

        {/* Loading More Indicator */}
        {loading && page > 1 && (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-sage"></div>
          </div>
        )}

        {/* Load More Button */}
        {!loading && productData?.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setPage(prev => prev + 1)}
              className="px-8 py-3 bg-primary-sage text-white rounded-lg font-semibold shadow hover:bg-primary-sage-dark transition-all"
            >
              Load More
            </button>
          </div>
        )}

        {/* No Products Found */}
        {!loading && (!productData || productData.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Product
