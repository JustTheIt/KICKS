import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/productSlice';
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';
import { handleAddItemCart } from './store/cartProduct'
import { FaCartShopping } from "react-icons/fa6";
import CartMobileLink from './components/CartMobile';
import { useGlobalContext } from './provider/GlobalProvider';

// Separate component for handling payment status
const PaymentStatusHandler = () => {
  const location = useLocation();
  const { fetchCartItem, fetchOrder } = useGlobalContext();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paymentStatus = searchParams.get('payment');

    if (paymentStatus) {
      if (paymentStatus === 'success') {
        toast.success('Payment successful! Your order has been placed.');
        // Refresh cart and order data
        if (fetchCartItem) fetchCartItem();
        if (fetchOrder) fetchOrder();
      } else if (paymentStatus === 'failed') {
        toast.error('Payment failed. Please try again.');
      }
      // Remove payment status from URL
      window.history.replaceState({}, document.title, '/');
    }
  }, [location.search, fetchCartItem, fetchOrder]);

  return null;
};

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const fetchUser = async()=>{
      const userData = await fetchUserDetails()
      dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async()=>{
    try {
        dispatch(setLoadingCategory(true))
        const response = await Axios({
            ...SummaryApi.getCategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
        
    }finally{
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchSubCategory = async()=>{
    try {
        const response = await Axios({
            ...SummaryApi.getSubCategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
        
    }finally{
    }
  }

  useEffect(()=>{
    fetchUser()
    fetchCategory()
    fetchSubCategory()
  },[])

  return (
    <>
      <PaymentStatusHandler />
      <Header/>
      <main className='min-h-[78vh]'>
          <Outlet/>
      </main>
      <Footer/>
      <Toaster/>
      {
        location.pathname !== '/checkout' && (
          <CartMobileLink/>
        )
      }
    </>
  )
}

export default App
