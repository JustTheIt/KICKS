import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { AiOutlineProduct } from "react-icons/ai";
import { FaLeaf, FaSync, FaEye, FaCheck, FaTimes, FaFilePdf, FaBoxOpen } from 'react-icons/fa'
import CofirmBox from '../components/CofirmBox'
import { format } from 'date-fns'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const OrderManagement = () => {
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [openConfirmBox, setOpenConfirmBox] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [action, setAction] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [showOrderDetails, setShowOrderDetails] = useState(false)
    
    // Stats calculation
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        approvedOrders: 0,
        deliveredOrders: 0,
        cancelledOrders: 0
    })

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getAllOrders
            })
            const { data: responseData } = response

            if (responseData.success) {
                const ordersData = responseData.data || []
                setOrders(ordersData)
                calculateStats(ordersData)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    // Calculate statistics
    const calculateStats = (ordersData) => {
        const newStats = {
            totalOrders: ordersData.length,
            totalRevenue: 0,
            pendingOrders: 0,
            approvedOrders: 0,
            deliveredOrders: 0,
            cancelledOrders: 0
        }

        ordersData.forEach(order => {
            newStats.totalRevenue += order.totalAmt || 0
            switch(order.status) {
                case 'pending':
                    newStats.pendingOrders++
                    break
                case 'approved':
                    newStats.approvedOrders++
                    break
                case 'delivered':
                    newStats.deliveredOrders++
                    break
                case 'cancelled':
                    newStats.cancelledOrders++
                    break
            }
        })

        setStats(newStats)
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    useEffect(() => {
        if (statusFilter === 'all') {
            setFilteredOrders(orders)
        } else {
            setFilteredOrders(orders.filter(order => order.status === statusFilter))
        }
    }, [statusFilter, orders])

    const handleOrderAction = async () => {
        try {
            let newStatus
            switch(action) {
                case 'approve':
                    newStatus = 'approved'
                    break
                case 'cancel':
                    newStatus = 'cancelled'
                    break
                default:
                    newStatus = 'pending'
            }

            const response = await Axios({
                ...SummaryApi.updateOrderStatus,
                url: SummaryApi.updateOrderStatus.url.replace(':orderId', selectedOrder._id),
                data: {
                    status: newStatus,
                    cancellation_reason: action === 'cancel' ? 'Cancelled by admin' : undefined
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                fetchOrders()
                setOpenConfirmBox(false)
                setSelectedOrder(null)
                setAction('')
            }
        } catch (error) {
            console.error('Error updating order:', error)
            AxiosToastError(error)
        }
    }

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-blue-100 text-blue-800'
            case 'delivered':
                return 'bg-green-100 text-green-800'
            case 'cancelled':
                return 'bg-red-100 text-red-800'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const handleViewOrderDetails = (order) => {
        setSelectedOrder(order)
        setShowOrderDetails(true)
    }

    const handleCloseOrderDetails = () => {
        setShowOrderDetails(false)
        setSelectedOrder(null)
    }

    const handleActionClick = (order, actionType) => {
        setSelectedOrder(order)
        setAction(actionType)
        setOpenConfirmBox(true)
    }

    const downloadOrderAsPDF = () => {
        if (!selectedOrder) return

        const doc = new jsPDF()
        
        // Title
        doc.setFontSize(18)
        doc.text(`Order #${selectedOrder.orderId || selectedOrder._id?.slice(-6).toUpperCase()}`, 15, 20)
        
        // Order Info
        doc.setFontSize(12)
        doc.text(`Date: ${format(new Date(selectedOrder.createdAt), 'PPpp')}`, 15, 30)
        doc.text(`Status: ${selectedOrder.status}`, 15, 35)
        doc.text(`Payment Method: ${selectedOrder.paymentMethod || 'Unknown'}`, 15, 40)
        doc.text(`Payment Status: ${selectedOrder.payment_status || 'Pending'}`, 15, 45)
        
        // Customer Info
        doc.text(`Customer: ${selectedOrder.userId?.name || 'Guest'}`, 15, 55)
        doc.text(`Email: ${selectedOrder.userId?.email || 'N/A'}`, 15, 60)
        doc.text(`Phone: ${selectedOrder.userId?.mobile || 'N/A'}`, 15, 65)
        
        // Shipping Address
        if (selectedOrder.delivery_address) {
            doc.text(`Shipping Address:`, 15, 75)
            doc.text(`${selectedOrder.delivery_address.address_line || 'N/A'}`, 15, 80)
            doc.text(`${selectedOrder.delivery_address.city || ''}, ${selectedOrder.delivery_address.state || ''} - ${selectedOrder.delivery_address.pincode || ''}`, 15, 85)
            doc.text(`Mobile: ${selectedOrder.delivery_address.mobile || 'N/A'}`, 15, 90)
        }
        
        // Order Items
        doc.text('Order Items:', 15, 100)
        
        const items = selectedOrder.items || [{
            name: selectedOrder.product_details?.name || 'Product',
            price: selectedOrder.product_details?.price || selectedOrder.totalAmt,
            quantity: 1
        }]
        
        const tableData = items.map(item => [
            item.name,
            item.quantity,
            `Rs. ${item.price?.toFixed(2)}`,
            `Rs. ${(item.price * (item.quantity || 1)).toFixed(2)}`
        ])
        
        // Add total row
        tableData.push(['Total', '', '', `Rs. ${selectedOrder.totalAmt?.toFixed(2)}`])
        
        doc.autoTable({
            startY: 105,
            head: [['Item', 'Qty', 'Price', 'Total']],
            body: tableData,
            theme: 'grid',
            headStyles: {
                fillColor: [34, 139, 34] // Primary sage color
            }
        })
        
        doc.save(`order_${selectedOrder.orderId || selectedOrder._id?.slice(-6)}.pdf`)
    }

    return (
        <section className='container mx-auto px-4 py-6'>
            <div className='bg-white rounded-xl p-6 shadow-sm'>
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <AiOutlineProduct className="text-primary-sage text-xl" />
                        <h1 className="font-heading font-semibold text-2xl text-text-primary">Order Management</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:border-primary-sage focus:ring-primary-sage w-40"
                        >
                            <option value="all">All Orders</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <button
                            onClick={fetchOrders}
                            className="p-2 text-primary-sage hover:text-primary-sage-dark transition-colors"
                            title="Refresh Orders"
                        >
                            <FaSync size={20} />
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-blue-600">Total Orders</p>
                                <p className="text-xl font-bold text-blue-800">{stats.totalOrders}</p>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-full">
                                <FaBoxOpen className="text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-green-600">Total Revenue</p>
                                <p className="text-xl font-bold text-green-800">Rs. {stats.totalRevenue.toFixed(2)}</p>
                            </div>
                            <div className="bg-green-100 p-2 rounded-full">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-yellow-600">Pending Orders</p>
                                <p className="text-xl font-bold text-yellow-800">{stats.pendingOrders}</p>
                            </div>
                            <div className="bg-yellow-100 p-2 rounded-full">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-50 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-red-600">Cancelled Orders</p>
                                <p className="text-xl font-bold text-red-800">{stats.cancelledOrders}</p>
                            </div>
                            <div className="bg-red-100 p-2 rounded-full">
                                <FaTimes className="text-red-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                {loading ? (
                    <Loading />
                ) : filteredOrders.length === 0 ? (
                    <NoData message={orders.length === 0 ? "No orders found in system" : "No orders match current filters"} />
                ) : (
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {[...filteredOrders]
                                    .sort((a, b) => (a.userId?.name || '').localeCompare(b.userId?.name || '', undefined, { sensitivity: 'base' }))
                                    .map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <div className="text-sm font-medium text-gray-900">{order.userId?.name || 'Guest'}</div>
                                                <div className="text-sm text-gray-500">{order.userId?.email || order.userId?.mobile || ''}</div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className="text-sm font-medium text-gray-900">Rs. {order.totalAmt?.toFixed(2)}</span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {format(new Date(order.createdAt), 'PPp')}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-2">
                                                <button
                                                    onClick={() => handleViewOrderDetails(order)}
                                                    className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <FaEye size={16} />
                                                </button>
                                                
                                                {order.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleActionClick(order, 'approve')}
                                                            className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors"
                                                            title="Approve Order"
                                                        >
                                                            <FaCheck size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleActionClick(order, 'cancel')}
                                                            className="text-white bg-red-600 hover:bg-red-700 p-2 rounded-lg transition-colors"
                                                            title="Cancel Order"
                                                        >
                                                            <FaTimes size={16} />
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Order Details Modal */}
                {showOrderDetails && selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4 pb-4 border-b">
                                <h2 className="text-xl font-bold text-gray-800">
                                    Order #{(selectedOrder.orderId || selectedOrder._id?.slice(-6).toUpperCase())}
                                </h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={downloadOrderAsPDF}
                                        className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg transition-colors flex items-center gap-1"
                                    >
                                        <FaFilePdf size={14} />
                                        <span>Download PDF</span>
                                    </button>
                                    <button
                                        onClick={handleCloseOrderDetails}
                                        className="text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="text-md font-medium text-gray-800 mb-2">Order Information</h3>
                                        <div className="space-y-2">
                                            <p className="flex justify-between">
                                                <span className="text-gray-600">Date:</span>
                                                <span className="font-medium">{format(new Date(selectedOrder.createdAt), 'PPpp')}</span>
                                            </p>
                                            <p className="flex justify-between">
                                                <span className="text-gray-600">Status:</span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(selectedOrder.status)}`}>
                                                    {selectedOrder.status}
                                                </span>
                                            </p>
                                            {/* <p className="flex justify-between">
                                                <span className="text-gray-600">Payment Method:</span>
                                                <span className="font-medium">{selectedOrder.paymentMethod || 'Unknown'}</span>
                                            </p> */}
                                            <p className="flex justify-between">
                                                <span className="text-gray-600">Payment Status:</span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    selectedOrder.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {selectedOrder.payment_status || 'Pending'}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="text-md font-medium text-gray-800 mb-2">Customer Information</h3>
                                        <div className="space-y-2">
                                            <p className="flex justify-between">
                                                <span className="text-gray-600">Name:</span>
                                                <span className="font-medium">{selectedOrder.userId?.name || 'Guest'}</span>
                                            </p>
                                            <p className="flex justify-between">
                                                <span className="text-gray-600">Email:</span>
                                                <span className="font-medium">{selectedOrder.userId?.email || 'N/A'}</span>
                                            </p>
                                            <p className="flex justify-between">
                                                <span className="text-gray-600">Phone:</span>
                                                <span className="font-medium">{selectedOrder.userId?.mobile || 'N/A'}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {selectedOrder.delivery_address && (
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <h3 className="text-md font-medium text-gray-800 mb-2">Shipping Address</h3>
                                            <div className="space-y-2">
                                                <p className="text-gray-600">{selectedOrder.delivery_address.address_line || 'N/A'}</p>
                                                <p className="text-gray-600">
                                                    {selectedOrder.delivery_address.city || ''}, {selectedOrder.delivery_address.state || ''}
                                                </p>
                                                <p className="text-gray-600">{selectedOrder.delivery_address.pincode || ''}</p>
                                                <p className="text-gray-600">{selectedOrder.delivery_address.country || ''}</p>
                                                <p className="text-gray-600">
                                                    Mobile: {selectedOrder.delivery_address.mobile || 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="text-md font-medium text-gray-800 mb-2">Order Items</h3>
                                    <div className="space-y-4">
                                        {selectedOrder.items ? (
                                            selectedOrder.items.map((item, index) => (
                                                <div key={index} className="flex justify-between items-center border-b pb-4 last:border-0">
                                                    <div className="flex items-center space-x-4">
                                                        {item.image && (
                                                            <img 
                                                                src={item.image} 
                                                                alt={item.name}
                                                                className="w-16 h-16 object-cover rounded-lg"
                                                            />
                                                        )}
                                                        <div>
                                                            <p className="font-medium text-gray-900">{item.name}</p>
                                                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                                            <p className="text-sm text-gray-500">Price: Rs. {item.price?.toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-medium text-gray-900">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex justify-between items-center border-b pb-4">
                                                <div className="flex items-center space-x-4">
                                                    {selectedOrder.product_details?.image && (
                                                        <img 
                                                            src={selectedOrder.product_details.image} 
                                                            alt={selectedOrder.product_details.name}
                                                            className="w-16 h-16 object-cover rounded-lg"
                                                        />
                                                    )}
                                                    <div>
                                                        <p className="font-medium text-gray-900">{selectedOrder.product_details?.name || 'Product'}</p>
                                                        <p className="text-sm text-gray-500">Quantity: 1</p>
                                                        <p className="text-sm text-gray-500">Price: Rs. {selectedOrder.product_details?.price?.toFixed(2) || '0.00'}</p>
                                                    </div>
                                                </div>
                                                <p className="font-medium text-gray-900">Rs. {selectedOrder.totalAmt?.toFixed(2)}</p>
                                            </div>
                                        )}
                                        <div className="mt-4 pt-4 border-t">
                                            <div className="flex justify-between items-center text-md font-bold">
                                                <span>Total Amount:</span>
                                                <span>Rs. {selectedOrder.totalAmt?.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Confirmation Dialog */}
                {openConfirmBox && (
                    <CofirmBox
                        title={`${action === 'approve' ? 'Approve' : 'Cancel'} Order`}
                        message={`Are you sure you want to ${action} this order? This action cannot be undone.`}
                        confirm={handleOrderAction}
                        cancel={() => {
                            setOpenConfirmBox(false)
                            setSelectedOrder(null)
                            setAction('')
                        }}
                        close={() => {
                            setOpenConfirmBox(false)
                            setSelectedOrder(null)
                            setAction('')
                        }}
                    />
                )}
            </div>
        </section>
    )
}

export default OrderManagement