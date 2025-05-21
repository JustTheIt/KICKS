import React, { useState } from 'react'
import { FaCloudUploadAlt, FaLeaf } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';

const UploadProduct = () => {
  const [data,setData] = useState({
      name : "",
      image : [],
      category : [],
      subCategory : [],
      unit : "",
      stock : "",
      price : "",
      discount : "",
      description : "",
      more_details : {},
  })
  const [imageLoading,setImageLoading] = useState(false)
  const [ViewImageURL,setViewImageURL] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory,setSelectCategory] = useState("")
  const [selectSubCategory,setSelectSubCategory] = useState("")
  const allSubCategory = useSelector(state => state.product.allSubCategory)
  const [openAddField,setOpenAddField] = useState(false)
  const [fieldName,setFieldName] = useState("")

  const handleChange = (e)=>{
    const { name, value} = e.target 

    setData((preve)=>{
      return{
          ...preve,
          [name]  : value
      }
    })
  }

  const handleUploadImage = async(e)=>{
    const file = e.target.files[0]

    if(!file){
      return 
    }
    setImageLoading(true)
    const response = await uploadImage(file)
    const { data : ImageResponse } = response
    const imageUrl = ImageResponse.data.url 

    setData((preve)=>{
      return{
        ...preve,
        image : [...preve.image,imageUrl]
      }
    })
    setImageLoading(false)
  }

  const handleDeleteImage = async(index)=>{
      data.image.splice(index,1)
      setData((preve)=>{
        return{
            ...preve
        }
      })
  }

  const handleRemoveCategory = async(index)=>{
    data.category.splice(index,1)
    setData((preve)=>{
      return{
        ...preve
      }
    })
  }

  const handleRemoveSubCategory = async(index)=>{
      data.subCategory.splice(index,1)
      setData((preve)=>{
        return{
          ...preve
        }
      })
  }

  const handleAddField = ()=>{
    setData((preve)=>{
      return{
          ...preve,
          more_details : {
            ...preve.more_details,
            [fieldName] : ""
          }
      }
    })
    setFieldName("")
    setOpenAddField(false)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try {
      const response = await Axios({
          ...SummaryApi.createProduct,
          data : data
      })
      const { data : responseData} = response

      if(responseData.success){
          successAlert(responseData.message)
          setData({
            name : "",
            image : [],
            category : [],
            subCategory : [],
            unit : "",
            stock : "",
            price : "",
            discount : "",
            description : "",
            more_details : {},
          })
      }
    } catch (error) {
        AxiosToastError(error)
    }
  }

  return (
    <section className='container mx-auto p-4'>
      <div className='bg-white rounded-xl p-6 shadow-sm'>
        <div className='flex items-center gap-2 mb-6'>
          <FaLeaf className="text-primary-sage text-xl" />
          <h1 className='font-heading font-semibold text-lg text-text-primary'>Add New Product</h1>
        </div>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <label htmlFor='name' className='font-medium text-text-primary'>Name</label>
            <input
              id='name'
              type='text'
              placeholder='Enter product name'
              name='name'
              value={data.name}
              onChange={handleChange}
              required
              className='w-full p-3 bg-neutral-cream border border-neutral-cream-dark rounded-lg outline-none focus:border-primary-sage transition-colors'
            />
          </div>

          <div className='space-y-2'>
            <label className='font-medium text-text-primary'>Images</label>
            <div className='flex flex-col lg:flex-row items-center gap-4'>
              <div className='w-full lg:w-40 h-40 bg-neutral-cream border border-neutral-cream-dark rounded-lg flex items-center justify-center overflow-hidden'>
                {data.image.length === 0 ? (
                  <p className='text-text-secondary text-sm'>No Images</p>
                ) : (
                  <img
                    src={data.image[0]}
                    alt={data.name}
                    className='w-full h-full object-cover'
                  />
                )}
              </div>
              <label htmlFor='uploadImage' className='w-full lg:w-auto'>
                <div className='w-full px-4 py-3 border-2 border-primary-sage text-primary-sage rounded-lg hover:bg-primary-sage hover:text-white transition-colors cursor-pointer text-center font-medium flex items-center justify-center gap-2'>
                  <FaCloudUploadAlt />
                  <span>Upload Images</span>
                </div>
                <input
                  type='file'
                  id='uploadImage'
                  className='hidden'
                  onChange={handleUploadImage}
                />
              </label>
            </div>

            <div className='flex flex-wrap gap-4 mt-4'>
              {data.image.map((img, index) => (
                <div key={img + index} className='relative group'>
                  <div className='h-24 w-24 bg-neutral-cream border border-neutral-cream-dark rounded-lg overflow-hidden'>
                    <img
                      src={img}
                      alt={img}
                      className='w-full h-full object-cover cursor-pointer'
                      onClick={() => setViewImageURL(img)}
                    />
                  </div>
                  <button
                    type='button'
                    onClick={() => handleDeleteImage(index)}
                    className='absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    <MdDelete size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className='space-y-2'>
            <label className='font-medium text-text-primary'>Category</label>
            <div>
              <select
                className='w-full p-3 bg-neutral-cream border border-neutral-cream-dark rounded-lg outline-none focus:border-primary-sage transition-colors'
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const category = allCategory.find(el => el._id === value)
                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, category],
                    }
                  })
                  setSelectCategory("")
                }}
              >
                <option value="">Select Category</option>
                {allCategory.map((c, index) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
              <div className='flex flex-wrap gap-2 mt-2'>
                {data.category.map((c, index) => (
                  <div key={c._id + index + "productsection"} className='bg-neutral-cream px-3 py-1.5 rounded-full flex items-center gap-2'>
                    <span className='text-text-primary'>{c.name}</span>
                    <button
                      type='button'
                      onClick={() => handleRemoveCategory(index)}
                      className='text-text-secondary hover:text-red-500 transition-colors'
                    >
                      <IoClose size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <label className='font-medium text-text-primary'>Sub Category</label>
            <div>
              <select
                className='w-full p-3 bg-neutral-cream border border-neutral-cream-dark rounded-lg outline-none focus:border-primary-sage transition-colors'
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const subCategory = allSubCategory.find(el => el._id === value)
                  setData((preve) => {
                    return {
                      ...preve,
                      subCategory: [...preve.subCategory, subCategory]
                    }
                  })
                  setSelectSubCategory("")
                }}
              >
                <option value="">Select Sub Category</option>
                {allSubCategory.map((c, index) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
              <div className='flex flex-wrap gap-2 mt-2'>
                {data.subCategory.map((c, index) => (
                  <div key={c._id + index + "productsection"} className='bg-neutral-cream px-3 py-1.5 rounded-full flex items-center gap-2'>
                    <span className='text-text-primary'>{c.name}</span>
                    <button
                      type='button'
                      onClick={() => handleRemoveSubCategory(index)}
                      className='text-text-secondary hover:text-red-500 transition-colors'
                    >
                      <IoClose size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label htmlFor='unit' className='font-medium text-text-primary'>Unit</label>
              <input
                id='unit'
                type='text'
                placeholder='Enter product unit'
                name='unit'
                value={data.unit}
                onChange={handleChange}
                required
                className='w-full p-3 bg-neutral-cream border border-neutral-cream-dark rounded-lg outline-none focus:border-primary-sage transition-colors'
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='stock' className='font-medium text-text-primary'>Number of Stock</label>
              <input
                id='stock'
                type='number'
                placeholder='Enter product stock'
                name='stock'
                value={data.stock}
                onChange={handleChange}
                required
                className='w-full p-3 bg-neutral-cream border border-neutral-cream-dark rounded-lg outline-none focus:border-primary-sage transition-colors'
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='price' className='font-medium text-text-primary'>Price</label>
              <input
                id='price'
                type='number'
                placeholder='Enter product price'
                name='price'
                value={data.price}
                onChange={handleChange}
                required
                className='w-full p-3 bg-neutral-cream border border-neutral-cream-dark rounded-lg outline-none focus:border-primary-sage transition-colors'
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='discount' className='font-medium text-text-primary'>Discount</label>
              <input
                id='discount'
                type='number'
                placeholder='Enter product discount'
                name='discount'
                value={data.discount}
                onChange={handleChange}
                required
                className='w-full p-3 bg-neutral-cream border border-neutral-cream-dark rounded-lg outline-none focus:border-primary-sage transition-colors'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label htmlFor='description' className='font-medium text-text-primary'>Description</label>
            <textarea
              id='description'
              placeholder='Enter product description'
              name='description'
              value={data.description}
              onChange={handleChange}
              required
              rows={4}
              className='w-full p-3 bg-neutral-cream border border-neutral-cream-dark rounded-lg outline-none focus:border-primary-sage transition-colors resize-none'
            />
          </div>

          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <label className='font-medium text-text-primary'>More Details</label>
              <button
                type='button'
                onClick={() => setOpenAddField(true)}
                className='text-primary-sage hover:text-primary-sage/80 transition-colors'
              >
                Add Field
              </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {Object.entries(data.more_details).map(([key, value], index) => (
                <div key={key + index} className='space-y-2'>
                  <label className='font-medium text-text-primary'>{key}</label>
                  <input
                    type='text'
                    value={value}
                    onChange={(e) => {
                      setData((preve) => {
                        return {
                          ...preve,
                          more_details: {
                            ...preve.more_details,
                            [key]: e.target.value
                          }
                        }
                      })
                    }}
                    className='w-full p-3 bg-neutral-cream border border-neutral-cream-dark rounded-lg outline-none focus:border-primary-sage transition-colors'
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type='submit'
            className='w-full py-3 bg-primary-sage text-white rounded-lg font-medium hover:bg-primary-sage/90 transition-colors'
          >
            Add Product
          </button>
        </form>

        {ViewImageURL && (
          <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
        )}

        {openAddField && (
          <AddFieldComponent
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            submit={handleAddField}
            close={() => setOpenAddField(false)}
          />
        )}
      </div>
    </section>
  )
}

export default UploadProduct
