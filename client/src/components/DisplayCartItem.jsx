import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { FaCaretRight } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import imageEmpty from '../assets/empty_cart.jpg'
import toast from 'react-hot-toast'

const DisplayCartItem = ({close}) => {
    const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const redirectToCheckoutPage = () => {
        if(user?._id){
            navigate("/checkout")
            if(close){
                close()
            }
            return
        }
        toast("Please Login")
    }

    return (
        <section className='bg-neutral-900/70 fixed top-0 bottom-0 right-0 left-0 z-50'>
            <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
                <div className='flex items-center p-4 border-b border-neutral-cream-dark gap-3 justify-between'>
                    <h2 className='font-heading font-semibold text-lg text-text-primary'>Your Cart</h2>
                    <Link to={"/"} className='lg:hidden'>
                        <IoClose size={25} className="text-text-secondary hover:text-text-primary transition-colors"/>
                    </Link>
                    <button onClick={close} className='hidden lg:block'>
                        <IoClose size={25} className="text-text-secondary hover:text-text-primary transition-colors"/>
                    </button>
                </div>

                <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-neutral-cream p-4 flex flex-col gap-4'>
                    {cartItem[0] ? (
                        <>
                            <div className='flex items-center justify-between px-4 py-2 bg-primary-sage/10 text-primary-sage rounded-full'>
                                <p className='font-medium'>Your total savings</p>
                                <p className='font-semibold'>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</p>
                            </div>

                            <div className='bg-white rounded-xl p-4 space-y-4 overflow-auto'>
                                {cartItem[0] && cartItem.map((item) => (
                                    <div key={item?._id+"cartItemDisplay"} className='flex gap-4 p-2 hover:bg-neutral-cream rounded-lg transition-colors'>
                                        <div className='w-20 h-20 min-h-20 min-w-20 bg-neutral-cream rounded-lg overflow-hidden border border-neutral-cream-dark'>
                                            <img
                                                src={item?.productId?.image[0]}
                                                className='w-full h-full object-scale-down p-2'
                                                alt={item?.productId?.name}
                                            />
                                        </div>
                                        <div className='flex-grow space-y-1'>
                                            <p className='text-sm font-medium text-text-primary line-clamp-2'>{item?.productId?.name}</p>
                                            <p className='text-xs text-text-secondary'>{item?.productId?.unit}</p>
                                            <p className='font-semibold text-primary-sage'>{DisplayPriceInRupees(pricewithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <AddToCartButton data={item?.productId}/>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='bg-white rounded-xl p-4 space-y-3'>
                                <h3 className='font-heading font-semibold text-text-primary'>Bill Details</h3>
                                <div className='space-y-2'>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-text-secondary'>Items total</p>
                                        <div className='flex items-center gap-2'>
                                            <span className='line-through text-text-secondary text-sm'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                                            <span className='font-medium text-text-primary'>{DisplayPriceInRupees(totalPrice)}</span>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-text-secondary'>Quantity total</p>
                                        <p className='font-medium text-text-primary'>{totalQty} items</p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-text-secondary'>Delivery Charge</p>
                                        <div className='flex items-center gap-1 text-primary-sage'>
                                            <TbTruckDelivery  className="text-sm" />
                                            <p className='font-medium'>Free</p>
                                        </div>
                                    </div>
                                    <div className='border-t border-neutral-cream-dark pt-2 mt-2'>
                                        <div className='flex justify-between items-center'>
                                            <p className='font-semibold text-text-primary'>Grand total</p>
                                            <p className='font-bold text-lg text-primary-sage'>{DisplayPriceInRupees(totalPrice)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='bg-white rounded-xl p-8 flex flex-col justify-center items-center space-y-6'>
                            <img
                                src={imageEmpty}
                                className='w-48 h-48 object-contain' 
                                alt="Empty Cart"
                            />
                            <p className='text-text-secondary text-center'>Your cart is empty</p>
                            <Link 
                                onClick={close} 
                                to={"/"} 
                                className='bg-primary-sage text-white px-6 py-2 rounded-full hover:bg-primary-sage/90 transition-colors'
                            >
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>

                {cartItem[0] && (
                    <div className='p-4 border-t border-neutral-cream-dark'>
                        <button 
                            onClick={redirectToCheckoutPage} 
                            className='w-full bg-primary-sage text-white px-4 py-3 rounded-xl font-medium hover:bg-primary-sage/90 transition-colors flex items-center justify-center gap-2'
                        >
                            <span>Proceed to Checkout</span>
                            <FaCaretRight/>
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default DisplayCartItem
