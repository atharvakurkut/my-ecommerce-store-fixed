import React, { useState } from 'react';
import ImageWithFallback from './ImageWithFallback';
import { buildLocalImageCandidates } from './utils/imagePaths';
import { getBrandBadgeDataUri } from './utils/brandBadge';
import { getModelBadgeDataUri } from './utils/modelBadge';
import { allProducts } from './ProductData';

function ProductDetail({ product, addToCart, user, onBuyNow, onGoBack, onProductClick, reviews, questions, onAddReview, onMarkReviewHelpful, onAddQuestion, onAddAnswer, onMarkAnswerHelpful, onShowLogin }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  // Debug logging
  React.useEffect(() => {
    console.log('ProductDetail - Product ID:', product?.id);
    console.log('ProductDetail - Reviews:', reviews);
    console.log('ProductDetail - Questions:', questions);
  }, [product, reviews, questions]);
  
  // Reviews state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewSortBy, setReviewSortBy] = useState('recent');
  const [reviewsToShow, setReviewsToShow] = useState(5);
  
  // Q&A state
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [answeringQuestionId, setAnsweringQuestionId] = useState(null);
  const [answerText, setAnswerText] = useState('');
  const [questionsToShow, setQuestionsToShow] = useState(5);

  // Get similar products based on category - memoized (must be before early return)
  const similarProducts = React.useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter(p => p.id !== product.id && p.category === product.category)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 12);
  }, [product]);

  // Calculate review statistics - memoized to prevent recalculation (must be before early return)
  const reviewStats = React.useMemo(() => {
    if (!reviews || reviews.length === 0) {
      return { average: 0, distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }, total: 0 };
    }

    const total = reviews.length;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = (sum / total).toFixed(1);
    
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });

    return { average, distribution, total };
  }, [reviews]);

  // Sort reviews - memoized to prevent re-sorting (must be before early return)
  const sortedReviews = React.useMemo(() => {
    if (!reviews) return [];
    
    let sorted = [...reviews];
    switch (reviewSortBy) {
      case 'recent':
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'helpful':
        sorted.sort((a, b) => b.helpful - a.helpful);
        break;
      case 'highest':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
    return sorted;
  }, [reviews, reviewSortBy]);

  if (!product) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Product not found</h2>
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

  const discountPercentage = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const totalPrice = product.price * quantity;
  const savings = product.originalPrice ? (product.originalPrice - product.price) * quantity : 0;

  const handleSimilarProductClick = (similarProduct) => {
    if (onProductClick) {
      onProductClick(similarProduct);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle review submission
  const handleSubmitReview = () => {
    if (!user) {
      onShowLogin();
      return;
    }

    if (!reviewText.trim()) {
      alert('Please write a review!');
      return;
    }

    onAddReview({
      rating: reviewRating,
      title: reviewTitle.trim(),
      comment: reviewText.trim()
    });

    // Reset form
    setReviewRating(5);
    setReviewTitle('');
    setReviewText('');
    setShowReviewForm(false);
  };

  // Handle question submission
  const handleSubmitQuestion = () => {
    if (!user) {
      onShowLogin();
      return;
    }

    if (!questionText.trim()) {
      alert('Please write a question!');
      return;
    }

    onAddQuestion(questionText.trim());
    setQuestionText('');
    setShowQuestionForm(false);
  };

  // Handle answer submission
  const handleSubmitAnswer = (questionId) => {
    if (!user) {
      onShowLogin();
      return;
    }

    if (!answerText.trim()) {
      alert('Please write an answer!');
      return;
    }

    onAddAnswer(questionId, answerText.trim());
    setAnswerText('');
    setAnsweringQuestionId(null);
  };

  // Render star rating
  const renderStars = (rating, size = 16) => {
    return (
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} style={{ fontSize: `${size}px`, color: star <= rating ? '#ffa500' : '#ddd' }}>
            ★
          </span>
        ))}
      </div>
    );
  };

  // Render interactive star rating for review form
  const renderInteractiveStars = () => {
    return (
      <div style={{ display: 'flex', gap: '5px' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            onClick={() => setReviewRating(star)}
            style={{
              fontSize: '32px',
              color: star <= reviewRating ? '#ffa500' : '#ddd',
              cursor: 'pointer',
              transition: 'color 0.2s'
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: window.innerWidth <= 768 ? '20px 10px' : '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: window.innerWidth <= 768 ? '100%' : '1400px', margin: '0 auto' }}>
        
        {/* Breadcrumb */}
        <div style={{ marginBottom: '20px' }}>
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
              gap: '5px'
            }}
          >
            ← Back to Products
          </button>
        </div>

        <div style={{ 
          display: window.innerWidth <= 768 ? 'block' : 'flex', 
          gap: window.innerWidth <= 768 ? '20px' : '40px', 
          background: 'white', 
          borderRadius: '15px', 
          padding: window.innerWidth <= 768 ? '20px' : '30px', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)' 
        }}>
          
          {/* Image Gallery */}
          <div style={{ 
            flex: window.innerWidth <= 768 ? '1' : '0 0 500px',
            maxWidth: window.innerWidth <= 768 ? '100%' : '500px'
          }}>
            {/* Main Image */}
            <div style={{
              width: '100%',
              height: window.innerWidth <= 768 ? '250px' : '400px',
              backgroundColor: '#f8f9fa',
              borderRadius: '15px',
              marginBottom: '20px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <ImageWithFallback 
                src={product.images?.[selectedImage] || product.image}
                sources={[...(buildLocalImageCandidates(product) || []), product.image, ...(product.images || []), getBrandBadgeDataUri(product), getModelBadgeDataUri(product)]}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '15px',
                  cursor: 'zoom-in'
                }}
              />
              
              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  background: '#ff4757',
                  color: 'white',
                  padding: '8px 15px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {discountPercentage}% OFF
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
                {product.images.map((img, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    style={{
                      flex: '0 0 80px',
                      height: '80px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: selectedImage === index ? '3px solid #667eea' : '3px solid transparent'
                    }}
                  >
                    <ImageWithFallback 
                      src={img}
                      sources={[...(buildLocalImageCandidates(product) || []), product.image, ...(product.images || []), getBrandBadgeDataUri(product), getModelBadgeDataUri(product)]}
                      alt={`${product.name} ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div style={{ flex: 1 }}>
            
            {/* Brand and Stock Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{
                background: '#f8f9fa',
                color: '#667eea',
                padding: '5px 15px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {product.brand}
              </span>
              <span style={{
                color: product.inStock ? '#28a745' : '#dc3545',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
              </span>
            </div>

            {/* Product Name */}
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#333',
              margin: '0 0 15px 0',
              lineHeight: '1.3'
            }}>
              {product.name}
            </h1>

            {/* Rating and Reviews */}
            {product.rating && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: '#28a745',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '15px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  ⭐ {product.rating}
                </div>
                {product.reviews && (
                  <span style={{ color: '#666', fontSize: '14px' }}>
                    ({product.reviews.toLocaleString()} reviews)
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                <span style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span style={{
                      fontSize: '20px',
                      color: '#999',
                      textDecoration: 'line-through'
                    }}>
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span style={{
                      background: '#ff4757',
                      color: 'white',
                      padding: '5px 10px',
                      borderRadius: '15px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              {savings > 0 && (
                <p style={{ color: '#28a745', fontSize: '14px', margin: 0 }}>
                  You save ₹{savings.toLocaleString('en-IN')}!
                </p>
              )}
            </div>

            {/* Description */}
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                Description
              </h3>
              <p style={{
                color: '#666',
                fontSize: '14px',
                lineHeight: '1.6',
                margin: 0
              }}>
                {showFullDescription ? product.fullDescription : product.description}
                {product.fullDescription && product.fullDescription !== product.description && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#667eea',
                      cursor: 'pointer',
                      fontSize: '14px',
                      textDecoration: 'underline',
                      marginLeft: '5px'
                    }}
                  >
                    {showFullDescription ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </p>
            </div>

            {/* Specifications */}
            {product.specs && (
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>
                  Specifications
                </h3>
                <div style={{
                  background: '#f8f9fa',
                  borderRadius: '10px',
                  padding: '20px'
                }}>
                  {Object.entries(product.specs).map(([key, value], index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: index < Object.entries(product.specs).length - 1 ? '1px solid #e9ecef' : 'none'
                    }}>
                      <span style={{ fontWeight: 'bold', color: '#333' }}>{key}:</span>
                      <span style={{ color: '#666' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div style={{ marginBottom: '30px' }}>
              {/* Quantity Selector */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '10px', display: 'block' }}>
                  Quantity:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #e9ecef', borderRadius: '8px' }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '10px 15px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        color: '#667eea'
                      }}
                    >
                      −
                    </button>
                    <span style={{
                      padding: '10px 20px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      minWidth: '60px',
                      textAlign: 'center'
                    }}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '10px 15px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        color: '#667eea'
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                      Total: ₹{totalPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {user ? (
                <div style={{ 
                  display: window.innerWidth <= 768 ? 'block' : 'flex', 
                  gap: window.innerWidth <= 768 ? '10px' : '15px' 
                }}>
                  <button
                    onClick={() => {
                      for (let i = 0; i < quantity; i++) {
                        addToCart(product);
                      }
                    }}
                    disabled={!product.inStock}
                    style={{
                      flex: window.innerWidth <= 768 ? '1' : '1',
                      background: product.inStock ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' : '#ccc',
                      color: 'white',
                      border: 'none',
                      padding: window.innerWidth <= 768 ? '12px 20px' : '15px 30px',
                      borderRadius: '8px',
                      cursor: product.inStock ? 'pointer' : 'not-allowed',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    🛒 Add to Cart
                  </button>
                  <button
                    onClick={() => onBuyNow && onBuyNow(product, quantity)}
                    disabled={!product.inStock}
                    style={{
                      flex: window.innerWidth <= 768 ? '1' : '1',
                      background: product.inStock ? 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)' : '#ccc',
                      color: 'white',
                      border: 'none',
                      padding: window.innerWidth <= 768 ? '12px 20px' : '15px 30px',
                      borderRadius: '8px',
                      cursor: product.inStock ? 'pointer' : 'not-allowed',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    ⚡ Buy Now
                  </button>
                </div>
              ) : (
                <div style={{
                  background: '#fff3cd',
                  border: '1px solid #ffeaa7',
                  borderRadius: '10px',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔐</div>
                  <h3 style={{ color: '#856404', marginBottom: '10px' }}>Login Required</h3>
                  <p style={{ color: '#856404', marginBottom: '15px' }}>
                    Please login to add this item to your cart or buy it now.
                  </p>
                  <button style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}>
                    Login Now
                  </button>
                </div>
              )}
            </div>

            {/* Product Highlights */}
            <div style={{
              background: '#e3f2fd',
              borderRadius: '10px',
              padding: '20px',
              marginTop: '20px'
            }}>
              <h4 style={{ color: '#1976d2', marginBottom: '15px', fontSize: '16px' }}>
                🎯 Product Highlights
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#1976d2' }}>
                <li>Fast and reliable delivery</li>
                <li>7-day return policy</li>
                <li>1-year manufacturer warranty</li>
                <li>24/7 customer support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '30px',
          marginTop: '30px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '25px',
            borderBottom: '3px solid #667eea',
            paddingBottom: '10px',
            display: 'inline-block'
          }}>
            ⭐ Ratings & Reviews
          </h2>

          {/* Review Summary */}
          <div style={{
            display: 'flex',
            gap: '40px',
            marginTop: '25px',
            padding: '25px',
            background: '#f8f9fa',
            borderRadius: '12px'
          }}>
            {/* Overall Rating */}
            <div style={{ textAlign: 'center', minWidth: '150px' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#333' }}>
                {reviewStats.average}
              </div>
              {renderStars(Math.round(reviewStats.average), 24)}
              <div style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
                {reviewStats.total} {reviewStats.total === 1 ? 'Review' : 'Reviews'}
              </div>
            </div>

            {/* Rating Distribution */}
            <div style={{ flex: 1 }}>
              {[5, 4, 3, 2, 1].map(star => {
                const count = reviewStats.distribution[star];
                const percentage = reviewStats.total > 0 ? (count / reviewStats.total) * 100 : 0;
                return (
                  <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#666', minWidth: '30px' }}>{star} ★</span>
                    <div style={{
                      flex: 1,
                      height: '8px',
                      background: '#e9ecef',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${percentage}%`,
                        height: '100%',
                        background: star >= 4 ? '#28a745' : star >= 3 ? '#ffc107' : '#dc3545',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                    <span style={{ fontSize: '12px', color: '#999', minWidth: '40px' }}>
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Write Review Button */}
          <div style={{ marginTop: '25px' }}>
            <button
              onClick={() => {
                if (!user) {
                  onShowLogin();
                } else {
                  setShowReviewForm(!showReviewForm);
                }
              }}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              ✍️ Write a Review
            </button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div style={{
              marginTop: '20px',
              padding: '25px',
              background: '#f8f9fa',
              borderRadius: '12px',
              border: '2px solid #667eea'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
                Share Your Experience
              </h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                  Rating *
                </label>
                {renderInteractiveStars()}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                  Review Title (Optional)
                </label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="Sum up your experience"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                  Your Review *
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us what you think about this product..."
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleSubmitReview}
                  style={{
                    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Submit Review
                </button>
                <button
                  onClick={() => setShowReviewForm(false)}
                  style={{
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Sort Options */}
          {sortedReviews.length > 0 && (
            <div style={{ marginTop: '30px', marginBottom: '20px' }}>
              <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Sort by:</label>
              <select
                value={reviewSortBy}
                onChange={(e) => setReviewSortBy(e.target.value)}
                style={{
                  padding: '8px 15px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <option value="recent">Most Recent</option>
                <option value="helpful">Most Helpful</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
          )}

          {/* Reviews List */}
          <div style={{ marginTop: '25px' }}>
            {sortedReviews.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>📝</div>
                <p>No reviews yet. Be the first to review this product!</p>
              </div>
            ) : (
              <>
                {sortedReviews.slice(0, reviewsToShow).map((review) => (
                  <div key={review.id} style={{
                    padding: '20px',
                    borderBottom: '1px solid #e9ecef',
                    marginBottom: '15px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
                          {review.userName}
                        </div>
                        {renderStars(review.rating, 16)}
                      </div>
                      <div style={{ fontSize: '12px', color: '#999' }}>
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>

                    {review.title && (
                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', margin: '10px 0', color: '#333' }}>
                        {review.title}
                      </h4>
                    )}

                    <p style={{ color: '#666', lineHeight: '1.6', margin: '10px 0' }}>
                      {review.comment}
                    </p>

                    <button
                      onClick={() => onMarkReviewHelpful(review.id)}
                      style={{
                        background: review.helpfulVotes?.includes(user?.email) ? '#667eea' : 'white',
                        color: review.helpfulVotes?.includes(user?.email) ? 'white' : '#667eea',
                        border: '1px solid #667eea',
                        padding: '6px 15px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        marginTop: '10px'
                      }}
                    >
                      👍 Helpful ({review.helpful})
                    </button>
                  </div>
                ))}

                {sortedReviews.length > reviewsToShow && (
                  <button
                    onClick={() => setReviewsToShow(reviewsToShow + 5)}
                    style={{
                      background: 'white',
                      color: '#667eea',
                      border: '2px solid #667eea',
                      padding: '12px 30px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      width: '100%',
                      marginTop: '20px'
                    }}
                  >
                    Load More Reviews
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Q&A Section */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '30px',
          marginTop: '30px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '25px',
            borderBottom: '3px solid #667eea',
            paddingBottom: '10px',
            display: 'inline-block'
          }}>
            ❓ Questions & Answers
          </h2>

          {/* Ask Question Button */}
          <div style={{ marginTop: '25px' }}>
            <button
              onClick={() => {
                if (!user) {
                  onShowLogin();
                } else {
                  setShowQuestionForm(!showQuestionForm);
                }
              }}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              ❓ Ask a Question
            </button>
          </div>

          {/* Question Form */}
          {showQuestionForm && (
            <div style={{
              marginTop: '20px',
              padding: '25px',
              background: '#f8f9fa',
              borderRadius: '12px',
              border: '2px solid #667eea'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
                Ask Your Question
              </h3>
              
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="What would you like to know about this product?"
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  resize: 'vertical',
                  marginBottom: '15px'
                }}
              />

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleSubmitQuestion}
                  style={{
                    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Post Question
                </button>
                <button
                  onClick={() => setShowQuestionForm(false)}
                  style={{
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Questions List */}
          <div style={{ marginTop: '25px' }}>
            {!questions || questions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>💬</div>
                <p>No questions yet. Be the first to ask!</p>
              </div>
            ) : (
              <>
                {questions.slice(0, questionsToShow).map((question) => (
                  <div key={question.id} style={{
                    padding: '25px',
                    background: '#f8f9fa',
                    borderRadius: '12px',
                    marginBottom: '20px'
                  }}>
                    {/* Question */}
                    <div style={{ marginBottom: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div style={{ fontWeight: 'bold', color: '#333' }}>
                          Q: {question.userName}
                        </div>
                        <div style={{ fontSize: '12px', color: '#999' }}>
                          {new Date(question.date).toLocaleDateString()}
                        </div>
                      </div>
                      <p style={{ color: '#333', fontSize: '15px', lineHeight: '1.6' }}>
                        {question.question}
                      </p>
                    </div>

                    {/* Answers */}
                    {question.answers && question.answers.length > 0 && (
                      <div style={{ marginLeft: '20px', marginTop: '15px' }}>
                        {question.answers.map((answer) => (
                          <div key={answer.id} style={{
                            padding: '15px',
                            background: 'white',
                            borderRadius: '8px',
                            marginBottom: '10px',
                            borderLeft: '3px solid #667eea'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <div style={{ fontWeight: 'bold', color: '#667eea', fontSize: '14px' }}>
                                A: {answer.userName}
                              </div>
                              <div style={{ fontSize: '12px', color: '#999' }}>
                                {new Date(answer.date).toLocaleDateString()}
                              </div>
                            </div>
                            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', margin: '8px 0' }}>
                              {answer.answer}
                            </p>
                            <button
                              onClick={() => onMarkAnswerHelpful(question.id, answer.id)}
                              style={{
                                background: answer.helpfulVotes?.includes(user?.email) ? '#667eea' : 'white',
                                color: answer.helpfulVotes?.includes(user?.email) ? 'white' : '#667eea',
                                border: '1px solid #667eea',
                                padding: '4px 12px',
                                borderRadius: '15px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                marginTop: '5px'
                              }}
                            >
                              👍 Helpful ({answer.helpful})
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Answer Form */}
                    {answeringQuestionId === question.id ? (
                      <div style={{ marginTop: '15px', marginLeft: '20px' }}>
                        <textarea
                          value={answerText}
                          onChange={(e) => setAnswerText(e.target.value)}
                          placeholder="Write your answer..."
                          rows={3}
                          style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontSize: '14px',
                            resize: 'vertical',
                            marginBottom: '10px'
                          }}
                        />
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            onClick={() => handleSubmitAnswer(question.id)}
                            style={{
                              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                              color: 'white',
                              border: 'none',
                              padding: '8px 20px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontWeight: 'bold'
                            }}
                          >
                            Post Answer
                          </button>
                          <button
                            onClick={() => {
                              setAnsweringQuestionId(null);
                              setAnswerText('');
                            }}
                            style={{
                              background: '#6c757d',
                              color: 'white',
                              border: 'none',
                              padding: '8px 20px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '14px'
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          if (!user) {
                            onShowLogin();
                          } else {
                            setAnsweringQuestionId(question.id);
                          }
                        }}
                        style={{
                          background: 'white',
                          color: '#667eea',
                          border: '1px solid #667eea',
                          padding: '8px 20px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          marginTop: '10px',
                          marginLeft: '20px'
                        }}
                      >
                        💬 Answer this question
                      </button>
                    )}
                  </div>
                ))}

                {questions.length > questionsToShow && (
                  <button
                    onClick={() => setQuestionsToShow(questionsToShow + 5)}
                    style={{
                      background: 'white',
                      color: '#667eea',
                      border: '2px solid #667eea',
                      padding: '12px 30px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      width: '100%',
                      marginTop: '20px'
                    }}
                  >
                    Load More Questions
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px',
            marginTop: '30px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '25px',
              borderBottom: '3px solid #667eea',
              paddingBottom: '10px',
              display: 'inline-block'
            }}>
              Similar Products
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '20px',
              marginTop: '20px'
            }}>
              {similarProducts.map((similarProduct) => {
                const similarDiscountPercentage = similarProduct.originalPrice && similarProduct.originalPrice > similarProduct.price
                  ? Math.round(((similarProduct.originalPrice - similarProduct.price) / similarProduct.originalPrice) * 100)
                  : 0;

                return (
                  <div
                    key={similarProduct.id}
                    onClick={() => handleSimilarProductClick(similarProduct)}
                    style={{
                      background: 'white',
                      border: '1px solid #e9ecef',
                      borderRadius: '12px',
                      padding: '15px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.2)';
                      e.currentTarget.style.borderColor = '#667eea';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = '#e9ecef';
                    }}
                  >
                    {/* Discount Badge */}
                    {similarDiscountPercentage > 0 && (
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: '#ff4757',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        zIndex: 1
                      }}>
                        {similarDiscountPercentage}% OFF
                      </div>
                    )}

                    {/* Product Image */}
                    <div style={{
                      width: '100%',
                      height: '180px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      marginBottom: '12px',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <ImageWithFallback
                        src={similarProduct.image}
                        sources={[...(buildLocalImageCandidates(similarProduct) || []), similarProduct.image, ...(similarProduct.images || []), getBrandBadgeDataUri(similarProduct), getModelBadgeDataUri(similarProduct)]}
                        alt={similarProduct.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>

                    {/* Brand */}
                    <div style={{
                      fontSize: '11px',
                      color: '#667eea',
                      fontWeight: 'bold',
                      marginBottom: '5px',
                      textTransform: 'uppercase'
                    }}>
                      {similarProduct.brand}
                    </div>

                    {/* Product Name */}
                    <h3 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#333',
                      margin: '0 0 8px 0',
                      lineHeight: '1.3',
                      height: '36px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {similarProduct.name}
                    </h3>

                    {/* Rating */}
                    {similarProduct.rating && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        marginBottom: '8px'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          background: '#28a745',
                          color: 'white',
                          padding: '3px 6px',
                          borderRadius: '10px',
                          fontSize: '11px',
                          fontWeight: 'bold'
                        }}>
                          ⭐ {similarProduct.rating}
                        </div>
                        {similarProduct.reviews && (
                          <span style={{
                            fontSize: '11px',
                            color: '#999'
                          }}>
                            ({similarProduct.reviews > 1000 ? `${(similarProduct.reviews / 1000).toFixed(1)}k` : similarProduct.reviews})
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price */}
                    <div style={{ marginTop: '10px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flexWrap: 'wrap'
                      }}>
                        <span style={{
                          fontSize: '18px',
                          fontWeight: 'bold',
                          color: '#333'
                        }}>
                          ₹{similarProduct.price.toLocaleString('en-IN')}
                        </span>
                        {similarProduct.originalPrice && similarProduct.originalPrice > similarProduct.price && (
                          <span style={{
                            fontSize: '13px',
                            color: '#999',
                            textDecoration: 'line-through'
                          }}>
                            ₹{similarProduct.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stock Status */}
                    <div style={{
                      marginTop: '10px',
                      fontSize: '11px',
                      color: similarProduct.inStock ? '#28a745' : '#dc3545',
                      fontWeight: 'bold'
                    }}>
                      {similarProduct.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
