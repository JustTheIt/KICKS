import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { valideURLConvert } from '../utils/valideURLConvert'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import { TbTruckDelivery  } from "react-icons/tb"
import AddToCartButton from './AddToCartButton'

const CardProduct = ({data}) => {
    const url = `/product/${valideURLConvert(data.name)}-${data._id}`
  
    return (
        <Link to={url} className='group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-neutral-cream-dark h-[400px] flex flex-col'>
            <div className='relative h-48 w-full overflow-hidden bg-neutral-cream'>
                <img 
                    src={data.image[0]}
                    className='w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300'
                    alt={data.name}
                    onError={(e) => {
                        e.target.src = '/placeholder-product.png'
                        e.target.onerror = null
                    }}
                />
                {data.discount > 0 && (
                    <div className='absolute top-2 right-2 bg-secondary-terracotta text-white text-xs font-medium px-2 py-1 rounded-full'>
                        {data.discount}% OFF
                    </div>
                )}
            </div>
            
            <div className='p-4 space-y-2 flex-grow flex flex-col'>
                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-1.5 text-xs font-medium text-primary-sage bg-primary-sage/10 px-3 py-1.5 rounded-full border border-primary-sage/20'>
                        <TbTruckDelivery  className="text-xs" />
                        <span>5-7 Days</span>
                    </div>
                </div>

                <h3 className='font-medium text-text-primary line-clamp-2 group-hover:text-primary-sage transition-colors flex-grow'>
                    {data.name}
                </h3>

                <p className='text-sm text-text-secondary'>{data.unit}</p>

                <div className='flex items-center justify-between pt-2 mt-auto'>
                    <div className='space-y-1'>
                        <div className='font-semibold text-text-primary'>
                            {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
                        </div>
                        {data.discount > 0 && (
                            <div className='text-xs text-text-secondary line-through'>
                                {DisplayPriceInRupees(data.price)}
                            </div>
                        )}
                    </div>
                    
                    <div>
                        {data.stock === 0 ? (
                            <p className='text-sm text-error'>Out of stock</p>
                        ) : (
                            <AddToCartButton data={data} />
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardProduct
