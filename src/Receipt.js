import React from 'react';

function Receipt({ orderDetails, onContinueShopping, onDownloadReceipt }) {
  if (!orderDetails) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>No order details found</h2>
        <button onClick={onContinueShopping} style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          padding: '12px 30px',
          borderRadius: '25px',
          cursor: 'pointer',
          fontSize: '16px'
        }}>
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleDownload = () => {
    // Create a professional receipt for download
    const receiptText = `
================================================================================
                            🛍️ MYSTORE - INVOICE                              
================================================================================

INVOICE NO: ${orderDetails.orderId}
DATE: ${orderDetails.orderDate.toLocaleDateString('en-IN')} | TIME: ${orderDetails.orderDate.toLocaleTimeString('en-IN')}

--------------------------------------------------------------------------------
COMPANY DETAILS:
--------------------------------------------------------------------------------
MyStore Private Limited
123 Commerce Street, Digital City - 560001
Email: support@mystore.com | Phone: 1800-123-4567
GSTIN: 29ABCDE1234F1Z5

--------------------------------------------------------------------------------
CUSTOMER DETAILS:
--------------------------------------------------------------------------------
Name: ${orderDetails.user.name}
Email: ${orderDetails.user.email}
Member Since: ${orderDetails.user.joinDate}

--------------------------------------------------------------------------------
BILLING ADDRESS:
--------------------------------------------------------------------------------
${orderDetails.billingAddress.street}
${orderDetails.billingAddress.city}, ${orderDetails.billingAddress.state} - ${orderDetails.billingAddress.pincode}
Phone: ${orderDetails.billingAddress.phone}

--------------------------------------------------------------------------------
PRODUCT DETAILS:
--------------------------------------------------------------------------------
Product: ${orderDetails.product.name}
Brand: ${orderDetails.product.brand}
Category: ${orderDetails.product.category || 'Electronics'}
Quantity: ${orderDetails.quantity}
Unit Price: ₹${orderDetails.product.price.toLocaleString('en-IN')}

--------------------------------------------------------------------------------
INVOICE BREAKDOWN:
--------------------------------------------------------------------------------
Subtotal (${orderDetails.quantity} items)          ₹${orderDetails.totalAmount.toLocaleString('en-IN')}
${orderDetails.savings > 0 ? `Discount Applied                   -₹${orderDetails.savings.toLocaleString('en-IN')}\n` : ''}GST (18%)                          ₹${orderDetails.gst.toLocaleString('en-IN')}
Delivery Charges                   ${orderDetails.deliveryCharge === 0 ? 'FREE' : `₹${orderDetails.deliveryCharge.toLocaleString('en-IN')}`}
--------------------------------------------------------------------------------
TOTAL AMOUNT PAID:                 ₹${orderDetails.finalAmount.toLocaleString('en-IN')}
================================================================================

--------------------------------------------------------------------------------
PAYMENT INFORMATION:
--------------------------------------------------------------------------------
Payment Method: ${orderDetails.paymentMethod.toUpperCase()}
Payment Status: ✅ SUCCESSFUL
Transaction Date: ${orderDetails.orderDate.toLocaleDateString('en-IN')}

--------------------------------------------------------------------------------
DELIVERY INFORMATION:
--------------------------------------------------------------------------------
Estimated Delivery: ${orderDetails.estimatedDelivery.toLocaleDateString('en-IN', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})}
Tracking will be sent via email once shipped.

================================================================================
                        Thank You for Shopping with MyStore! 😊
================================================================================

For any queries or support:
• Email: support@mystore.com
• Phone: 1800-123-4567
• Website: www.mystore.com

This is a computer-generated invoice and does not require a signature.

Generated on: ${new Date().toLocaleString('en-IN')}
    `;

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Receipt_${orderDetails.orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Success Header */}
        <div style={{
          background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
          borderRadius: '15px 15px 0 0',
          padding: '30px',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px', margin: 0 }}>
            Order Placed Successfully!
          </h1>
          <p style={{ fontSize: '16px', margin: '10px 0 0 0', opacity: 0.9 }}>
            Thank you for your purchase. Your order is being processed.
          </p>
        </div>

        {/* Receipt Content */}
        <div id="receipt-container" style={{
          background: 'white',
          borderRadius: '0 0 15px 15px',
          padding: '30px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          position: 'relative'
        }}>
          
          {/* Professional Invoice Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            margin: '-30px -30px 30px -30px',
            padding: '25px 30px',
            borderRadius: '0',
            color: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px 0', color: 'white' }}>
                  🛍️ MyStore
                </h1>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
                  123 Commerce Street, Digital City - 560001
                </p>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
                  Email: support@mystore.com | Phone: 1800-123-4567
                </p>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
                  GSTIN: 29ABCDE1234F1Z5
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  background: 'rgba(255,255,255,0.2)',
                  padding: '15px 20px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}>
                  <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '5px' }}>INVOICE</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    #{orderDetails.orderId}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '5px' }}>
                    {orderDetails.orderDate.toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })} | {orderDetails.orderDate.toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Billing Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>
                👤 Customer Details
              </h3>
              <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '15px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Name:</strong> {orderDetails.user.name}
                </div>
                <div>
                  <strong>Email:</strong> {orderDetails.user.email}
                </div>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>
                📍 Billing Address
              </h3>
              <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '15px' }}>
                <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
                  {orderDetails.billingAddress.street}<br/>
                  {orderDetails.billingAddress.city}, {orderDetails.billingAddress.state}<br/>
                  PIN: {orderDetails.billingAddress.pincode}<br/>
                  Phone: {orderDetails.billingAddress.phone}
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>
              📦 Product Details
            </h3>
            <div style={{
              background: '#f8f9fa',
              borderRadius: '8px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <img 
                  src={orderDetails.isCartOrder ? orderDetails.products[0].image : orderDetails.products[0].image}
                  alt={orderDetails.isCartOrder ? orderDetails.products[0].name : orderDetails.products[0].name}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                  onError={(e) => {
                    // Prevent infinite loop by checking if already using fallback
                    if (e.target.src.includes('/logo512.png')) return;
                    e.target.src = '/logo512.png';
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', margin: '0 0 8px 0' }}>
                    {orderDetails.isCartOrder 
                      ? `${orderDetails.products.length} item${orderDetails.products.length > 1 ? 's' : ''} purchased`
                      : orderDetails.products[0].name}
                  </h4>
                  {!orderDetails.isCartOrder && (
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                      Brand: {orderDetails.products[0].brand}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div>
                      <span style={{ fontSize: '14px', color: '#666' }}>Total Items: </span>
                      <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                        {orderDetails.isCartOrder 
                          ? orderDetails.products.reduce((total, item) => total + item.quantity, 0)
                          : orderDetails.products[0].quantity}
                      </span>
                    </div>
                    {!orderDetails.isCartOrder && (
                      <div>
                        <span style={{ fontSize: '14px', color: '#666' }}>Unit Price: </span>
                        <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#667eea' }}>
                          ₹{orderDetails.products[0].price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Invoice Table */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '20px', textAlign: 'center' }}>
              📋 INVOICE DETAILS
            </h3>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'white',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <thead>
                <tr style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white'
                }}>
                  <th style={{
                    padding: '15px',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    borderRight: '1px solid rgba(255,255,255,0.2)'
                  }}>Description</th>
                  <th style={{
                    padding: '15px',
                    textAlign: 'right',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
                  <td style={{ padding: '12px 15px', color: '#666' }}>Subtotal ({orderDetails.quantity} items)</td>
                  <td style={{ padding: '12px 15px', textAlign: 'right', fontWeight: 'bold', color: '#333' }}>
                    ₹{orderDetails.totalAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
                
                {orderDetails.savings > 0 && (
                  <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
                    <td style={{ padding: '12px 15px', color: '#28a745' }}>Discount Applied</td>
                    <td style={{ padding: '12px 15px', textAlign: 'right', fontWeight: 'bold', color: '#28a745' }}>
                      -₹{orderDetails.savings.toLocaleString('en-IN')}
                    </td>
                  </tr>
                )}
                
                <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
                  <td style={{ padding: '12px 15px', color: '#666' }}>GST (18%)</td>
                  <td style={{ padding: '12px 15px', textAlign: 'right', fontWeight: 'bold', color: '#333' }}>
                    ₹{orderDetails.gst.toLocaleString('en-IN')}
                  </td>
                </tr>
                
                <tr style={{ borderBottom: '2px solid #667eea' }}>
                  <td style={{ padding: '12px 15px', color: '#666' }}>Delivery Charges</td>
                  <td style={{ padding: '12px 15px', textAlign: 'right', fontWeight: 'bold', color: orderDetails.deliveryCharge === 0 ? '#28a745' : '#333' }}>
                    {orderDetails.deliveryCharge === 0 ? 'FREE' : `₹${orderDetails.deliveryCharge}`}
                  </td>
                </tr>
                
                <tr style={{
                  background: 'linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%)',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>
                  <td style={{ padding: '15px', color: '#333' }}>TOTAL AMOUNT PAID</td>
                  <td style={{ padding: '15px', textAlign: 'right', color: '#667eea', fontSize: '18px' }}>
                    ₹{orderDetails.finalAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment & Delivery Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>
                💳 Payment Details
              </h3>
              <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '15px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Payment Method:</strong> {orderDetails.paymentMethod.toUpperCase()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <strong>Payment Status:</strong> 
                  <span style={{
                    background: '#28a745',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    ✅ SUCCESSFUL
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>
                🚚 Delivery Information
              </h3>
              <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '15px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Estimated Delivery:</strong><br/>
                  <span style={{ color: '#667eea', fontWeight: 'bold' }}>
                    {orderDetails.estimatedDelivery.toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  You will receive tracking details via email
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            marginBottom: '30px',
            paddingTop: '20px',
            borderTop: '2px solid #f8f9fa'
          }}>
            <button
              onClick={handleDownload}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              📥 Download Receipt
            </button>
            <button
              onClick={handlePrint}
              style={{
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🖨️ Print Receipt
            </button>
            <button
              onClick={onContinueShopping}
              style={{
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🛍️ Continue Shopping
            </button>
          </div>

          {/* Footer Message */}
          <div style={{
            background: '#e3f2fd',
            borderRadius: '10px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '15px' }}>🎁</div>
            <h4 style={{ color: '#1976d2', marginBottom: '10px', fontSize: '16px' }}>
              Thank You for Shopping with MyStore!
            </h4>
            <p style={{ color: '#1976d2', margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
              We hope you love your purchase. For any questions or support, contact us at 
              <br/><strong>support@mystore.com</strong> or call <strong>1800-123-4567</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            
            #receipt-container,
            #receipt-container * {
              visibility: visible;
            }
            
            #receipt-container {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            
            button {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Receipt;
