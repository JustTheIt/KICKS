import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import DisplayTable from '../components/DisplayTable'
import { createColumnHelper } from '@tanstack/react-table'
import ViewImage from '../components/ViewImage'
import { FaLeaf } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import EditSubCategory from '../components/EditSubCategory'
import CofirmBox from '../components/CofirmBox'
import toast from 'react-hot-toast'

const SubCategoryPage = () => {
  const [openAddSubCategory,setOpenAddSubCategory] = useState(false)
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const columnHelper = createColumnHelper()
  const [ImageURL,setImageURL] = useState("")
  const [openEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({
    _id : ""
  })
  const [deleteSubCategory,setDeleteSubCategory] = useState({
      _id : ""
  })
  const [openDeleteConfirmBox,setOpenDeleteConfirmBox] = useState(false)

  const fetchSubCategory = async()=>{
    try {
        setLoading(true)
        const response = await Axios({
          ...SummaryApi.getSubCategory
        })
        const { data : responseData } = response

        if(responseData.success){
          setData(responseData.data)
        }
    } catch (error) {
       AxiosToastError(error)
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchSubCategory()
  },[])

  const column = [
    columnHelper.accessor('name',{
      header : "Name"
    }),
    columnHelper.accessor('image',{
      header : "Image",
      cell : ({row})=>{
        return <div className='flex justify-center items-center'>
            <img 
                src={row.original.image}
                alt={row.original.name}
                className='w-12 h-12 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity'
                onClick={()=>{
                  setImageURL(row.original.image)
                }}      
            />
        </div>
      }
    }),
    columnHelper.accessor("category",{
       header : "Category",
       cell : ({row})=>{
        return(
          <div className='flex flex-wrap gap-2'>
            {
              row.original.category.map((c,index)=>{
                return(
                  <span key={c._id+"table"} className='bg-neutral-cream px-3 py-1.5 rounded-full text-text-primary text-sm'>{c.name}</span>
                )
              })
            }
          </div>
        )
       }
    }),
    columnHelper.accessor("_id",{
      header : "Action",
      cell : ({row})=>{
        return(
          <div className='flex items-center justify-center gap-3'>
              <button 
                onClick={()=>{
                  setOpenEdit(true)
                  setEditData(row.original)
                }} 
                className='p-2 bg-primary-sage/10 rounded-full text-primary-sage hover:bg-primary-sage/20 transition-colors'
              >
                <HiPencil size={20}/>
              </button>
              <button 
                onClick={()=>{
                  setOpenDeleteConfirmBox(true)
                  setDeleteSubCategory(row.original)
                }} 
                className='p-2 bg-red-100 rounded-full text-red-500 hover:bg-red-200 transition-colors'
              >
                <MdDelete size={20}/>
              </button>
          </div>
        )
      }
    })
  ]

  const handleDeleteSubCategory = async()=>{
      try {
          const response = await Axios({
              ...SummaryApi.deleteSubCategory,
              data : deleteSubCategory
          })

          const { data : responseData } = response

          if(responseData.success){
             toast.success(responseData.message)
             fetchSubCategory()
             setOpenDeleteConfirmBox(false)
             setDeleteSubCategory({_id : ""})
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
            <h1 className='font-heading font-semibold text-lg text-text-primary'>Sub Categories</h1>
          </div>
          <button 
            onClick={()=>setOpenAddSubCategory(true)} 
            className='px-4 py-2 bg-primary-sage text-white rounded-lg font-medium hover:bg-primary-sage/90 transition-colors'
          >
            Add Sub Category
          </button>
        </div>

        <div className='overflow-auto w-full'>
          <DisplayTable
            data={data}
            column={column}
          />
        </div>

        {openAddSubCategory && (
          <UploadSubCategoryModel 
            close={()=>setOpenAddSubCategory(false)}
            fetchData={fetchSubCategory}
          />
        )}

        {ImageURL && (
          <ViewImage url={ImageURL} close={()=>setImageURL("")}/>
        )}

        {openEdit && (
          <EditSubCategory 
            data={editData} 
            close={()=>setOpenEdit(false)}
            fetchData={fetchSubCategory}
          />
        )}

        {openDeleteConfirmBox && (
          <CofirmBox 
            cancel={()=>setOpenDeleteConfirmBox(false)}
            close={()=>setOpenDeleteConfirmBox(false)}
            confirm={handleDeleteSubCategory}
          />
        )}
      </div>
    </section>
  )
}

export default SubCategoryPage
