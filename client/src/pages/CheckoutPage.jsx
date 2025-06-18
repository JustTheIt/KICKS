import React, { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { MdShoppingCartCheckout } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaMapMarkerAlt, FaLeaf, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { pricewithDiscount } from '../utils/PriceWithDiscount';

const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, fetchOrder } = useGlobalContext()
  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList)
  const [selectAddress, setSelectAddress] = useState(0)
  const cartItemsList = useSelector(state => state.cartItem.cart)
  const navigate = useNavigate()

  const handleCashOnDelivery = async() => {
    try {
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        }
      })

      const { data: responseData } = response

      if(responseData.success) {
        toast.success(responseData.message)
        if(fetchCartItem) {
          fetchCartItem()
        }
        if(fetchOrder) {
          fetchOrder()
        }
        navigate('/success', {
          state: {
            text: "Order"
          }
        })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  const handleEsewaPayment = async () => {
    try {
      console.log('Starting eSewa payment...');
      
      // Validate address and cart
      if (!addressList[selectAddress]?._id) {
        toast.error("Please select a delivery address");
        return;
      }
      
      if (!cartItemsList?.length) {
        toast.error("Your cart is empty");
        return;
      }

      const requestData = {
        list_items: cartItemsList,
        addressId: addressList[selectAddress]?._id,
        subTotalAmt: totalPrice,
        totalAmt: totalPrice,
      };

      console.log('Making payment request with data:', requestData);
      console.log('API URL:', SummaryApi.paymentController.url);

      // 1. Create pending orders
      const response = await Axios({
        ...SummaryApi.paymentController,
        data: requestData
      });

      console.log('Payment response:', response);

      const { data: responseData } = response;

      if (responseData.success) {
        console.log('Creating eSewa form with config:', responseData.data.esewaConfig);
        
        // 2. Create and submit eSewa form
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

        // Add form fields
        const formData = responseData.data.esewaConfig;
        Object.keys(formData).forEach(key => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = formData[key];
          form.appendChild(input);
        });

        // Add form to document and submit
        document.body.appendChild(form);
        console.log('Submitting eSewa form...');
        form.submit();
      } else {
        console.error('Payment request failed:', responseData);
        toast.error(responseData.message || "Payment initiation failed");
      }
    } catch (error) {
      console.error('eSewa payment error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        toast.error(error.response.data.message || "Payment initiation failed");
      } else if (error.request) {
        console.error('No response received:', error.request);
        toast.error("No response from server. Please try again.");
      } else {
        console.error('Error setting up request:', error.message);
        toast.error("Failed to initiate payment. Please try again.");
      }
    }
  };

  return (
    <section className='bg-neutral-cream min-h-screen py-8'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col lg:flex-row gap-6'>
          {/* Address Section */}
          <div className='flex-grow space-y-4'>
            <div className='flex items-center gap-3 mb-4'>
              <FaMapMarkerAlt className="text-primary-sage text-xl" />
              <h2 className='font-heading font-semibold text-lg text-text-primary'>Choose your address</h2>
            </div>

            <div className='bg-white rounded-xl p-4 space-y-4'>
              {addressList.map((address, index) => (
                <label 
                  key={address._id} 
                  htmlFor={"address" + index} 
                  className={`block ${!address.status && "hidden"}`}
                >
                  <div className='border border-neutral-cream-dark rounded-xl p-4 hover:border-primary-sage transition-colors cursor-pointer'>
                    <div className='flex gap-4'>
                      <div className='pt-1'>
                        <input 
                          id={"address" + index} 
                          type='radio' 
                          value={index} 
                          onChange={(e) => setSelectAddress(e.target.value)} 
                          name='address'
                          className='w-4 h-4 text-primary-sage border-neutral-cream-dark focus:ring-primary-sage'
                        />
                      </div>
                      <div className='space-y-1'>
                        <p className='text-text-primary font-medium'>{address.address_line}</p>
                        <p className='text-text-secondary'>{address.city}</p>
                        <p className='text-text-secondary'>{address.state}</p>
                        <p className='text-text-secondary'>{address.country} - {address.pincode}</p>
                        <p className='text-text-secondary'>{address.mobile}</p>
                      </div>
                    </div>
                  </div>
                </label>
              ))}

              <div 
                onClick={() => setOpenAddress(true)} 
                className='border-2 border-dashed border-neutral-cream-dark rounded-xl p-4 flex items-center justify-center cursor-pointer hover:border-primary-sage transition-colors'
              >
                <div className='flex items-center gap-2 text-primary-sage'>
                  <FaMapMarkerAlt className="text-xl" />
                  <span className='font-medium'>Add New Address</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className='lg:w-[400px] space-y-4'>
            <div className='flex items-center gap-3 mb-4'>
              <MdShoppingCartCheckout className="text-primary-sage text-xl" />
              <h2 className='font-heading font-semibold text-lg text-text-primary'>Order Summary</h2>
            </div>

            <div className='bg-white rounded-xl p-6 space-y-4'>
              <h3 className='font-heading font-semibold text-text-primary'>Bill Details</h3>
              <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <p className='text-text-secondary'>Items total</p>
                  <div className='flex items-center gap-2'>
                    {/* Conditionally display original price if there's a discount */}
                    {notDiscountTotalPrice !== totalPrice && (
                      <span className='line-through text-text-secondary text-sm'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                    )}
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
                    <LiaShippingFastSolid className="text-sm" />
                    <p className='font-medium'>Free</p>
                  </div>
                </div>
                <div className='border-t border-neutral-cream-dark pt-3 mt-3'>
                  <div className='flex justify-between items-center'>
                    <p className='font-semibold text-text-primary'>Grand total</p>
                    <p className='font-bold text-lg text-primary-sage'>{DisplayPriceInRupees(totalPrice)}</p>
                  </div>
                </div>
              </div>

              <div className='space-y-3 pt-4'>
                <button 
                  onClick={handleEsewaPayment}
                  className="bg-primary-sage text-white px-6 py-2 rounded-lg hover:bg-primary-sage-dark transition-colors flex items-center justify-center gap-2"
                >
                  <FaCreditCard />
                  Pay Online through eSewa
                </button>

                <button 
                  onClick={handleCashOnDelivery} 
                  className='w-full border-2 border-primary-sage text-primary-sage px-4 py-3 rounded-xl font-medium hover:bg-primary-sage hover:text-white transition-colors flex items-center justify-center gap-2'
                >
                  <FaMoneyBillWave />
                  <span>Cash on Delivery</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openAddress && (
        <AddAddress close={() => setOpenAddress(false)} />
      )}
    </section>
  )
}

export default CheckoutPage
