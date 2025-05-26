import React, { useEffect, useState } from 'react'
import { FaUsers, FaFilePdf, FaSync, FaEye } from 'react-icons/fa'
import { HiPencil } from 'react-icons/hi'
import { MdDelete } from 'react-icons/md'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import CofirmBox from '../components/CofirmBox'
import { format } from 'date-fns'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const UserManagement = () => {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [openConfirmBox, setOpenConfirmBox] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [openStatusEdit, setOpenStatusEdit] = useState(false)
    const [showUserDetails, setShowUserDetails] = useState(false)

    // Stats calculation
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        inactiveUsers: 0,
        suspendedUsers: 0,
        adminUsers: 0,
        regularUsers: 0
    })

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getAllUsers
            })
            if (response.data.success) {
                const usersData = response.data.data || []
                setUsers(usersData)
                calculateStats(usersData)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    const calculateStats = (usersData) => {
        const newStats = {
            totalUsers: usersData.length,
            activeUsers: 0,
            inactiveUsers: 0,
            suspendedUsers: 0,
            adminUsers: 0,
            regularUsers: 0
        }

        usersData.forEach(user => {
            switch(user.status) {
                case 'Active':
                    newStats.activeUsers++
                    break
                case 'Inactive':
                    newStats.inactiveUsers++
                    break
                case 'Suspended':
                    newStats.suspendedUsers++
                    break
            }

            if (user.role === 'ADMIN') {
                newStats.adminUsers++
            } else {
                newStats.regularUsers++
            }
        })

        setStats(newStats)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleUpdateStatus = async (userId, newStatus) => {
        try {
            const response = await Axios({
                ...SummaryApi.updateUserStatus,
                data: { status: newStatus },
                url: SummaryApi.updateUserStatus.url.replace(':userId', userId)
            })
            if (response.data.success) {
                toast.success(response.data.message)
                fetchUsers()
                setOpenStatusEdit(false)
                setSelectedUser(null)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const handleDeleteUser = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteUser,
                url: SummaryApi.deleteUser.url.replace(':userId', selectedUser._id)
            })
            if (response.data.success) {
                toast.success(response.data.message)
                fetchUsers()
                setOpenConfirmBox(false)
                setSelectedUser(null)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const downloadUserAsPDF = () => {
        if (!selectedUser) return

        const doc = new jsPDF()
        
        // Title
        doc.setFontSize(18)
        doc.text(`User Details`, 15, 20)
        
        // User Info
        doc.setFontSize(12)
        doc.text(`Name: ${selectedUser.name}`, 15, 30)
        doc.text(`Email: ${selectedUser.email}`, 15, 35)
        doc.text(`Mobile: ${selectedUser.mobile || 'N/A'}`, 15, 40)
        doc.text(`Status: ${selectedUser.status}`, 15, 45)
        doc.text(`Role: ${selectedUser.role}`, 15, 50)
        doc.text(`Created At: ${format(new Date(selectedUser.createdAt), 'PPpp')}`, 15, 55)
        
        doc.save(`user_${selectedUser._id?.slice(-6)}.pdf`)
    }

    return (
        <section className='container mx-auto px-4 py-6'>
            <div className='bg-white rounded-xl p-6 shadow-sm'>
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <FaUsers className="text-primary-sage text-xl" />
                        <h1 className="font-heading font-semibold text-2xl text-text-primary">User Management Dashboard</h1>
                    </div>
                    <button
                        onClick={fetchUsers}
                        className="p-2 text-primary-sage hover:text-primary-sage-dark transition-colors"
                        title="Refresh Users"
                    >
                        <FaSync size={20} />
                    </button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-blue-600">Total Users</p>
                                <p className="text-xl font-bold text-blue-800">{stats.totalUsers}</p>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-full">
                                <FaUsers className="text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-green-600">Active Users</p>
                                <p className="text-xl font-bold text-green-800">{stats.activeUsers}</p>
                            </div>
                            <div className="bg-green-100 p-2 rounded-full">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-yellow-600">Inactive Users</p>
                                <p className="text-xl font-bold text-yellow-800">{stats.inactiveUsers}</p>
                            </div>
                            <div className="bg-yellow-100 p-2 rounded-full">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-purple-600">Admin Users</p>
                                <p className="text-xl font-bold text-purple-800">{stats.adminUsers}</p>
                            </div>
                            <div className="bg-purple-100 p-2 rounded-full">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                {loading ? (
                    <Loading />
                ) : users.length === 0 ? (
                    <NoData message="No users found in system" />
                ) : (
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200 table-auto w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {[...users]
                                    .sort((a, b) => (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' }))
                                    .map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50">
                                            <td className="px-2 py-3">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            </td>
                                            <td className="px-2 py-3">
                                                <div className="text-sm text-gray-900">{user.email}</div>
                                            </td>
                                            <td className="px-2 py-3 whitespace-nowrap">
                                                <span className="text-sm text-gray-900">{user.mobile || 'N/A'}</span>
                                            </td>
                                            <td className="px-2 py-3">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : user.status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-2 py-3 whitespace-nowrap">
                                                <span className="text-sm text-gray-900">{user.role}</span>
                                            </td>
                                            <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-900">
                                                {user.createdAt ? format(new Date(user.createdAt), 'PPpp') : 'N/A'}
                                            </td>
                                            <td className="px-2 py-3 whitespace-nowrap text-sm font-medium space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(user)
                                                        setShowUserDetails(true)
                                                    }}
                                                    className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <FaEye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(user)
                                                        setOpenStatusEdit(true)
                                                    }}
                                                    className="text-primary-sage hover:text-primary-sage-dark bg-primary-sage/10 hover:bg-primary-sage/20 p-2 rounded-lg transition-colors"
                                                    title="Edit Status"
                                                >
                                                    <HiPencil size={16} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(user)
                                                        setOpenConfirmBox(true)
                                                    }}
                                                    className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors"
                                                    title="Delete User"
                                                >
                                                    <MdDelete size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* User Details Modal */}
                {showUserDetails && selectedUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4 pb-4 border-b">
                                <h2 className="text-xl font-bold text-gray-800">User Details</h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={downloadUserAsPDF}
                                        className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg transition-colors flex items-center gap-1"
                                    >
                                        <FaFilePdf size={14} />
                                        <span>Download PDF</span>
                                    </button>
                                    <button
                                        onClick={() => setShowUserDetails(false)}
                                        className="text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="text-md font-medium text-gray-800 mb-2">Basic Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-600">Name</p>
                                            <p className="font-medium">{selectedUser.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Email</p>
                                            <p className="font-medium">{selectedUser.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Mobile</p>
                                            <p className="font-medium">{selectedUser.mobile || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Created At</p>
                                            <p className="font-medium">{format(new Date(selectedUser.createdAt), 'PPpp')}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="text-md font-medium text-gray-800 mb-2">Account Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-600">Status</p>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                selectedUser.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                selectedUser.status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {selectedUser.status}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Role</p>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                selectedUser.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                                {selectedUser.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Status Edit Modal */}
                {openStatusEdit && selectedUser && (
                    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
                        <div className='bg-white p-6 rounded-lg w-full max-w-md'>
                            <h3 className='font-semibold text-lg mb-4'>Update User Status</h3>
                            <div className='space-y-4'>
                                <select
                                    value={selectedUser.status}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                                    className='w-full p-2 border border-neutral-cream-dark rounded-lg'
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Suspended">Suspended</option>
                                </select>
                                <div className='flex justify-end gap-2'>
                                    <button
                                        onClick={() => {
                                            setOpenStatusEdit(false)
                                            setSelectedUser(null)
                                        }}
                                        className='px-4 py-2 text-text-secondary hover:text-text-primary'
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(selectedUser._id, selectedUser.status)}
                                        className='px-4 py-2 bg-primary-sage text-white rounded-lg hover:bg-primary-sage/90'
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Dialog */}
                {openConfirmBox && (
                    <CofirmBox
                        title="Delete User"
                        message="Are you sure you want to delete this user? This action cannot be undone."
                        confirm={handleDeleteUser}
                        cancel={() => {
                            setOpenConfirmBox(false)
                            setSelectedUser(null)
                        }}
                        close={() => {
                            setOpenConfirmBox(false)
                            setSelectedUser(null)
                        }}
                    />
                )}
            </div>
        </section>
    )
}

export default UserManagement