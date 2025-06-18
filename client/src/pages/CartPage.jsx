import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { useGlobalContext } from '../provider/GlobalProvider';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import imageEmpty from '../assets/empty_cart.jpg'; // Assuming this path is correct based on DisplayCartItem
import { Link, useNavigate } from 'react-router-dom';
import { TbTruckDelivery } from 'react-icons/tb';
import { pricewithDiscount } from '../utils/PriceWithDiscount';

const CartPage = () => {
    const cartItems = useSelector(state => state.cartItem.cart);
    const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext(); // Assuming these are still relevant from the GlobalProvider
    const navigate = useNavigate();

    const handleProceedToCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className='bg-white rounded-xl p-8 flex flex-col justify-center items-center space-y-6'>
                    <img
                        src={imageEmpty}
                        className='w-48 h-48 object-contain'
                        alt="Empty Cart"
                    />
                    <p className='text-text-secondary text-center'>Your cart is empty</p>
                    <Link
                        to={"/"}
                        className='bg-primary-sage text-white px-6 py-2 rounded-full hover:bg-primary-sage/90 transition-colors'
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-white rounded-xl shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-4">Items</h2>
                        <div className="divide-y divide-neutral-cream-dark">
                            {cartItems.map(item => (
                                <CartItem key={item._id} item={item} />
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-1 bg-white rounded-xl shadow-md p-4 h-fit">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        {/* Section to display individual items in summary */}
                        {cartItems.length > 0 && (
                            <div className="border-b border-neutral-cream-dark pb-4 mb-4 space-y-2">
                                <h3 className="text-lg font-semibold">Items</h3>
                                {cartItems.map(item => (
                                    <div key={item._id + "summary"} className="flex justify-between items-center text-sm">
                                        <p className="text-text-secondary">{item.productId.name} ({item.quantity})</p>
                                        <p className="font-medium text-text-primary">{DisplayPriceInRupees(pricewithDiscount(item?.productId?.price, item?.productId?.discount) * item.quantity)}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className='space-y-2'>
                            <div className='flex justify-between items-center'>
                                <p className='text-text-secondary'>Items total ({totalQty})</p>
                                <div className='flex items-center gap-2'>
                                     {notDiscountTotalPrice !== totalPrice && (
                                        <span className='line-through text-text-secondary text-sm'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                                    )}
                                    <span className='font-medium text-text-primary'>{DisplayPriceInRupees(totalPrice)}</span>
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className='text-text-secondary'>Delivery Charge</p>
                                <div className='flex items-center gap-1 text-primary-sage'>
                                    <TbTruckDelivery className="text-sm" />
                                    <p className='font-medium'>Free</p>
                                </div>
                            </div>
                            <div className='border-t border-neutral-cream-dark pt-2 mt-2'>
                                <div className='flex justify-between items-center'>
                                    <p className='font-semibold text-text-primary'>Grand total</p>
                                    <p className='font-bold text-lg text-primary-sage'>{DisplayPriceInRupees(totalPrice)}</p>
                                </div>
                            </div>
                            {notDiscountTotalPrice !== totalPrice && (
                                <div className='flex justify-between items-center text-primary-sage text-sm font-medium'>
                                    <p>You saved</p>
                                    <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</p>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleProceedToCheckout}
                            className='w-full bg-primary-sage text-white px-4 py-3 rounded-xl font-medium hover:bg-primary-sage/90 transition-colors mt-6'
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage; 