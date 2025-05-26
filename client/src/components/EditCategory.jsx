import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
// import { FaLeaf } from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError';

const EditCategory = ({close, fetchData, data: CategoryData}) => {
    const [data, setData] = useState({
        _id: CategoryData._id,
        name: CategoryData.name,
        image: CategoryData.image
    })
    const [loading, setLoading] = useState(false)

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateCategory,
                data: data
            })
            const { data: responseData } = response

            if(responseData.success) {
                toast.success(responseData.message)
                close()
                fetchData()
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    const handleUploadCategoryImage = async(e) => {
        const file = e.target.files[0]
        if(!file) {
            return
        }
        setLoading(true)
        const response = await uploadImage(file)
        const { data: ImageResponse } = response
        setLoading(false)
        
        setData((preve) => {
            return {
                ...preve,
                image: ImageResponse.data.url
            }
        })
    }

    return (
        <section className='fixed top-0 right-0 bottom-0 left-0 bg-neutral-800/70 z-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-lg bg-white rounded-xl p-6'>
                <div className='flex items-center justify-between mb-6'>
                    <div className='flex items-center gap-2'>
                        <TbCategoryPlus className="text-primary-sage text-xl" />
                        <h1 className='font-heading font-semibold text-lg text-text-primary'>Edit Category</h1>
                    </div>
                    <button onClick={close} className='text-text-secondary hover:text-text-primary transition-colors'>
                        <IoClose size={24} />
                    </button>
                </div>

                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div className='space-y-2'>
                        <label htmlFor='name' className='font-medium text-text-primary'>Name</label>
                        <input 
                            id='name'
                            name='name'
                            value={data.name}
                            onChange={handleOnChange}
                            className='w-full p-3 bg-neutral-cream border border-neutral-cream-dark rounded-lg outline-none focus:border-primary-sage transition-colors'
                            placeholder='Enter category name'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='font-medium text-text-primary'>Image</label>
                        <div className='flex flex-col lg:flex-row items-center gap-4'>
                            <div className='w-full lg:w-40 h-40 bg-neutral-cream border border-neutral-cream-dark rounded-lg flex items-center justify-center overflow-hidden'>
                                {!data.image ? (
                                    <p className='text-text-secondary text-sm'>No Image</p>
                                ) : (
                                    <img
                                        alt='category'
                                        src={data.image}
                                        className='w-full h-full object-cover'
                                    />
                                )}
                            </div>
                            <label htmlFor='uploadCategoryImage' className='w-full lg:w-auto'>
                                <div className='w-full px-4 py-3 border-2 border-primary-sage text-primary-sage rounded-lg hover:bg-primary-sage hover:text-white transition-colors cursor-pointer text-center font-medium'>
                                    Upload Image
                                </div>
                                <input 
                                    type='file'
                                    id='uploadCategoryImage'
                                    className='hidden'
                                    onChange={handleUploadCategoryImage}
                                />
                            </label>
                        </div>
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-medium transition-colors
                            ${data.name && data.image 
                                ? 'bg-primary-sage text-white hover:bg-primary-sage/90' 
                                : 'bg-neutral-cream-dark text-text-secondary cursor-not-allowed'
                            }
                        `}
                    >
                        {loading ? 'Updating...' : 'Update Category'}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default EditCategory
