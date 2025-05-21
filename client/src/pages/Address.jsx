import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditAddressDetails from '../components/EditAddressDetails';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useGlobalContext } from '../provider/GlobalProvider';
import { FaMapMarkerAlt } from "react-icons/fa";

const Address = () => {
  const addressList = useSelector(state => state.addresses.addressList)
  const [openAddress,setOpenAddress] = useState(false)
  const [OpenEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({})
  const { fetchAddress} = useGlobalContext()

  const handleDisableAddress = async(id)=>{
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data : {
          _id : id
        }
      })
      if(response.data.success){
        toast.success("Address Removed")
        if(fetchAddress){
          fetchAddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <div className='container mx-auto px-4 py-8'>
        <div className='bg-white rounded-2xl shadow-sm p-6 border border-neutral-cream-dark mb-6'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                    <FaMapMarkerAlt className="text-primary-sage text-xl" />
                    <h2 className='font-heading font-semibold text-lg text-text-primary'>Saved Addresses</h2>
                </div>
                <button 
                    onClick={()=>setOpenAddress(true)} 
                    className='bg-primary-sage text-white px-4 py-2 rounded-full hover:bg-primary-sage/90 transition-colors flex items-center gap-2'
                >
                    <FaMapMarkerAlt className="text-sm" />
                    Add New Address
                </button>
            </div>
        </div>

        <div className='grid gap-4'>
            {addressList.map((address,index)=>{
                return(
                    <div key={address._id} className={`bg-white rounded-2xl shadow-sm p-6 border border-neutral-cream-dark ${!address.status && 'hidden'}`}>
                        <div className='flex justify-between items-start'>
                            <div className='space-y-2'>
                                <p className='text-text-primary'>{address.address_line}</p>
                                <p className='text-text-secondary'>{address.city}</p>
                                <p className='text-text-secondary'>{address.state}</p>
                                <p className='text-text-secondary'>{address.country} - {address.pincode}</p>
                                <p className='text-text-secondary'>{address.mobile}</p>
                            </div>
                            <div className='flex gap-3'>
                                <button 
                                    onClick={()=>{
                                        setOpenEdit(true)
                                        setEditData(address)
                                    }} 
                                    className='p-2 text-primary-sage bg-primary-sage/10 rounded-full hover:bg-primary-sage hover:text-white transition-colors'
                                >
                                    <MdEdit size={20}/>
                                </button>
                                <button 
                                    onClick={()=>handleDisableAddress(address._id)} 
                                    className='p-2 text-error bg-error/10 rounded-full hover:bg-error hover:text-white transition-colors'
                                >
                                    <MdDelete size={20}/>  
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
            
            <div 
                onClick={()=>setOpenAddress(true)} 
                className='bg-white rounded-2xl shadow-sm p-6 border-2 border-dashed border-neutral-cream-dark flex justify-center items-center cursor-pointer hover:border-primary-sage transition-colors'
            >
                <div className='flex items-center gap-2 text-primary-sage'>
                    <FaMapMarkerAlt className="text-xl" />
                    <span className='font-medium'>Add New Address</span>
                </div>
            </div>
        </div>

        {openAddress && (
            <AddAddress close={()=>setOpenAddress(false)}/>
        )}

        {OpenEdit && (
            <EditAddressDetails data={editData} close={()=>setOpenEdit(false)}/>
        )}
    </div>
  )
}

export default Address
