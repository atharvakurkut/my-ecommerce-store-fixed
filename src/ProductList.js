import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ImageWithFallback from './ImageWithFallback';
import { buildLocalImageCandidates } from './utils/imagePaths';
import { getBrandBadgeDataUri } from './utils/brandBadge';
import { getModelBadgeDataUri } from './utils/modelBadge';
import { allProducts } from './ProductData';

function ProductList({ addToCart, user, onGoToProducts, onProductClick, searchHistory, recentlyViewedProducts, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = allProducts
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.id - b.id); // Maintain consistent ordering

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f8f9fa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>


        {/* Search History and Recently Viewed */}
        {(searchHistory?.length > 0 || recentlyViewedProducts?.length > 0) && (
          <div style={{ marginBottom: '40px' }}>
            {/* Search History */}
            {searchHistory?.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>
                  🔍 Recent Searches
                </h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {searchHistory.slice(0, 8).map((query, index) => (
                    <button
                      key={index}
                      onClick={() => onSearch && onSearch(query)}
                      style={{
                        background: 'white',
                        border: '2px solid #667eea',
                        color: '#667eea',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#667eea';
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'white';
                        e.target.style.color = '#667eea';
                      }}
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Recently Viewed Products */}
            {recentlyViewedProducts?.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>
                  👁️ Recently Viewed
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '20px'
                }}>
                  {recentlyViewedProducts.slice(0, 4).map(product => (
                    <div
                      key={product.id}
                      onClick={() => onProductClick && onProductClick(product)}
                      style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '15px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        border: '1px solid #f0f0f0'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                      }}
                    >
                      <ImageWithFallback
                        src={product.images?.[0] || product.image}
                        sources={[...(buildLocalImageCandidates(product) || []), product.image, ...(product.images || []), getBrandBadgeDataUri(product), getModelBadgeDataUri(product)]}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '120px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginBottom: '10px'
                        }}
                      />
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#333',
                        margin: '0 0 8px 0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {product.name}
                      </h4>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#667eea' }}>
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Welcome Message */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ color: '#333', fontSize: '32px', marginBottom: '10px' }}>
            Our Amazing Products
          </h2>
          <button
            onClick={onGoToProducts}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              marginBottom: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            📦 Browse All Products
          </button>
          {user ? (
            <p style={{
              color: '#667eea',
              fontSize: '18px',
              background: 'white',
              padding: '10px 20px',
              borderRadius: '25px',
              display: 'inline-block',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              Welcome back, <strong>{user.name}</strong>! 🎉 Happy Shopping!
            </p>
          ) : (
            <p style={{
              color: '#ff6b6b',
              fontSize: '16px',
              background: '#fff3cd',
              border: '1px solid #ffeaa7',
              padding: '15px 25px',
              borderRadius: '10px',
              display: 'inline-block',
              maxWidth: '500px'
            }}>
              ⚠️ <strong>Please login to add items to your cart</strong> and enjoy personalized shopping experience!
            </p>
          )}
        </div>

        {/* 🛒 Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                isLoggedIn={!!user}
                onProductClick={onProductClick}
              />
            ))
          ) : (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              color: '#999',
              fontSize: '18px'
            }}>
              ❌ No products found for "<strong>{searchTerm}</strong>"
            </div>
          )}
        </div>

        {/* 👤 Login Prompt */}
        {!user && (
          <div style={{
            marginTop: '50px',
            textAlign: 'center',
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🛍️</div>
            <h3 style={{ color: '#333', marginBottom: '15px' }}>
              Ready to Start Shopping?
            </h3>
            <p style={{ color: '#666', marginBottom: '25px', lineHeight: '1.6' }}>
              Create your account or login to:
              <br />
              ✅ Save items to your personal cart
              <br />
              ✅ Track your order history
              <br />
              ✅ Get personalized recommendations
              <br />
              ✅ Secure checkout process
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button style={{
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Create Account
              </button>
              <button style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
