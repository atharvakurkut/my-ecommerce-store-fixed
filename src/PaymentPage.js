import React, { useState, useEffect } from 'react';
import ImageWithFallback from './ImageWithFallback';
import { buildLocalImageCandidates } from './utils/imagePaths';
import { getBrandBadgeDataUri } from './utils/brandBadge';
import { getModelBadgeDataUri } from './utils/modelBadge';
import { QRCodeSVG } from 'qrcode.react';

function PaymentPage({ product, quantity, cartItems, isCartCheckout, user, onPaymentComplete, onGoBack }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [billingAddress, setBillingAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  // Check if this is a cart checkout or single product purchase
  const isCart = isCartCheckout && cartItems && cartItems.length > 0;
  
  // Effect to handle UPI payment status when returning from UPI app
  useEffect(() => {
    const checkUPIStatus = () => {
      const lastTransaction = localStorage.getItem('lastTransaction');
      const pendingOrder = localStorage.getItem('pendingOrder');
      
      if (lastTransaction && pendingOrder) {
        const transaction = JSON.parse(lastTransaction);
        const order = JSON.parse(pendingOrder);
        
        // Convert string dates back to Date objects
        order.orderDate = new Date(order.orderDate);
        order.estimatedDelivery = new Date(order.estimatedDelivery);
        
        // Check if the transaction is pending and not timed out (15 minutes)
        const transactionAge = Date.now() - transaction.timestamp;
        const TIMEOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

        if (transaction.status === 'pending') {
          if (transactionAge > TIMEOUT_DURATION) {
            // Transaction timed out
            localStorage.removeItem('lastTransaction');
            localStorage.removeItem('pendingOrder');
            setIsProcessing(false);
            alert('Payment timed out. Please try again.');
            return;
          }

          // For successful return from UPI app
          if (!document.hidden) {
            // Update transaction status
            transaction.status = 'completed';
            localStorage.setItem('lastTransaction', JSON.stringify(transaction));
            
            // Clear pending order
            localStorage.removeItem('pendingOrder');
            
            // Complete the payment process
            setIsProcessing(false);
            setPaymentStatus('success');
            onPaymentComplete && onPaymentComplete(order);
          }
        }
      }
    };

    // Check payment status when component mounts or when returning to the page
    checkUPIStatus();

    // Add visibility change listener to detect when user returns from UPI app
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkUPIStatus();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onPaymentComplete]);

  // Calculate totals based on whether it's cart or single product
  const calculateTotals = () => {
    if (isCart) {
      const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
      const savings = cartItems.reduce((total, item) => {
        const itemSavings = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0;
        return total + itemSavings;
      }, 0);
      
      return {
        subtotal,
        totalQuantity,
        savings,
        gst: Math.round(subtotal * 0.18 * 100) / 100,
        deliveryCharge: subtotal > 500 ? 0 : 50,
      };
    } else {
      const subtotal = product.price * quantity;
      const savings = product.originalPrice ? (product.originalPrice - product.price) * quantity : 0;
      
      return {
        subtotal,
        totalQuantity: quantity,
        savings,
        gst: Math.round(subtotal * 0.18 * 100) / 100,
        deliveryCharge: subtotal > 500 ? 0 : 50,
      };
    }
  };

  const { subtotal, totalQuantity, savings, gst, deliveryCharge } = calculateTotals();
  const finalAmount = subtotal + gst + deliveryCharge;

  if ((!product && !isCart) || !user) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Invalid access</h2>
        <button onClick={onGoBack} style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          padding: '12px 30px',
          borderRadius: '25px',
          cursor: 'pointer',
          fontSize: '16px'
        }}>
          ← Go Back
        </button>
      </div>
    );
  }

  // Function to generate a merchant transaction ID
    const generateTransactionId = () => {
    // Generate unique transaction ID for each product in cart or single product
    const productIds = isCart 
      ? cartItems.map(item => item.id).join('-')
      : product.id;
    const userHash = user?.email?.split('@')[0] || 'guest';
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `TXN-${userHash}-${productIds}-${timestamp}-${random}`;
  };  // Function to detect if device is mobile
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // Function to handle UPI deep linking
  const handleUPIDeepLink = (app) => {
    const merchantUpiId = "atharvakurkut-1@oksbi"; // Merchant UPI ID
    const transactionId = generateTransactionId();
    const merchantName = "MyStore";
    const description = isCart ? "Cart Purchase" : product.name;
    
    // Base UPI parameters
    const productDesc = isCart 
      ? `Cart Payment - ${cartItems.map(item => `${item.name}(${item.quantity}x)`).join(', ')}`.substring(0, 50)
      : `${product.name} (${quantity}x)`;
    
    const upiParams = new URLSearchParams({
      pa: merchantUpiId,
      pn: merchantName,
      tr: transactionId,
      tn: productDesc,
      am: finalAmount.toString(),
      cu: 'INR'
    }).toString();

    // Store transaction details in local storage for verification
    const transactionDetails = {
      transactionId,
      amount: finalAmount,
      status: 'pending',
      timestamp: Date.now()
    };
    
    localStorage.setItem('lastTransaction', JSON.stringify(transactionDetails));

    if (!isMobileDevice()) {
      // If on desktop, show an alert explaining how to pay
      alert(
        "Since you're on a desktop/laptop:\n\n" +
        "1. Open your UPI payment app on your phone\n" +
        "2. Scan the QR code shown on screen\n" +
        "3. Complete the payment on your phone\n\n" +
        "Or use your phone to make this purchase."
      );
      return transactionId;
    }

    // Create UPI URL based on the selected app
    let upiUrl = "";
    let intentUrl = "";
    
    switch(app) {
      case 'googlepay':
        intentUrl = `tez://upi/pay?${upiParams}`;
        upiUrl = `https://pay.google.com/payments/u/0/home#utm_source=pay&utm_medium=web&utm_campaign=pay&pa=${merchantUpiId}&pn=${merchantName}&tr=${transactionId}&tn=${description}&am=${finalAmount}&cu=INR`;
        break;
      case 'phonepe':
        intentUrl = `phonepe://pay?${upiParams}`;
        upiUrl = `https://phon.pe/ru_${merchantUpiId}?am=${finalAmount}&tr=${transactionId}&tn=${description}`;
        break;
      case 'paytm':
        intentUrl = `paytmmp://pay?${upiParams}`;
        upiUrl = `https://paytm.com/webview/paytmmp://pay?${upiParams}`;
        break;
      case 'bhim':
        intentUrl = `upi://pay?${upiParams}`;
        upiUrl = `https://www.bhimupi.org.in/web?${upiParams}`;
        break;
      default:
        intentUrl = `upi://pay?${upiParams}`;
        upiUrl = `upi://pay?${upiParams}`;
    }

    // Try to open the UPI app directly first
    window.location.href = intentUrl;

    // Set a timeout to redirect to web URL if app doesn't open
    setTimeout(() => {
      if (document.hasFocus()) {
        // If we're still here after 1 second, show helpful message
        alert(
          "Could not open the UPI app automatically.\n\n" +
          "Please ensure:\n" +
          "1. The app is installed on your device\n" +
          "2. Try scanning the QR code instead\n" +
          "3. Or use a different UPI app"
        );
      }
    }, 1500);

    return transactionId;
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (!billingAddress.street || !billingAddress.city || !billingAddress.pincode || !billingAddress.phone) {
      alert('Please fill in all billing address fields');
      return;
    }

    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name)) {
      alert('Please fill in all card details');
      return;
    }

    if (paymentMethod === 'upi') {
      if (!isMobileDevice()) {
        // On desktop, require QR code scanning
        alert(
          "Since you're on a desktop/laptop, please:\n\n" +
          "1. Use your phone to scan the QR code shown above\n" +
          "2. Complete the payment in your UPI app\n" +
          "3. Return to this window to check payment status\n\n" +
          "The QR code contains all payment details."
        );
        return;
      }
      
      if (!upiId && !selectedUpiApp) {
        alert('Please enter a UPI ID or select a UPI app');
        return;
      }
    }

    setIsProcessing(true);

    let transactionId;
    if (paymentMethod === 'upi') {
      if (upiId) {
        // If UPI ID is entered, use direct UPI payment
        const merchantUpiId = "atharvakurkut-1@oksbi";
        transactionId = generateTransactionId();
        const merchantName = "MyStore";
        const description = isCart ? "Cart Purchase" : product.name;
        
        // Create direct UPI intent URL
        const upiParams = new URLSearchParams({
          pa: merchantUpiId,
          pn: merchantName,
          tr: transactionId,
          tn: description,
          am: finalAmount.toString(),
          cu: 'INR'
        }).toString();
        
        const intentUrl = `upi://pay?${upiParams}`;
        
        // Store transaction details
        const transactionDetails = {
          transactionId,
          amount: finalAmount,
          status: 'pending',
          timestamp: Date.now()
        };
        
        localStorage.setItem('lastTransaction', JSON.stringify(transactionDetails));
        
        // Open UPI payment
        window.location.href = intentUrl;

        // Show helpful message if UPI app doesn't open
        setTimeout(() => {
          if (document.hasFocus()) {
            alert(
              "Could not open a UPI payment app.\n\n" +
              "Please try:\n" +
              "1. Scanning the QR code with your UPI app\n" +
              "2. Selecting a specific UPI app below\n" +
              "3. Using a different UPI ID"
            );
            setIsProcessing(false);
          }
        }, 1500);
      } else {
        // If UPI app is selected, use app-specific deep linking
        transactionId = handleUPIDeepLink(selectedUpiApp);
      }
    }

    const orderDetails = {
      orderId: 'ORD' + Date.now(),
      transactionId,
      products: isCart ? cartItems : [{ ...product, quantity }],
      isCartOrder: isCart,
      totalAmount: subtotal,
      gst,
      deliveryCharge,
      finalAmount,
      savings,
      paymentMethod,
      billingAddress,
      orderDate: new Date(),
      user,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    };

    if (paymentMethod === 'upi') {
      localStorage.setItem('pendingOrder', JSON.stringify(orderDetails));
      // The UPI app will take over and the useEffect will handle the callback
    } else {
      // For non-UPI payments, simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentStatus('success');
        onPaymentComplete && onPaymentComplete(orderDetails);
      }, 3000);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <button
            onClick={onGoBack}
            style={{
              background: 'none',
              border: 'none',
              color: '#667eea',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              marginBottom: '20px'
            }}
          >
            ← Back
          </button>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333', margin: 0 }}>
            🔒 Secure Checkout
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '30px' }}>
          
          {/* Payment Form */}
          <div style={{ flex: 2 }}>
            
            {/* Billing Address */}
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '25px',
              marginBottom: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
                📍 Billing Address
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={billingAddress.street}
                    onChange={(e) => setBillingAddress({...billingAddress, street: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    placeholder="Enter your full address"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    value={billingAddress.city}
                    onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    placeholder="City"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                    State *
                  </label>
                  <input
                    type="text"
                    value={billingAddress.state}
                    onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    placeholder="State"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    value={billingAddress.pincode}
                    onChange={(e) => setBillingAddress({...billingAddress, pincode: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    placeholder="PIN Code"
                    maxLength="6"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={billingAddress.phone}
                    onChange={(e) => setBillingAddress({...billingAddress, phone: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    placeholder="Phone Number"
                    maxLength="10"
                  />
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '25px',
              marginBottom: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
                💳 Payment Method
              </h2>
              
              {/* Payment Options */}
              <div style={{ marginBottom: '20px' }}>
                {[
                  { id: 'card', label: '💳 Credit/Debit Card', desc: 'Visa, MasterCard, RuPay' },
                  { id: 'upi', label: '📱 UPI', desc: 'Choose from multiple UPI apps' },
                  { id: 'netbanking', label: '🏦 Net Banking', desc: 'All major banks' },
                  { id: 'cod', label: '💰 Cash on Delivery', desc: 'Pay when you receive' }
                ].map((method) => (
                  <label key={method.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '15px',
                    border: paymentMethod === method.id ? '2px solid #667eea' : '2px solid #e9ecef',
                    borderRadius: '10px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    background: paymentMethod === method.id ? '#f8f9ff' : 'white'
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ marginRight: '15px' }}
                    />
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>
                        {method.label}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {method.desc}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Card Details */}
              {paymentMethod === 'card' && (
                <div style={{
                  background: '#f8f9fa',
                  borderRadius: '10px',
                  padding: '20px',
                  marginTop: '20px'
                }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>
                    Card Details
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e9ecef',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e9ecef',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e9ecef',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                        CVV
                      </label>
                      <input
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e9ecef',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                        placeholder="123"
                        maxLength="4"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Details with QR Code */}
              {paymentMethod === 'upi' && (
                <div style={{
                  background: '#f8f9fa',
                  borderRadius: '10px',
                  padding: '20px',
                  marginTop: '20px'
                }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
                    Scan QR Code to Pay
                  </h3>
                  
                  {/* QR Code Display */}
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    background: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    marginBottom: '20px'
                  }}>
                    <QRCodeSVG
                      value={`upi://pay?pa=atharvakurkut-1@oksbi&pn=MyStore&am=${finalAmount}&tn=${
                        isCart 
                          ? `Cart Payment - ${cartItems.map(item => item.name).join(', ')}`.substring(0, 50)
                          : `${product.name} (${quantity}x)`
                      }&tr=${generateTransactionId()}`}
                      size={200}
                      level="H"
                      includeMargin={true}
                      imageSettings={{
                        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png",
                        height: 24,
                        width: 24,
                        excavate: true,
                      }}
                    />
                    <div style={{ marginTop: '15px', textAlign: 'center' }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Amount: ₹{finalAmount}</div>
                      <div style={{ color: '#666', fontSize: '12px' }}>UPI ID: atharvakurkut-1@oksbi</div>
                      <div style={{ color: '#28a745', fontSize: '11px', marginTop: '5px' }}>
                        Order ID: {generateTransactionId().split('-').slice(0, 2).join('-')}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '20px' }}>
                    - OR -
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
                    Choose Your UPI App
                  </h3>
                  
                  {/* UPI App Selection */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                    {[
                      { id: 'googlepay', name: 'Google Pay', color: '#4285f4' },
                      { id: 'phonepe', name: 'PhonePe', color: '#5f259f' },
                      { id: 'paytm', name: 'Paytm', color: '#00baf2' },
                      { id: 'amazonpay', name: 'Amazon Pay', color: '#ff9900' },
                      { id: 'bhim', name: 'BHIM', color: '#ff6600' },
                      { id: 'mobikwik', name: 'MobiKwik', color: '#2874f0' }
                    ].map((app) => (
                      <div
                        key={app.id}
                        onClick={() => setSelectedUpiApp(app.id)}
                        style={{
                          background: selectedUpiApp === app.id ? app.color : 'white',
                          color: selectedUpiApp === app.id ? 'white' : '#333',
                          border: `2px solid ${selectedUpiApp === app.id ? app.color : '#e9ecef'}`,
                          borderRadius: '12px',
                          padding: '15px 10px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontSize: '12px',
                          fontWeight: selectedUpiApp === app.id ? 'bold' : '500'
                        }}
                      >
                        <div style={{ marginBottom: '8px' }}>{app.name.charAt(0)}</div>
                        <div>{app.name}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* UPI ID Input */}
                  <div style={{ marginTop: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                      UPI ID
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e9ecef',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                      placeholder="yourname@upi"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ flex: 1 }}>
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              position: 'sticky',
              top: '20px'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
                📋 Order Summary
              </h2>

              {/* Product Details */}
              {isCart ? (
                <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #f8f9fa' }}>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {cartItems.map((item) => (
                      <div key={item.id} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        <div style={{
                          fontSize: '24px',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: '#f8f9fa',
                          borderRadius: '8px'
                        }}>
                          {item.emoji}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#333', margin: '0 0 3px 0' }}>
                            {item.name}
                          </h4>
                          <div style={{ fontSize: '11px', color: '#666' }}>
                            Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                          </div>
                          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#667eea' }}>
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #f8f9fa' }}>
                  <ImageWithFallback 
                    src={product.image}
                    sources={[...(buildLocalImageCandidates(product) || []), product.image, ...(product.images || []), getBrandBadgeDataUri(product), getModelBadgeDataUri(product)]}
                    alt={product.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', margin: '0 0 5px 0' }}>
                      {product.name}
                    </h4>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                      Quantity: {quantity}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#667eea' }}>
                      ₹{product.price.toLocaleString('en-IN')} each
                    </div>
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#666' }}>Subtotal ({totalQuantity} items):</span>
                  <span style={{ fontWeight: 'bold', color: '#333' }}>
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                
                {savings > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#28a745' }}>Discount:</span>
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>
                      -₹{savings.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#666' }}>GST (18%):</span>
                  <span style={{ fontWeight: 'bold', color: '#333' }}>
                    ₹{gst.toLocaleString('en-IN')}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span style={{ color: '#666' }}>Delivery Charges:</span>
                  <span style={{ fontWeight: 'bold', color: deliveryCharge === 0 ? '#28a745' : '#333' }}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  paddingTop: '15px',
                  borderTop: '2px solid #f8f9fa',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  <span style={{ color: '#333' }}>Total Amount:</span>
                  <span style={{ color: '#667eea' }}>
                    ₹{finalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                style={{
                  width: '100%',
                  background: isProcessing 
                    ? '#ccc' 
                    : 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '15px',
                  borderRadius: '10px',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
              >
                {isProcessing ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '3px solid rgba(255,255,255,0.3)',
                      borderTop: '3px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Processing Payment...
                  </div>
                ) : (
                  `🔒 Pay ₹${finalAmount.toLocaleString('en-IN')}`
                )}
              </button>

              {/* Security Info */}
              <div style={{
                background: '#e3f2fd',
                borderRadius: '8px',
                padding: '15px',
                marginTop: '20px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔒</div>
                <div style={{ fontSize: '12px', color: '#1976d2', fontWeight: 'bold' }}>
                  100% Secure Payment
                </div>
                <div style={{ fontSize: '11px', color: '#1976d2', marginTop: '5px' }}>
                  Your payment information is encrypted and secure
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default PaymentPage;