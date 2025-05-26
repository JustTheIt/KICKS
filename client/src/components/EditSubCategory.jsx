import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
// import { FaLeaf } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const EditSubCategory = ({close, data, fetchData}) => {
    const [subCategoryData, setSubCategoryData] = useState({
        _id: data._id,
        name: data.name,
        image: data.image,
        category: data.category || []
    })
    const allCategory = useSelector(state => state.product.allCategory)

    const handleChange = (e) => {
        const { name, value } = e.target 
        setSubCategoryData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadSubCategoryImage = async(e) => {
        const file = e.target.files[0]
        if(!file) {
            return
        }
        const response = await uploadImage(file)
        const { data: ImageResponse } = response
        setSubCategoryData((preve) => {
            return {
                ...preve,
                image: ImageResponse.data.url
            }
        })
    }

    const handleRemoveCategorySelected = (categoryId) => {
        const index = subCategoryData.category.findIndex(el => el._id === categoryId)
        subCategoryData.category.splice(index, 1)
        setSubCategoryData((preve) => {
            return {
                ...preve
            }
        })
    }

    const handleSubmitSubCategory = async(e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.updateSubCategory,
                data: subCategoryData
            })
            const { data: responseData } = response

            if(responseData.success) {
                toast.success(responseData.message)
                if(close) {
                    close()
                }
                if(fetchData) {
                    fetchData()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className='fixed top-0 right-0 bottom-0 left-0 bg-neutral-800/70 z-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-lg bg-white rounded-xl p-6'>
                <div className='flex items-center justify-between mb-6'>
                    <div className='flex items-center gap-2'>
                        <AiFillProduct className="text-primary-sage text-xl" />
                        <h1 className='font-heading font-semibold text-lg text-text-primary'>Edit Sub Category</h1>
                    </div>
                    <button onClick={close} className='text-text-secondary hover:text-text-primary transition-colors'>
                        <IoClose size={24} />
                    </button>
                </div>

                <form className='space-y-4' onSubmit={handleSubmitSubCategory}>
                    <div className='space-y-2'>
                        <label htmlFor='name' className='font-medium text-text-primary'>Name</label>
                        <input 
                            id='name'
                            name='name'
                            value={subCategoryData.name}
                            onChange={handleChange}
                            className='w-full p-3 bg-neutral-cream border border-neutral-cream-dark rounded-lg outline-none focus:border-primary-sage transition-colors'
                            placeholder='Enter sub category name'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='font-medium text-text-primary'>Image</label>
                        <div className='flex flex-col lg:flex-row items-center gap-4'>
                            <div className='w-full lg:w-40 h-40 bg-neutral-cream border border-neutral-cream-dark rounded-lg flex items-center justify-center overflow-hidden'>
                                {!subCategoryData.image ? (
                                    <p className='text-text-secondary text-sm'>No Image</p>
                                ) : (
                                    <img
                                        alt='subCategory'
                                        src={subCategoryData.image}
                                        className='w-full h-full object-cover'
                                    />
                                )}
                            </div>
                            <label htmlFor='uploadSubCategoryImage' className='w-full lg:w-auto'>
                                <div className='w-full px-4 py-3 border-2 border-primary-sage text-primary-sage rounded-lg hover:bg-primary-sage hover:text-white transition-colors cursor-pointer text-center font-medium'>
                                    Upload Image
                                </div>
                                <input 
                                    type='file'
                                    id='uploadSubCategoryImage'
                                    className='hidden'
                                    onChange={handleUploadSubCategoryImage}
                                />
                            </label>
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label className='font-medium text-text-primary'>Select Category</label>
                        <div className='border border-neutral-cream-dark rounded-lg overflow-hidden'>
                            <div className='p-3 flex flex-wrap gap-2 bg-neutral-cream'>
                                {subCategoryData.category.map((cat, index) => (
                                    <div key={cat._id + "selectedValue"} className='bg-white px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2'>
                                        <span className='text-text-primary'>{cat.name}</span>
                                        <button 
                                            type='button'
                                            onClick={() => handleRemoveCategorySelected(cat._id)} 
                                            className='text-text-secondary hover:text-red-500 transition-colors'
                                        >
                                            <IoClose size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <select
                                className='w-full p-3 bg-white outline-none border-t border-neutral-cream-dark'
                                onChange={(e) => {
                                    const value = e.target.value
                                    const categoryDetails = allCategory.find(el => el._id == value)
                                    
                                    setSubCategoryData((preve) => {
                                        return {
                                            ...preve,
                                            category: [...preve.category, categoryDetails]
                                        }
                                    })
                                }}
                            >
                                <option value="">Select Category</option>
                                {allCategory.map((category, index) => (
                                    <option value={category?._id} key={category._id + "subcategory"}>
                                        {category?.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        type='submit'
                        className={`w-full py-3 rounded-lg font-medium transition-colors
                            ${subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0]
                                ? 'bg-primary-sage text-white hover:bg-primary-sage/90'
                                : 'bg-neutral-cream-dark text-text-secondary cursor-not-allowed'
                            }
                        `}
                    >
                        Update Sub Category
                    </button>
                </form>
            </div>
        </section>
    )
}

export default EditSubCategory

