import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye, FaLeaf } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

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

        if(data.password !== data.confirmPassword){
            toast.error("Password and confirm password must match")
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data: data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                navigate("/login")
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
                        <h2 className='text-2xl font-heading font-bold text-text-primary'>Create Account</h2>
                        <p className='text-text-secondary text-center mt-2'>Join our community of natural wellness seekers</p>
                    </div>

                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div className='space-y-2'>
                            <label htmlFor='name' className='block text-sm font-medium text-text-primary'>Full Name</label>
                            <input
                                type='text'
                                id='name'
                                className='input-field'
                                name='name'
                                value={data.name}
                                onChange={handleChange}
                                placeholder='Enter your full name'
                            />
                        </div>
                        
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
                                    placeholder='Create a password'
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(preve => !preve)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors'
                                >
                                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                </button>
                            </div>
                        </div>
                        
                        <div className='space-y-2'>
                            <label htmlFor='confirmPassword' className='block text-sm font-medium text-text-primary'>Confirm Password</label>
                            <div className='relative'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id='confirmPassword'
                                    className='input-field'
                                    name='confirmPassword'
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    placeholder='Confirm your password'
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(preve => !preve)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors'
                                >
                                    {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                </button>
                            </div>
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
                            Create Account
                        </button>
                    </form>

                    <p className='text-center mt-8 text-text-secondary'>
                        Already have an account? {' '}
                        <Link 
                            to={"/login"} 
                            className='font-medium text-primary-sage hover:text-primary-sage-dark hover:underline'
                        >
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Register