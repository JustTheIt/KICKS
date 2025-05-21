import CartProductModel from "../models/cartproduct.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";
import mongoose from "mongoose";
import { generateEsewaSignature, generateEsewaFormData, validateEsewaPayment } from '../utils/esewa.utils.js';
import axios from 'axios';

export async function CashOnDeliveryOrderController(request,response){
    try {
        const userId = request.userId // auth middleware 
        const { list_items, totalAmt, addressId,subTotalAmt } = request.body 

        const payload = list_items.map(el => {
            return({
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : el.productId._id, 
                product_details : {
                    name : el.productId.name,
                    image : el.productId.image
                } ,
                paymentId : "",
                payment_status : "CASH ON DELIVERY",
                status: "pending",
                delivery_address : addressId ,
                subTotalAmt  : subTotalAmt,
                totalAmt  :  totalAmt,
            })
        })

        const generatedOrder = await OrderModel.insertMany(payload)

        ///remove from the cart
        const removeCartItems = await CartProductModel.deleteMany({ userId : userId })
        const updateInUser = await UserModel.updateOne({ _id : userId }, { shopping_cart : []})

        return response.json({
            message : "Order successfully",
            error : false,
            success : true,
            data : generatedOrder
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error ,
            error : true,
            success : false
        })
    }
}

export const pricewithDiscount = (price,dis = 1)=>{
    const discountAmout = Math.ceil((Number(price) * Number(dis)) / 100)
    const actualPrice = Number(price) - Number(discountAmout)
    return actualPrice
}

