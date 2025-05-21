import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useGlobalContext } from '../provider/GlobalProvider';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const method = searchParams.get('method');
    const [verifying, setVerifying] = useState(true);
    const [verified, setVerified] = useState(false);
    const { fetchCartItem, fetchOrder } = useGlobalContext();

    useEffect(() => {
        const verifyPayment = async () => {
            if (method === 'esewa') {
                try {
                    const data = Object.fromEntries(searchParams);
                    console.log('Verifying payment with data:', data);
                    
                    const response = await Axios({
                        ...SummaryApi.esewaCallback,
                        data: data
                    });

                    if (response.data.success) {
                        setVerified(true);
                        toast.success("Payment verified successfully!");
                        
                        // Refresh cart and order data
                        if (fetchCartItem) {
                            await fetchCartItem();
                        }
                        if (fetchOrder) {
                            await fetchOrder();
                        }
                    } else {
                        setVerified(false);
                        toast.error("Payment verification failed");
                    }
                } catch (error) {
                    console.error('Payment verification error:', error);
                    setVerified(false);
                    toast.error("Error verifying payment");
                } finally {
                    setVerifying(false);
                }
            }
        };

        verifyPayment();
    }, [method, searchParams, fetchCartItem, fetchOrder]);

    if (verifying) {
        return (
            <div className="min-h-screen bg-neutral-cream flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                    <h1 className="text-2xl font-bold mb-4">Verifying Payment...</h1>
                    <p>Please wait while we verify your payment.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-cream flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                {verified ? (
                    <>
                        <div className="text-green-500 text-5xl mb-4 flex justify-center">
                            <FaCheckCircle />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
                        <p className="mb-6">Thank you for your purchase. Your order has been confirmed.</p>
                    </>
                ) : (
                    <>
                        <div className="text-red-500 text-5xl mb-4 flex justify-center">
                            <FaTimesCircle />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Payment Verification Failed</h1>
                        <p className="mb-6">There was an issue verifying your payment. Please contact support.</p>
                    </>
                )}
                <button
                    onClick={() => navigate('/')}
                    className="bg-primary-sage text-white px-6 py-2 rounded-lg hover:bg-primary-sage/90 transition-colors"
                >
                    {verified ? 'Continue Shopping' : 'Return Home'}
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;