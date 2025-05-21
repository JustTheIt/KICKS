import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';
import { FaUser } from "react-icons/fa";

const Profile = () => {
    const user = useSelector(state => state.user)
    const [openProfileAvatarEdit,setProfileAvatarEdit] = useState(false)
    const [userData,setUserData] = useState({
        name : user.name,
        email : user.email,
        mobile : user.mobile,
    })
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        setUserData({
            name : user.name,
            email : user.email,
            mobile : user.mobile,
        })
    },[user])

    const handleOnChange  = (e)=>{
        const { name, value} = e.target 
        setUserData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateUserDetails,
                data : userData
            })

            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }

        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }
    }
  
    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='bg-white rounded-2xl shadow-sm p-6 border border-neutral-cream-dark mb-6'>
                <div className='flex items-center gap-3 mb-6'>
                    <FaUser className="text-primary-sage text-xl" />
                    <h2 className='font-heading font-semibold text-lg text-text-primary'>Profile Information</h2>
                </div>

                {/* Profile Avatar */}
                <div className='flex flex-col items-center mb-8'>
                    <div className='w-24 h-24 bg-neutral-cream flex items-center justify-center rounded-full overflow-hidden border-2 border-primary-sage/20'>
                        {user.avatar ? (
                            <img 
                                alt={user.name}
                                src={user.avatar}
                                className='w-full h-full object-cover'
                            />
                        ) : (
                            <FaRegUserCircle size={80} className="text-primary-sage/40"/>
                        )}
                    </div>
                    <button 
                        onClick={()=>setProfileAvatarEdit(true)} 
                        className='mt-4 bg-primary-sage/10 text-primary-sage px-4 py-2 rounded-full hover:bg-primary-sage hover:text-white transition-colors'
                    >
                        Change Photo
                    </button>
                </div>

                {/* Profile Form */}
                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div className='space-y-2'>
                        <label className='text-text-primary font-medium'>Full Name</label>
                        <input
                            type='text'
                            placeholder='Enter your name' 
                            className='w-full p-3 bg-neutral-cream border border-neutral-cream-dark rounded-lg focus:border-primary-sage focus:ring-1 focus:ring-primary-sage outline-none transition-colors'
                            value={userData.name}
                            name='name'
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-text-primary font-medium'>Email Address</label>
                        <input
                            type='email'
                            placeholder='Enter your email' 
                            className='w-full p-3 bg-neutral-cream border border-neutral-cream-dark rounded-lg focus:border-primary-sage focus:ring-1 focus:ring-primary-sage outline-none transition-colors'
                            value={userData.email}
                            name='email'
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-text-primary font-medium'>Mobile Number</label>
                        <input
                            type='text'
                            placeholder='Enter your mobile number' 
                            className='w-full p-3 bg-neutral-cream border border-neutral-cream-dark rounded-lg focus:border-primary-sage focus:ring-1 focus:ring-primary-sage outline-none transition-colors'
                            value={userData.mobile}
                            name='mobile'
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    <button 
                        type='submit'
                        className='w-full bg-primary-sage text-white py-3 rounded-lg font-medium hover:bg-primary-sage/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={loading}
                    >
                        {loading ? "Saving Changes..." : "Save Changes"}
                    </button>
                </form>
            </div>

            {openProfileAvatarEdit && (
                <UserProfileAvatarEdit close={()=>setProfileAvatarEdit(false)}/>
            )}
        </div>
    )
}

export default Profile
