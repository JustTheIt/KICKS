import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import { FaAngleRight, FaAngleLeft, FaLeaf } from "react-icons/fa6";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.png'
import image2 from '../assets/Best_Prices_Offers.png'
import image3 from '../assets/Wide_Assortment.png'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from '../components/AddToCartButton'

const ProductDisplayPage = () => {
  const params = useParams()
  let productId = params?.product?.split("-")?.slice(-1)[0]
  const [data,setData] = useState({
    name : "",
    image : []
  })
  const [image,setImage] = useState(0)
  const [loading,setLoading] = useState(false)
  const imageContainer = useRef()

  const fetchProductDetails = async()=>{
    try {
        const response = await Axios({
          ...SummaryApi.getProductDetails,
          data : {
            productId : productId 
          }
        })

        const { data : responseData } = response

        if(responseData.success){
          setData(responseData.data)
        }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchProductDetails()
  },[params])
  
  const handleScrollRight = ()=>{
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = ()=>{
    imageContainer.current.scrollLeft -= 100
  }
  console.log("product data",data)
  return (
    <section className='container mx-auto px-4 py-8'>
      <div className='grid lg:grid-cols-2 gap-8'>
        {/* Product Images */}
        <div className='space-y-4'>
          <div className='bg-white rounded-2xl shadow-sm p-6 border border-neutral-cream-dark'>
            <div className='aspect-square w-full overflow-hidden rounded-xl bg-neutral-cream'>
              <img
                src={data.image[image]}
                className='w-full h-full object-scale-down p-4'
                alt={data.name}
              />
            </div>
            
            {/* Image Navigation Dots */}
            <div className='flex items-center justify-center gap-2 mt-4'>
              {data.image.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setImage(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === image 
                      ? 'bg-primary-sage' 
                      : 'bg-neutral-cream-dark'
                  }`}
                />
              ))}
            </div>

            {/* Thumbnail Gallery */}
            <div className='relative mt-6'>
              <div 
                ref={imageContainer} 
                className='flex gap-4 overflow-x-auto scrollbar-none scroll-smooth'
              >
                {data.image.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === image 
                        ? 'border-primary-sage' 
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${data.name} thumbnail ${index + 1}`}
                      className='w-full h-full object-scale-down p-2'
                    />
                  </button>
                ))}
              </div>
              
              {/* Gallery Navigation */}
              <div className='absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none'>
                <button 
                  onClick={handleScrollLeft}
                  className='p-2 bg-white rounded-full shadow-lg pointer-events-auto hover:bg-neutral-cream transition-colors'
                >
                  <FaAngleLeft className="text-text-primary" />
                </button>
                <button 
                  onClick={handleScrollRight}
                  className='p-2 bg-white rounded-full shadow-lg pointer-events-auto hover:bg-neutral-cream transition-colors'
                >
                  <FaAngleRight className="text-text-primary" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Details - Desktop */}
          <div className='hidden lg:block bg-white rounded-2xl shadow-sm p-6 border border-neutral-cream-dark'>
            <h3 className='font-heading font-semibold text-lg mb-4'>Product Details</h3>
            <div className='space-y-4'>
              <div>
                <h4 className='font-medium text-text-primary mb-1'>Description</h4>
                <p className='text-text-secondary'>{data.description}</p>
              </div>
              <div>
                <h4 className='font-medium text-text-primary mb-1'>Unit</h4>
                <p className='text-text-secondary'>{data.unit}</p>
              </div>
              {data?.more_details && Object.entries(data.more_details).map(([key, value]) => (
                <div key={key}>
                  <h4 className='font-medium text-text-primary mb-1'>{key}</h4>
                  <p className='text-text-secondary'>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className='space-y-6'>
          <div className='bg-white rounded-2xl shadow-sm p-6 border border-neutral-cream-dark'>
            <div className='flex items-center gap-2 mb-2'>
              <div className='flex items-center gap-1 text-xs text-primary-sage bg-primary-sage/10 px-2 py-1 rounded-full'>
                <FaLeaf className="text-xs" />
                <span>10 min delivery</span>
              </div>
              {data.discount > 0 && (
                <div className='text-xs text-secondary-terracotta bg-secondary-terracotta/10 px-2 py-1 rounded-full'>
                  {data.discount}% OFF
                </div>
              )}
            </div>

            <h1 className='text-2xl font-heading font-bold text-text-primary mb-2'>{data.name}</h1>
            <p className='text-text-secondary mb-4'>{data.unit}</p>

            <Divider />

            <div className='space-y-4'>
              <div>
                <h3 className='text-sm font-medium text-text-secondary mb-2'>Price</h3>
                <div className='flex items-baseline gap-3'>
                  <span className='text-2xl font-bold text-text-primary'>
                    {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
                  </span>
                  {data.discount > 0 && (
                    <>
                      <span className='text-text-secondary line-through'>
                        {DisplayPriceInRupees(data.price)}
                      </span>
                      <span className='text-sm text-secondary-terracotta'>
                        {data.discount}% off
                      </span>
                    </>
                  )}
                </div>
              </div>

              {data.stock === 0 ? (
                <p className='text-error font-medium'>Out of Stock</p>
              ) : (
                <AddToCartButton data={data} />
              )}
            </div>
          </div>

          {/* Why Shop With Us */}
          <div className='bg-white rounded-2xl shadow-sm p-6 border border-neutral-cream-dark'>
            <h3 className='font-heading font-semibold text-lg mb-6'>Why Shop With Us</h3>
            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <img
                  src={image1}
                  alt='Superfast Delivery'
                  className='w-16 h-16 object-contain'
                />
                <div>
                  <h4 className='font-medium text-text-primary mb-1'>Superfast Delivery</h4>
                  <p className='text-sm text-text-secondary'>Get your order delivered to your doorstep at the earliest from our stores near you.</p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <img
                  src={image2}
                  alt='Best Prices & Offers'
                  className='w-16 h-16 object-contain'
                />
                <div>
                  <h4 className='font-medium text-text-primary mb-1'>Best Prices & Offers</h4>
                  <p className='text-sm text-text-secondary'>Best price destination with offers directly from the manufacturers.</p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <img
                  src={image3}
                  alt='Wide Assortment'
                  className='w-16 h-16 object-contain'
                />
                <div>
                  <h4 className='font-medium text-text-primary mb-1'>Wide Assortment</h4>
                  <p className='text-sm text-text-secondary'>Choose from 5000+ products across food, personal care, household & other categories.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details - Mobile */}
          <div className='lg:hidden bg-white rounded-2xl shadow-sm p-6 border border-neutral-cream-dark'>
            <h3 className='font-heading font-semibold text-lg mb-4'>Product Details</h3>
            <div className='space-y-4'>
              <div>
                <h4 className='font-medium text-text-primary mb-1'>Description</h4>
                <p className='text-text-secondary'>{data.description}</p>
              </div>
              <div>
                <h4 className='font-medium text-text-primary mb-1'>Unit</h4>
                <p className='text-text-secondary'>{data.unit}</p>
              </div>
              {data?.more_details && Object.entries(data.more_details).map(([key, value]) => (
                <div key={key}>
                  <h4 className='font-medium text-text-primary mb-1'>{key}</h4>
                  <p className='text-text-secondary'>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDisplayPage
