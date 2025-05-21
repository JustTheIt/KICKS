import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    orderId: {
        type: String,
        required: [true, "Provide orderId"],
        unique: true
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
        required: true
    },
    product_details: {
        name: String,
        image: Array,
        price: Number,
        quantity: Number
    },
    paymentId: {
        type: String,
        default: ""
    },
    payment_status: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded', 'CASH ON DELIVERY', 'Online Payment through Esewa'],
        default: 'pending'
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'cancelled', 'delivered', 'processing'],
        default: 'pending'
    },
    delivery_address: {
        type: mongoose.Schema.ObjectId,
        ref: 'address',
        required: true
    },
    subTotalAmt: {
        type: Number,
        default: 0
    },
    totalAmt: {
        type: Number,
        default: 0
    },
    invoice_receipt: {
        type: String,
        default: ""
    },
    cancellation_reason: {
        type: String,
        default: ""
    },
    refund_details: {
        refund_id: String,
        refund_amount: Number,
        refund_date: Date,
        refund_reason: String
    }
}, {
    timestamps: true
});

// Add indexes for better query performance
orderSchema.index({ orderId: 1 });
orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ payment_status: 1 });
orderSchema.index({ createdAt: -1 });

const OrderModel = mongoose.model('order', orderSchema);

export default OrderModel;