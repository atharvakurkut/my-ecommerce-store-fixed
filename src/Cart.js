import React from 'react';

function Cart({ cartItems = [], updateQuantity, removeFromCart, onCheckout, onContinueShopping }) {
  const getTotalPrice = () => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {cartItems.length === 0 ? (
        <div style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '16px',
          padding: '40px 20px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🛒</div>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>Your cart is empty</h3>
          <p style={{ color: '#999', marginBottom: '20px' }}>Add some amazing products to get started!</p>
          <button 
            onClick={onContinueShopping || (() => window.location.href = '/')}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '10px 25px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div style={{
            marginBottom: '20px',
            padding: '15px',
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '10px',
            textAlign: 'center',
            color: '#667eea',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            border: '1px solid rgba(102,126,234,0.2)'
          }}>
            {getTotalItems()} items in cart
          </div>
          
          {cartItems.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              borderBottom: '1px solid rgba(0,0,0,0.05)',
              marginBottom: '10px',
              background: 'rgba(255,255,255,0.9)',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                fontSize: '30px',
                marginRight: '15px',
                backgroundColor: 'rgba(248,249,250,0.8)',
                padding: '10px',
                borderRadius: '8px',
                minWidth: '50px',
                textAlign: 'center',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                {item.emoji}
              </div>
              
              <div style={{ flex: 1 }}>
                <h4 style={{ 
                  margin: '0 0 5px 0', 
                  color: '#333',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {item.name}
                </h4>
                <p style={{ 
                  margin: 0, 
                  color: '#667eea', 
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  ₹{item.price.toLocaleString('en-IN')}
                </p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '8px'
                }}>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{
                      background: '#ff6b6b',
                      color: 'white',
                      border: 'none',
                      width: '25px',
                      height: '25px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    -
                  </button>
                  
                  <span style={{
                    minWidth: '25px',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    background: '#f8f9fa',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}>
                    {item.quantity}
                  </span>
                  
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      background: '#51cf66',
                      color: 'white',
                      border: 'none',
                      width: '25px',
                      height: '25px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    +
                  </button>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: 'none',
                      color: '#dc3545',
                      border: '1px solid #dc3545',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginLeft: '8px',
                      fontSize: '11px'
                    }}>
                    Remove
                  </button>
                </div>
                
                <div style={{
                  marginTop: '5px',
                  fontWeight: 'bold',
                  color: '#333',
                  fontSize: '14px'
                }}>
                  Total: ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          ))}
          
          <div style={{
            borderTop: '2px solid #667eea',
            paddingTop: '20px',
            marginTop: '20px',
            textAlign: 'center'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '15px'
            }}>
              <h3 style={{
                margin: '0 0 5px 0',
                fontSize: '18px'
              }}>
                Total: ₹{getTotalPrice().toLocaleString('en-IN')}
              </h3>
              <small>Including all items</small>
            </div>
            
            <button 
              onClick={handleCheckout}
              style={{
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
              }}>
              Checkout 💳
            </button>
            
            <p style={{
              fontSize: '12px',
              color: '#666',
              margin: '10px 0 0 0'
            }}>
              Secure payment with SSL encryption
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;