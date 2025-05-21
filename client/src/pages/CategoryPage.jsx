import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import EditCategory from '../components/EditCategory'
import CofirmBox from '../components/CofirmBox'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { useSelector } from 'react-redux'
import { FaLeaf } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

const CategoryPage = () => {
    const [openUploadCategory,setOpenUploadCategory] = useState(false)
    const [loading,setLoading] = useState(false)
    const [categoryData,setCategoryData] = useState([])
    const [openEdit,setOpenEdit] = useState(false)
    const [editData,setEditData] = useState({
        name : "",
        image : "",
    })
    const [openConfimBoxDelete,setOpenConfirmBoxDelete] = useState(false)
    const [deleteCategory,setDeleteCategory] = useState({
        _id : ""
    })
    // const allCategory = useSelector(state => state.product.allCategory)


    // useEffect(()=>{
    //     setCategoryData(allCategory)
    // },[allCategory])
    
    const fetchCategory = async()=>{
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getCategory
            })
            const { data : responseData } = response

            if(responseData.success){
                setCategoryData(responseData.data)
            }
        } catch (error) {
            AxiosToastError(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCategory()
    },[])

    const handleDeleteCategory = async()=>{
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data : deleteCategory
            })

            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                fetchCategory()
                setOpenConfirmBoxDelete(false)
                setDeleteCategory({_id : ""})
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className='container mx-auto p-4'>
            <div className='bg-white rounded-xl p-6 shadow-sm'>
                <div className='flex items-center justify-between mb-6'>
                    <div className='flex items-center gap-2'>
                        <FaLeaf className="text-primary-sage text-xl" />
                        <h1 className='font-heading font-semibold text-lg text-text-primary'>Categories</h1>
                    </div>
                    <button 
                        onClick={()=>setOpenUploadCategory(true)} 
                        className='px-4 py-2 bg-primary-sage text-white rounded-lg font-medium hover:bg-primary-sage/90 transition-colors'
                    >
                        Add Category
                    </button>
                </div>

                {loading ? (
                    <Loading />
                ) : categoryData.length === 0 ? (
                    <NoData />
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {categoryData.map((category, index) => (
                            <div key={category._id + "category"} className='bg-neutral-cream rounded-lg p-4 flex items-center gap-4'>
                                <div className='w-16 h-16 rounded-lg overflow-hidden bg-white'>
                                    <img 
                                        src={category.image} 
                                        alt={category.name}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div className='flex-grow'>
                                    <h3 className='font-medium text-text-primary'>{category.name}</h3>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <button 
                                        onClick={() => {
                                            setOpenEdit(true)
                                            setEditData(category)
                                        }}
                                        className='p-2 bg-primary-sage/10 rounded-full text-primary-sage hover:bg-primary-sage/20 transition-colors'
                                    >
                                        <HiPencil size={20} />
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setOpenConfirmBoxDelete(true)
                                            setDeleteCategory(category)
                                        }}
                                        className='p-2 bg-red-100 rounded-full text-red-500 hover:bg-red-200 transition-colors'
                                    >
                                        <MdDelete size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {openUploadCategory && (
                    <UploadCategoryModel 
                        close={() => setOpenUploadCategory(false)}
                        fetchData={fetchCategory}
                    />
                )}

                {openEdit && (
                    <EditCategory 
                        data={editData}
                        close={() => setOpenEdit(false)}
                        fetchData={fetchCategory}
                    />
                )}

                {openConfimBoxDelete && (
                    <CofirmBox 
                        cancel={() => setOpenConfirmBoxDelete(false)}
                        close={() => setOpenConfirmBoxDelete(false)}
                        confirm={handleDeleteCategory}
                    />
                )}
            </div>
        </section>
    )
}

export default CategoryPage
