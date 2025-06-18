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
import OrderModel from '../models/order.model.js'

const orderRouter = Router()

orderRouter.post('/payment', auth, paymentController)
orderRouter.post('/cash-on-delivery', auth, CashOnDeliveryOrderController)
orderRouter.post('/esewa-callback', esewaCallback)
orderRouter.post('/verify-payment', auth, verifyPayment)
orderRouter.get('/order-list', auth, getOrderDetailsController)
orderRouter.get('/get-all-orders', auth, getAllOrdersController)
orderRouter.put('/update-status/:orderId', auth, updateOrderStatusController)
orderRouter.put('/:orderId/cancel', auth, async (req, res) => {
  console.log('[%s] Received cancel order request for order ID: %s', new Date().toISOString(), req.params.orderId); // Log start
  try {
    console.log('[%s] Attempting to find order by ID: %s', new Date().toISOString(), req.params.orderId); // Log before findById
    const order = await OrderModel.findById(req.params.orderId);
    console.log('[%s] Order find result: %s', new Date().toISOString(), order ? 'Found' : 'Not Found'); // Log after findById

    if (!order) {
      console.log('[%s] Order not found for ID: %s', new Date().toISOString(), req.params.orderId); // Log order not found
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log('[%s] Checking order status: %s', new Date().toISOString(), order.status); // Log before status check
    if (order.status !== 'pending') {
      console.log('[%s] Order status not pending: %s', new Date().toISOString(), order.status); // Log status check failure
      return res.status(400).json({ message: 'Only pending orders can be cancelled' });
    }
    console.log('[%s] Order status is pending.', new Date().toISOString()); // Log status check success

    order.status = 'cancelled';
    console.log('[%s] Attempting to save updated order status.', new Date().toISOString()); // Log before save
    await order.save();
    console.log('[%s] Order status updated and saved successfully.', new Date().toISOString()); // Log after save

    console.log('[%s] Sending success response.', new Date().toISOString()); // Log before success response
    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    console.error('[%s] Error in cancel order route handler for order ID %s: %s', new Date().toISOString(), req.params.orderId, error.message); // Log error
    res.status(500).json({ message: error.message || 'Server Error' });
  }
})

export default orderRouter