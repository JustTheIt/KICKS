import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'
import OrderCard from '../utils/OrderCard'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)

  const handleTrackOrder = (orderId) => {
    window.location.href = `/track-order/${orderId}`
  }

  const handleDownloadInvoice = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/invoice`)
      if (!response.ok) throw new Error('Failed to fetch invoice')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `invoice_${orderId}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      toast.success('Invoice downloaded successfully!')
    } catch (error) {
      toast.error('Failed to download invoice.')
      console.error(error)
    }
  }

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(`/api/order/${orderId}/cancel`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      })

      const responseData = await response.json(); // Read the response body

      if (!response.ok) {
        // Use the message from the backend response if available, otherwise use a default
        throw new Error(responseData.message || 'Failed to cancel order');
      }

      toast.success('Order cancelled successfully!')
      setTimeout(() => window.location.reload(), 1000) // Reload to reflect changes
    } catch (error) {
      // Display the error message received from the backend
      toast.error(error.message);
      console.error(error);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>
      {
        (!orders || orders.length === 0) ? (
          <NoData message="You haven't placed any orders yet." />
        ) : (
          orders.map(order => (
            <OrderCard
              key={order._id}
              order={order}
              onTrackOrder={handleTrackOrder}
              onDownloadInvoice={handleDownloadInvoice}
              onCancelOrder={handleCancelOrder}
            />
          ))
        )
      }
    </div>
  )
}

export default MyOrders