export async function paymentController(request, response) {
    try {
        const userId = request.userId;
        const { list_items, totalAmt, addressId, subTotalAmt } = request.body;

        // Debug log
        console.log('Payment Request:', {
            userId,
            list_items,
            totalAmt,
            addressId,
            subTotalAmt
        });

        // Validate required fields
        if (!list_items || !Array.isArray(list_items) || list_items.length === 0) {
            console.error('Invalid list_items:', list_items);
            return response.status(400).json({
                message: "Invalid or empty cart items",
                error: true,
                success: false
            });
        }

        if (!addressId) {
            console.error('Missing addressId');
            return response.status(400).json({
                message: "Please select a delivery address",
                error: true,
                success: false
            });
        }

        if (!totalAmt || !subTotalAmt || totalAmt <= 0 || subTotalAmt <= 0) {
            console.error('Invalid amounts:', { totalAmt, subTotalAmt });
            return response.status(400).json({
                message: "Invalid order amounts",
                error: true,
                success: false
            });
        }

        // Generate unique transaction ID for eSewa
        const transactionUuid = `esewa_${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        console.log('Generated transaction UUID:', transactionUuid);
        
        // Create orders immediately with pending status
        const payload = list_items.map(el => ({
            userId: userId,
            orderId: `ORD-${new mongoose.Types.ObjectId()}`,
            productId: el.productId._id,
            product_details: {
                name: el.productId.name,
                image: el.productId.image,
                price: el.productId.price,
                quantity: el.quantity
            },
            paymentId: transactionUuid,
            payment_status: 'pending',
            payment_method: 'Online Payment through Esewa',
            status: "pending",
            delivery_address: addressId,
            subTotalAmt: subTotalAmt,
            totalAmt: totalAmt,
        }));

        // Save orders to database
        const generatedOrder = await OrderModel.insertMany(payload);
        console.log('Created pending orders:', {
            count: generatedOrder.length,
            orderIds: generatedOrder.map(o => o._id)
        });

        // Generate eSewa form data
        const esewaFormData = generateEsewaFormData({
            amount: totalAmt.toString(),
            transaction_uuid: transactionUuid,
            success_url: `${process.env.FRONTEND_URL}/success?payment=success&transaction_uuid=${transactionUuid}`,
            failure_url: `${process.env.FRONTEND_URL}/success?payment=failed`
        });

        console.log('Generated eSewa form data:', esewaFormData);

        return response.json({
            message: "Orders created and payment initiated",
            error: false,
            success: true,
            data: {
                esewaConfig: {
                    ...esewaFormData,
                    product_service_charge: Number(esewaFormData.product_service_charge),
                    product_delivery_charge: Number(esewaFormData.product_delivery_charge),
                    tax_amount: Number(esewaFormData.tax_amount),
                    total_amount: Number(esewaFormData.total_amount),
                },
                orders: generatedOrder
            }
        });

    } catch (error) {
        console.error('Payment controller error:', {
            message: error.message,
            stack: error.stack,
            userId: request.userId,
            body: request.body
        });
        
        return response.status(500).json({
            message: error.message || "Payment processing failed",
            error: true,
            success: false
        });
    }
}

export const esewaCallback = async (req, res) => {
    console.log('=== eSewa Callback Started ===');
    console.log('Request Body:', req.body);
    
    try {
        const { data } = req.body;
        console.log('Esewa Callback Data:', {
            status: data?.status,
            transaction_uuid: data?.transaction_uuid,
            total_amount: data?.total_amount
        });

        if (!data) {
            console.error('No data received from eSewa');
            return res.status(400).json({
                success: false,
                message: 'No data received from eSewa'
            });
        }

        // Validate payment signature
        const isValid = validateEsewaPayment(data);
        console.log('Payment validation result:', isValid);
        
        if (!isValid) {
            console.error('Invalid payment signature');
            return res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }

        // Find all orders with this transaction_uuid
        const orders = await OrderModel.find({ 
            paymentId: data.transaction_uuid,
            payment_status: 'PENDING'
        });

        console.log('Found pending orders:', {
            count: orders?.length || 0,
            orderIds: orders?.map(o => o._id) || []
        });

        if (!orders || orders.length === 0) {
            console.error('No pending orders found for transaction:', data.transaction_uuid);
            return res.status(404).json({
                success: false,
                message: 'No pending orders found'
            });
        }

        // Update all orders for this transaction
        console.log('Updating orders...');
        const updatePromises = orders.map(order => 
            OrderModel.findByIdAndUpdate(
                order._id,
                { 
                    status: 'PROCESSING',
                    payment_status: 'PAID',
                    payment_details: data,
                    updatedAt: new Date()
                },
                { new: true }
            )
        );

        const updatedOrders = await Promise.all(updatePromises);
        console.log('Orders updated:', {
            count: updatedOrders.length,
            statuses: updatedOrders.map(o => ({
                id: o._id,
                status: o.status,
                payment_status: o.payment_status
            }))
        });

        // Clear the cart for successful payments
        const userId = orders[0].userId;
        console.log('Clearing cart for user:', userId);
        
        const cartResult = await CartProductModel.deleteMany({ userId });
        const userResult = await UserModel.updateOne(
            { _id: userId }, 
            { shopping_cart: [] }
        );
        
        console.log('Cart cleared:', {
            cartItemsRemoved: cartResult.deletedCount,
            userUpdated: userResult.modifiedCount
        });

        // Redirect to success page with orderId
        const redirectUrl = `${process.env.FRONTEND_URL}/success?payment=success&orderId=${orders[0]._id}`;
        console.log('Redirecting to:', redirectUrl);
        
        res.redirect(redirectUrl);
        console.log('=== eSewa Callback Completed ===');

    } catch (error) {
        console.error('Error in esewaCallback:', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            success: false,
            message: 'Error processing payment callback',
            error: error.message
        });
    }
}

// New endpoint for payment verification
export const verifyPayment = async (req, res) => {
    console.log('=== Payment Verification Started ===');
    try {
        const { transaction_uuid } = req.body;
        console.log('Verifying payment for transaction:', transaction_uuid);

        // Check payment status with eSewa
        const statusCheckUrl = `https://rc.esewa.com.np/api/epay/transaction/status/?product_code=${process.env.ESEWA_MERCHANT_CODE}&total_amount=${totalAmt}&transaction_uuid=${transaction_uuid}`;
        
        const statusResponse = await axios.get(statusCheckUrl);
        console.log('eSewa status check response:', statusResponse.data);

        if (statusResponse.data.status === 'COMPLETE') {
            // Find orders with this transaction_uuid
            const orders = await OrderModel.find({ 
                paymentId: transaction_uuid,
                payment_status: 'PENDING'
            });

            if (orders && orders.length > 0) {
                // Update orders to paid status
                const updatePromises = orders.map(order => 
                    OrderModel.findByIdAndUpdate(
                        order._id,
                        { 
                            status: 'PROCESSING',
                            payment_status: 'PAID',
                            payment_details: statusResponse.data,
                            updatedAt: new Date()
                        },
                        { new: true }
                    )
                );

                const updatedOrders = await Promise.all(updatePromises);
                console.log('Orders updated to paid:', {
                    count: updatedOrders.length,
                    orderIds: updatedOrders.map(o => o._id)
                });

                // Clear cart
                const userId = orders[0].userId;
                await CartProductModel.deleteMany({ userId });
                await UserModel.updateOne(
                    { _id: userId }, 
                    { shopping_cart: [] }
                );

                return res.json({
                    success: true,
                    orderId: orders[0]._id,
                    message: 'Payment verified and orders updated'
                });
            }
        }

        return res.json({
            success: false,
            message: 'Payment not found or not completed'
        });

    } catch (error) {
        console.error('Error in verifyPayment:', {
            message: error.message,
            stack: error.stack
        });
        return res.status(500).json({
            success: false,
            message: 'Error verifying payment',
            error: error.message
        });
    } finally {
        console.log('=== Payment Verification Completed ===');
    }
}

