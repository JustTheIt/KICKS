import React from 'react';
import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem } from '../store/cartProduct';
import { useGlobalContext } from '../provider/GlobalProvider';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import { IoClose } from 'react-icons/io5';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const { updateCartItem, deleteCartItem } = useGlobalContext();

    const handleIncrementQuantity = async () => {
        // Update local state first
        dispatch(incrementQuantity(item._id));
        // Update backend
        await updateCartItem(item._id, item.quantity + 1);
    };

    const handleDecrementQuantity = async () => {
        if (item.quantity > 1) {
            // Update local state first
            dispatch(decrementQuantity(item._id));
            // Update backend
            await updateCartItem(item._id, item.quantity - 1);
        } else {
            // If quantity is 1, remove item
            handleRemoveItem();
        }
    };

    const handleRemoveItem = async () => {
        // Update local state first
        dispatch(removeItem(item._id));
        // Update backend
        await deleteCartItem(item._id);
    };

    const priceAfterDiscount = pricewithDiscount(item?.productId?.price, item?.productId?.discount);

    return (
        <div className='flex gap-4 p-4 border-b border-neutral-cream-dark last:border-b-0 items-center'>
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
                <p className='font-semibold text-primary-sage'>{DisplayPriceInRupees(priceAfterDiscount)}</p>
            </div>
            <div className='flex items-center gap-2'>
                <button 
                    className='border border-neutral-cream-dark rounded-md px-2 py-1 text-text-secondary hover:bg-neutral-cream-dark transition-colors disabled:opacity-50'
                    onClick={handleDecrementQuantity}
                    disabled={item.quantity === 0}
                >
                    -
                </button>
                <span className='font-medium'>{item.quantity}</span>
                <button 
                    className='border border-neutral-cream-dark rounded-md px-2 py-1 text-text-secondary hover:bg-neutral-cream-dark transition-colors'
                    onClick={handleIncrementQuantity}
                >
                    +
                </button>
            </div>
            <button 
                className='text-text-secondary hover:text-red-600 transition-colors'
                onClick={handleRemoveItem}
            >
                <IoClose size={20} />
            </button>
        </div>
    );
};

export default CartItem; 