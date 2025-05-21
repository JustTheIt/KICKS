import { Router } from 'express'
import auth from '../middleware/auth.js'
import { isAdmin } from '../middleware/auth.middleware.js'
import { 
    CashOnDeliveryOrderController, 
    getOrderDetailsController, 
    paymentController, 
    esewaCallback,
    getAllOrdersController,
    updateOrderStatusController,
    verifyPayment
} from '../controllers/order.controller.js'

const orderRouter = Router()

orderRouter.post('/payment', auth, paymentController)
orderRouter.post('/cash-on-delivery', auth, CashOnDeliveryOrderController)
orderRouter.post('/esewa-callback', esewaCallback)
orderRouter.post('/verify-payment', auth, verifyPayment)
orderRouter.get('/order-list', auth, getOrderDetailsController)
orderRouter.get('/get-all-orders', auth, getAllOrdersController)
orderRouter.put('/update-status/:orderId', auth, updateOrderStatusController)

// routes/orderRoutes.js
// orderRouter.put('/cancel/:id', protect, async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id)
//     if (!order) return res.status(404).json({ message: 'Order not found' })

//     if (order.status !== 'pending') {
//       return res.status(400).json({ message: 'Only pending orders can be cancelled' })
//     }

//     order.status = 'cancelled'
//     await order.save()

//     res.json({ message: 'Order cancelled successfully', order })
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' })
//   }
// })


export default orderRouter