export async function getOrderDetailsController(request,response){
    try {
        const userId = request.userId // order id

        const orderlist = await OrderModel.find({ userId : userId }).sort({ createdAt : -1 }).populate('delivery_address')

        return response.json({
            message : "order list",
            data : orderlist,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function getAllOrdersController(request, response) {
    try {
        const orders = await OrderModel.find()
            .sort({ createdAt: -1 })
            .populate('delivery_address')
            .populate('userId', 'name mobile')

        return response.json({
            message: "All orders retrieved successfully",
            data: orders,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function updateOrderStatusController(request, response) {
    try {
        const { orderId } = request.params;
        const { status, cancellation_reason } = request.body;

        console.log('Updating order:', { orderId, status, cancellation_reason });

        const order = await OrderModel.findById(orderId);

        if (!order) {
            console.error('Order not found:', orderId);
            return response.status(404).json({
                message: "Order not found",
                error: true,
                success: false
            });
        }

        // Handle order cancellation
        if (status === 'cancelled') {
            // If order was paid online, initiate refund through eSewa
            if (order.payment_status === 'Online Payment through Esewa' && order.paymentId) {
                try {
                    // TODO: Implement eSewa refund API call here
                    // For now, we'll just update the status
                    order.payment_status = 'refunded';
                    order.refund_details = {
                        refund_date: new Date(),
                        refund_reason: cancellation_reason || 'Cancelled by admin'
                    };
                } catch (refundError) {
                    console.error('Refund failed:', refundError);
                    return response.status(500).json({
                        message: "Failed to process refund",
                        error: true,
                        success: false
                    });
                }
            }

            // Update product stock (add back to inventory)
            if (order.productId) {
                await ProductModel.findByIdAndUpdate(
                    order.productId,
                    { $inc: { stock: order.product_details.quantity || 1 } }
                );
            }

            // Update order status and cancellation reason
            order.status = 'cancelled';
            order.cancellation_reason = cancellation_reason || 'Cancelled by admin';
        } else {
            // For other status updates
            order.status = status;

            // If order is approved and payment is pending, clear the cart
            if (status === 'approved' && order.payment_status === 'pending') {
                const userId = order.userId;
                await CartProductModel.deleteMany({ userId });
                await UserModel.updateOne({ _id: userId }, { shopping_cart: [] });
            }
        }

        await order.save();

        return response.json({
            message: "Order status updated successfully",
            error: false,
            success: true,
            data: order
        });

    } catch (error) {
        console.error('Error updating order status:', error);
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
