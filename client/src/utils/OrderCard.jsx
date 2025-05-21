import React from 'react';

const OrderCard = ({ order, onDownloadInvoice, onCancelOrder }) => {
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const paymentMethodLabel = {
    cod: 'Cash On Delivery',
    credit_card: 'Credit Card',
    esewa: 'eSewa',
    khalti: 'Khalti',
    paypal: 'PayPal',
  };

  const formatAddress = (address) => {
    if (!address) return 'Not available';
    const {
      fullName,
      phone,
      street,
      city,
      province,
      postalCode,
      country,
    } = address;

    return `${fullName || ''}, ${phone || ''}, ${street || ''}, ${city || ''}, ${province || ''}, ${postalCode || ''}, ${country || ''}`;
  };

  // Ensure product_details is an array
  const products = Array.isArray(order.product_details)
    ? order.product_details
    : [order.product_details].filter(Boolean);

  return (
    <div className="order rounded p-6 bg-white shadow-md mb-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4 flex-wrap">
        <p className="font-semibold text-lg">Order No: {order?.orderId}</p>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(
            order.status
          )}`}
        >
          {order.status || 'Pending'}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 mb-4">
        {products.map((product, index) => (
          <div
            key={product?._id || index}
            className="flex gap-4 flex-1 min-w-0 items-center"
          >
            <img
              src={product?.image?.[0] || '/placeholder-product.jpg'}
              alt={product?.name || 'Product Image'}
              className="w-20 h-20 object-cover rounded flex-shrink-0"
              onError={(e) => (e.target.src = '/placeholder-product.jpg')}
            />
            <div className="flex flex-col overflow-hidden">
              <h3 className="font-semibold text-lg truncate">
                {product?.name || 'Product'}
              </h3>
              <p className="text-gray-700 mt-1">
                Quantity: {product?.quantity || 1}
              </p>
              <p className="text-gray-700 truncate">
                Payment Method:{' '}
                {paymentMethodLabel[order.paymentMethod?.toLowerCase()] ||
                  'Not specified'}
              </p>
              <p className="text-gray-700 truncate">
                Order Date: {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-700 truncate">
                Delivery Address: {formatAddress(order.userAddress)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-3">
        <p className="font-semibold text-lg text-primary-700">
          Total: Rs. {order.totalAmt?.toFixed(2) || '0.00'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() =>
              onDownloadInvoice && onDownloadInvoice(order._id)
            }
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Download Invoice
          </button>

          {order.status?.toLowerCase() === 'pending' && (
            <button
              onClick={() => {
                if (
                  window.confirm('Are you sure you want to cancel this order?')
                ) {
                  onCancelOrder && onCancelOrder(order._id);
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
