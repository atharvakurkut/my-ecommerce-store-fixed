import ImageWithFallback from './ImageWithFallback';
import { buildLocalImageCandidates } from './utils/imagePaths';
import { getBrandBadgeDataUri } from './utils/brandBadge';
import { getModelBadgeDataUri } from './utils/modelBadge';

function ProductCard({ product, addToCart, isLoggedIn, onProductClick }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: window.innerWidth <= 768 ? '15px' : '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      position: 'relative',
      opacity: isLoggedIn ? 1 : 0.9
    }} className="mobile-card-padding"
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-10px)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }}>

      {!isLoggedIn && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: '#ff6b6b',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '15px',
          fontSize: '10px',
          fontWeight: 'bold'
        }}>
          🔐 LOGIN REQUIRED
        </div>
      )}

      <div 
        style={{
          width: '100%',
          height: window.innerWidth <= 768 ? '150px' : '200px',
          backgroundColor: '#f8f9fa',
          borderRadius: '15px',
          marginBottom: '15px',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
        onClick={() => onProductClick && onProductClick(product)}
      >
        <ImageWithFallback
          src={product.images?.[0] || product.image}
          sources={[...(buildLocalImageCandidates(product) || []), product.image, ...(product.images || []), getBrandBadgeDataUri(product), getModelBadgeDataUri(product)]}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: '15px',
            transition: 'transform 0.3s ease',
            backgroundColor: '#ffffff'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        />
        
        {/* Discount Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: '#ff4757',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '15px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}

        {/* Rating Badge */}
        {product.rating && (
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '15px',
            fontSize: '12px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            ⭐ {product.rating}
          </div>
        )}

        {!isLoggedIn && (
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              background: 'rgba(0,0,0,0.8)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              🔒 Login to View
            </div>
          </div>
        )}
      </div>

      <h3 style={{
        margin: '0 0 10px 0',
        color: '#333',
        fontSize: '18px'
      }}>
        {product.name}
      </h3>

      <p style={{
        color: '#666',
        fontSize: '14px',
        margin: '0 0 15px 0',
        lineHeight: '1.5'
      }}>
        {product.description}
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: isLoggedIn ? '#667eea' : '#999'
            }}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span style={{
                fontSize: '14px',
                color: '#999',
                textDecoration: 'line-through'
              }}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          {product.reviews && (
            <small style={{ color: '#666', fontSize: '12px' }}>
              ({product.reviews.toLocaleString()} reviews)
            </small>
          )}
        </div>

        <button 
          onClick={() => addToCart(product)}
          disabled={!isLoggedIn}
          style={{
            background: isLoggedIn 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(135deg, #ccc 0%, #999 100%)',
            color: 'white',
            border: 'none',
            padding: window.innerWidth <= 480 ? '8px 16px' : '10px 20px',
            borderRadius: '25px',
            fontSize: window.innerWidth <= 480 ? '14px' : '16px',
            cursor: isLoggedIn ? 'pointer' : 'not-allowed',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseOver={(e) => {
            if (isLoggedIn) {
              e.target.style.transform = 'scale(1.05)';
            }
          }}
          onMouseOut={(e) => {
            if (isLoggedIn) {
              e.target.style.transform = 'scale(1)';
            }
          }}
        >
          {isLoggedIn ? (
            <span style={{ position: 'relative', zIndex: 1 }}>Add to Cart</span>
          ) : (
            <>🔐 Login First</>
          )}
        </button>
      </div>

      {!isLoggedIn && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          background: '#fff3cd',
          borderRadius: '8px',
          border: '1px solid #ffeaa7',
          textAlign: 'center'
        }}>
          <small style={{ color: '#856404', fontSize: '12px' }}>
            💡 <strong>Create an account</strong> to add this item to your personal cart!
          </small>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
