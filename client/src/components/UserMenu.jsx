import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { HiOutlineExternalLink } from "react-icons/hi"
import isAdmin from '../utils/isAdmin'
import { FaUser, FaShoppingBag, FaMapMarkerAlt, FaSignOutAlt, FaUsers } from "react-icons/fa"

const UserMenu = ({ close }) => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.logout
            })
            if (response.data.success) {
                if (close) {
                    close()
                }
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)
                navigate("/")
            }
        } catch (error) {
            console.log(error)
            AxiosToastError(error)
        }
    }

    const handleClose = () => {
        if (close) {
            close()
        }
    }

    const menuItems = [
        {
            icon: <FaUser className="text-primary-sage" />,
            text: "Profile",
            link: "/dashboard/profile",
            show: true
        },
        {
            icon: <FaShoppingBag className="text-primary-sage" />,
            text: "My Orders",
            link: "/dashboard/myorders",
            show: true
        },
        {
            icon: <FaMapMarkerAlt className="text-primary-sage" />,
            text: "Save Address",
            link: "/dashboard/address",
            show: true
        },
        {
            icon: <FaUser className="text-primary-sage" />,
            text: "Category",
            link: "/dashboard/category",
            show: isAdmin(user.role)
        },
        {
            icon: <FaUser className="text-primary-sage" />,
            text: "Sub Category",
            link: "/dashboard/subcategory",
            show: isAdmin(user.role)
        },
        {
            icon: <FaUser className="text-primary-sage" />,
            text: "Upload Product",
            link: "/dashboard/upload-product",
            show: isAdmin(user.role)
        },
        {
            icon: <FaUser className="text-primary-sage" />,
            text: "Product",
            link: "/dashboard/product",
            show: isAdmin(user.role)
        },
        {
            icon: <FaShoppingBag className="text-primary-sage" />,
            text: "Order Management",
            link: "/dashboard/order-management",
            show: isAdmin(user.role)
        },
        {
            icon: <FaUsers className="text-primary-sage" />,
            text: "User Management",
            link: "/dashboard/user-management",
            show: isAdmin(user.role)
        }
    ]

    return (
        <div className='min-w-[200px]'>
            {/* User Info */}
            <div className='mb-4'>
                <div className='font-heading font-semibold text-lg text-primary-sage'>My Account</div>
                <div className='text-sm flex items-center gap-2 text-text-secondary'>
                    <span className='max-w-52 text-ellipsis line-clamp-1'>
                        {user.name || user.mobile}
                        {user.role === "ADMIN" && (
                            <span className='text-error ml-1'>(Admin)</span>
                        )}
                    </span>
                    <Link 
                        onClick={handleClose} 
                        to={"/dashboard/profile"} 
                        className='text-primary-sage hover:text-primary-sage-dark transition-colors'
                    >
                        <HiOutlineExternalLink size={15} />
                    </Link>
                </div>
            </div>

            <Divider />

            {/* Menu Items */}
            <div className='grid gap-1 mt-4'>
                {menuItems.map((item, index) => (
                    item.show && (
                        <Link
                            key={index}
                            onClick={handleClose}
                            to={item.link}
                            className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-neutral-cream transition-colors text-text-secondary hover:text-primary-sage'
                        >
                            {item.icon}
                            <span>{item.text}</span>
                        </Link>
                    )
                ))}

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-neutral-cream transition-colors text-text-secondary hover:text-error w-full text-left'
                >
                    <FaSignOutAlt className="text-error" />
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    )
}

export default UserMenu
