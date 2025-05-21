import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye, FaLeaf } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import Logo from '../components/Logo';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.login,
                data: data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                localStorage.setItem('accesstoken', response.data.data.accesstoken)
                localStorage.setItem('refreshToken', response.data.data.refreshToken)

                const userDetails = await fetchUserDetails()
                dispatch(setUserDetails(userDetails.data))

                setData({
                    email: "",
                    password: "",
                })
                navigate("/")
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className='min-h-screen bg-neutral-cream flex items-center justify-center px-4 py-12'>
            <div className='w-full max-w-md'>
                <div className='bg-white rounded-2xl shadow-xl p-8 border border-neutral-cream-dark'>
                    <div className='flex flex-col items-center mb-8'>
                        <Logo className="mb-6" />
                        <h2 className='text-2xl font-heading font-bold text-text-primary'>Welcome Back</h2>
                        <p className='text-text-secondary text-center mt-2'>Sign in to continue your wellness journey</p>
                    </div>

                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div className='space-y-2'>
                            <label htmlFor='email' className='block text-sm font-medium text-text-primary'>Email</label>
                            <input
                                type='email'
                                id='email'
                                className='input-field'
                                name='email'
                                value={data.email}
                                onChange={handleChange}
                                placeholder='Enter your email'
                            />
                        </div>
                        
                        <div className='space-y-2'>
                            <label htmlFor='password' className='block text-sm font-medium text-text-primary'>Password</label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id='password'
                                    className='input-field'
                                    name='password'
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder='Enter your password'
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(preve => !preve)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors'
                                >
                                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                </button>
                            </div>
                            <Link 
                                to={"/forgot-password"} 
                                className='block text-sm text-primary-sage hover:text-primary-sage-dark text-right mt-1'
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button 
                            disabled={!valideValue} 
                            className={`w-full btn ${
                                valideValue 
                                    ? 'btn-primary' 
                                    : 'bg-gray-300 cursor-not-allowed'
                            }`}
                        >
                            <FaLeaf className="inline-block mr-2" />
                            Sign In
                        </button>
                    </form>

                    <p className='text-center mt-8 text-text-secondary'>
                        Don't have an account? {' '}
                        <Link 
                            to={"/register"} 
                            className='font-medium text-primary-sage hover:text-primary-sage-dark hover:underline'
                        >
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Login