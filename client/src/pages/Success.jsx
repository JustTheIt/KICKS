import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaCheckCircle, FaLeaf, FaTimesCircle } from 'react-icons/fa'
import { GrReturn } from "react-icons/gr";
import { useDispatch } from 'react-redux'
import { clearCart } from '../store/cartProduct'
import { useGlobalContext } from '../provider/GlobalProvider'
import toast from 'react-hot-toast'

const Success = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { verifyPayment, loading } = useGlobalContext()
    const [isVerifying, setIsVerifying] = useState(false)
    const [verificationComplete, setVerificationComplete] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const paymentStatus = searchParams.get('payment')
        const transaction_uuid = searchParams.get('transaction_uuid')
        const orderId = searchParams.get('orderId')

        if (!paymentStatus) {
            navigate('/')
            return
        }

        const handlePayment = async () => {
            try {
                setIsVerifying(true)
                setError(null)

                if (orderId) {
                    // Order already exists, just clear cart and show success
                    dispatch(clearCart())
                    toast.success('Order placed successfully!')
                    setVerificationComplete(true)
                    setTimeout(() => navigate('/orders'), 3000)
                    return
                }

                if (paymentStatus === 'success' && transaction_uuid) {
                    const response = await verifyPayment(transaction_uuid)
                    
                    if (response?.success) {
                        dispatch(clearCart())
                        toast.success('Payment successful! Your order has been placed.')
                        setVerificationComplete(true)
                        setTimeout(() => navigate('/orders'), 3000)
                    } else {
                        throw new Error(response?.message || 'Payment verification failed')
                    }
                } else if (paymentStatus === 'failed') {
                    throw new Error('Payment failed or was cancelled')
                } else {
                    throw new Error('Invalid payment status')
                }
            } catch (error) {
                console.error('Payment processing error:', error)
                setError(error.message || 'There was an issue processing your payment.')
                toast.error(error.message || 'There was an issue processing your payment.')
                setVerificationComplete(true)
                setTimeout(() => navigate('/cart'), 3000)
            } finally {
                setIsVerifying(false)
            }
        }

        handlePayment()
    }, [location.search, verifyPayment, navigate, dispatch])

    if (isVerifying || loading) {
        return (
            <div className='min-h-screen bg-neutral-cream flex items-center justify-center p-4'>
                <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-neutral-cream-dark text-center'>
                    <div className='flex justify-center mb-6'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
                    </div>
                    <h2 className='text-2xl font-heading font-semibold text-primary-sage-dark mb-3'>
                        Verifying Payment...
                    </h2>
                    <p className='text-text-secondary'>
                        Please wait while we confirm your payment details.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-neutral-cream flex items-center justify-center p-4'>
            <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-neutral-cream-dark text-center'>
                {/* Status Icon */}
                <div className='flex justify-center mb-6'>
                    <div className='relative'>
                        {verificationComplete && !error ? (
                            <>
                                <FaCheckCircle className='text-green-500 text-6xl' />
                                {/* <FaLeaf className='text-primary-sage-dark text-xl absolute -bottom-1 -right-1' /> */}
                            </>
                        ) : (
                            <>
                                <FaTimesCircle className='text-red-500 text-6xl' />
                                <FaLeaf className='text-primary-sage-dark text-xl absolute -bottom-1 -right-1' />
                            </>
                        )}
                    </div>
                </div>

                {/* Status Message */}
                <h2 className='text-2xl font-heading font-semibold text-primary-sage-dark mb-3'>
                    {error ? 'Payment Error' : verificationComplete ? 'Payment Successful' : 'Processing Payment'}
                </h2>
                
                <p className='text-text-secondary mb-6'>
                    {error || (verificationComplete
                        ? "Redirecting you to the appropriate page..."
                        : "Please wait while we process your payment...")}
                </p>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <Link 
                        to="/" 
                        className="bg-primary-sage hover:bg-primary-sage-dark text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <GrReturn />
                        Return Home
                    </Link>
                    
                    {verificationComplete && !error && (
                        <Link 
                            to="/orders" 
                            className="border border-primary-sage text-primary-sage hover:bg-primary-sage hover:text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            View Orders
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Success