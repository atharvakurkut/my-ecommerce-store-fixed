import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Header from './Header';
import ProductList from './ProductList';
import AllProducts from './AllProducts';
import ProductDetail from './ProductDetail';
import PaymentPage from './PaymentPage';
import Receipt from './Receipt';
import Cart from './Cart';
import Login from './Login';
import Register from './Register';

function App() {
  // Authentication state
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [notification, setNotification] = useState('');

  // Navigation state
  const [currentView, setCurrentView] = useState('home'); // 'home', 'search', 'product-detail', 'payment', 'receipt'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [purchaseDetails, setPurchaseDetails] = useState(null); // For buy now flow
  const [orderDetails, setOrderDetails] = useState(null); // For receipt
  
  // Search history state
  const [searchHistory, setSearchHistory] = useState([]);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

  // Reviews and Q&A state
  const [productReviews, setProductReviews] = useState({});
  const [productQA, setProductQA] = useState({});

  // Backend API URL
  const API_URL = 'http://localhost:5000/api';

  // User database simulation (in real app, this would be backend)
  const [userDatabase, setUserDatabase] = useState({});

  // Load specific user's cart
  const loadUserCart = useCallback((userEmail) => {
    if (!userEmail) {
      setCartItems([]);
      return;
    }
    
    // First check localStorage
    const savedDB = localStorage.getItem('ecommerce_user_database');
    if (savedDB) {
      const db = JSON.parse(savedDB);
      if (db[userEmail] && db[userEmail].cart && Array.isArray(db[userEmail].cart)) {
        setCartItems(db[userEmail].cart);
        return;
      }
    }
    
    // Then check userDatabase state
    if (userDatabase[userEmail] && userDatabase[userEmail].cart && Array.isArray(userDatabase[userEmail].cart)) {
      setCartItems(userDatabase[userEmail].cart);
    } else {
      setCartItems([]);
    }
  }, [userDatabase]);

  // Load user data on app start
  useEffect(() => {
    // Load user database from localStorage
    const savedUserDB = localStorage.getItem('ecommerce_user_database');
    if (savedUserDB) {
      setUserDatabase(JSON.parse(savedUserDB));
    }

    // Check if user was logged in before
    const savedUser = localStorage.getItem('ecommerce_current_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        
        // Load cart from localStorage directly
        const savedUserDB = localStorage.getItem('ecommerce_user_database');
        if (savedUserDB) {
          const db = JSON.parse(savedUserDB);
          if (db[userData.email] && db[userData.email].cart && Array.isArray(db[userData.email].cart)) {
            setCartItems(db[userData.email].cart);
          } else {
            setCartItems([]);
          }
        } else {
          loadUserCart(userData.email);
        }
      } catch (e) {
        console.error('Error loading user data:', e);
      }
    }
    
    // Load search history
    const savedSearchHistory = localStorage.getItem('ecommerce_search_history');
    if (savedSearchHistory) {
      setSearchHistory(JSON.parse(savedSearchHistory));
    }
    
    // Load recently viewed products
    const savedRecentlyViewed = localStorage.getItem('ecommerce_recently_viewed');
    if (savedRecentlyViewed) {
      setRecentlyViewedProducts(JSON.parse(savedRecentlyViewed));
    }

    // Load reviews
    const savedReviews = localStorage.getItem('ecommerce_product_reviews');
    if (savedReviews) {
      setProductReviews(JSON.parse(savedReviews));
    }

    // Load Q&A
    const savedQA = localStorage.getItem('ecommerce_product_qa');
    if (savedQA) {
      setProductQA(JSON.parse(savedQA));
    }
  }, [loadUserCart]);

  // Save user database to localStorage whenever it changes - debounced to prevent rapid updates
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('ecommerce_user_database', JSON.stringify(userDatabase));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [userDatabase]);

  // Save reviews to localStorage whenever they change (debounced to prevent rapid updates)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('ecommerce_product_reviews', JSON.stringify(productReviews));
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [productReviews]);

  // Save Q&A to localStorage whenever they change (debounced to prevent rapid updates)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('ecommerce_product_qa', JSON.stringify(productQA));
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [productQA]);

  // Save current cart to user's data - use useCallback to prevent recreation
  const saveUserCart = useCallback((userEmail, cart) => {
    if (!userEmail) return;
    
    setUserDatabase(prevDB => {
      return {
        ...prevDB,
        [userEmail]: {
          ...(prevDB[userEmail] || {}),
          cart: cart
        }
      };
    });
    
    // Also save to localStorage immediately
    const savedDB = localStorage.getItem('ecommerce_user_database');
    const db = savedDB ? JSON.parse(savedDB) : {};
    db[userEmail] = {
      ...(db[userEmail] || {}),
      cart: cart
    };
    localStorage.setItem('ecommerce_user_database', JSON.stringify(db));
  }, []);

  // Update cart and save to user's data - debounced to prevent rapid updates
  // Use a ref to track the last saved cart to prevent unnecessary saves
  const lastSavedCartRef = React.useRef(JSON.stringify(cartItems));
  
  useEffect(() => {
    if (user && user.email && Array.isArray(cartItems)) {
      const currentCartString = JSON.stringify(cartItems);
      
      // Only save if cart actually changed
      if (currentCartString !== lastSavedCartRef.current) {
        const timeoutId = setTimeout(() => {
          if (Array.isArray(cartItems)) {
            saveUserCart(user.email, cartItems);
            lastSavedCartRef.current = currentCartString;
          }
        }, 200); // Increased debounce to reduce rapid updates
        
        return () => clearTimeout(timeoutId);
      }
    }
  }, [cartItems, user, saveUserCart]);

  // Cart functions - use useCallback to prevent recreation on every render
  const removeFromCart = useCallback((id) => {
    setCartItems(prevItems => {
      const filteredItems = prevItems.filter(item => {
        // Handle both string and number ID comparisons
        return String(item.id) !== String(id);
      });
      
      // Immediately save to localStorage for persistence
      if (user && user.email) {
        const savedDB = localStorage.getItem('ecommerce_user_database');
        const db = savedDB ? JSON.parse(savedDB) : {};
        db[user.email] = {
          ...(db[user.email] || {}),
          cart: filteredItems
        };
        localStorage.setItem('ecommerce_user_database', JSON.stringify(db));
      }
      
      return filteredItems;
    });
  }, [user]);

  const updateQuantity = useCallback((id, newQuantity) => {
    if (newQuantity <= 0) {
      // If quantity is 0 or less, remove the item
      setCartItems(prevItems => {
        const filteredItems = prevItems.filter(item => String(item.id) !== String(id));
        
        // Immediately save to localStorage
        if (user && user.email) {
          const savedDB = localStorage.getItem('ecommerce_user_database');
          const db = savedDB ? JSON.parse(savedDB) : {};
          db[user.email] = {
            ...(db[user.email] || {}),
            cart: filteredItems
          };
          localStorage.setItem('ecommerce_user_database', JSON.stringify(db));
        }
        
        return filteredItems;
      });
      return;
    }
    
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        String(item.id) === String(id) ? { ...item, quantity: newQuantity } : item
      );
      
      // Immediately save to localStorage
      if (user && user.email) {
        const savedDB = localStorage.getItem('ecommerce_user_database');
        const db = savedDB ? JSON.parse(savedDB) : {};
        db[user.email] = {
          ...(db[user.email] || {}),
          cart: updatedItems
        };
        localStorage.setItem('ecommerce_user_database', JSON.stringify(db));
      }
      
      return updatedItems;
    });
  }, [user]);

  const addToCart = useCallback((product) => {
    if (!user) {
      setNotification('Please login to add items to cart! 🔐');
      setTimeout(() => setNotification(''), 3000);
      setShowLogin(true);
      return;
    }

    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return;
    }

    // Use functional update to ensure we have the latest state
    setCartItems(prevItems => {
      if (!Array.isArray(prevItems)) {
        prevItems = [];
      }
      
      const existingItem = prevItems.find(item => item && item.id === product.id);
      
      let newItems;
      if (existingItem) {
        setNotification(`Added another ${product.name} to your cart! 🛒`);
        setTimeout(() => setNotification(''), 3000);
        
        newItems = prevItems.map(item =>
          item && item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        setNotification(`${product.name} added to your cart! ✨`);
        setTimeout(() => setNotification(''), 3000);
        
        newItems = [...prevItems, { ...product, quantity: 1 }];
      }
      
      // Immediately save to localStorage for persistence
      if (user && user.email) {
        const savedDB = localStorage.getItem('ecommerce_user_database');
        const db = savedDB ? JSON.parse(savedDB) : {};
        db[user.email] = {
          ...(db[user.email] || {}),
          cart: newItems
        };
        localStorage.setItem('ecommerce_user_database', JSON.stringify(db));
      }
      
      return newItems;
    });
  }, [user]);

  // Authentication functions
  const handleLogin = (userData) => {
    // Check localStorage first for user data
    const savedDB = localStorage.getItem('ecommerce_user_database');
    const db = savedDB ? JSON.parse(savedDB) : {};
    
    if (db[userData.email]) {
      // User exists, load their data
      const existingUser = db[userData.email];
      setUserDatabase(prevDB => ({
        ...prevDB,
        [userData.email]: existingUser
      }));
      setUser(existingUser);
      
      // Load cart after a small delay to ensure state is set
      setTimeout(() => {
        if (existingUser.cart && Array.isArray(existingUser.cart) && existingUser.cart.length > 0) {
          setCartItems(existingUser.cart);
        } else {
          setCartItems([]);
        }
      }, 50);
      
      setNotification(`Welcome back, ${existingUser.name}! 🎉 Your cart has ${existingUser.cart && Array.isArray(existingUser.cart) ? existingUser.cart.length : 0} items.`);
    } else if (userDatabase[userData.email]) {
      // User exists in state but not in localStorage
      const existingUser = userDatabase[userData.email];
      setUser(existingUser);
      setTimeout(() => {
        if (existingUser.cart && Array.isArray(existingUser.cart) && existingUser.cart.length > 0) {
          setCartItems(existingUser.cart);
        } else {
          setCartItems([]);
        }
      }, 50);
      setNotification(`Welcome back, ${existingUser.name}! 🎉 Your cart has ${existingUser.cart && Array.isArray(existingUser.cart) ? existingUser.cart.length : 0} items.`);
    } else {
      // New user, create account
      const newUser = {
        ...userData,
        joinDate: new Date().toLocaleDateString(),
        cart: []
      };
      
      setUserDatabase(prevDB => ({
        ...prevDB,
        [userData.email]: newUser
      }));
      
      setUser(newUser);
      setCartItems([]);
      setNotification(`Welcome to our store, ${userData.name}! 🌟 Your account has been created.`);
    }
    
    localStorage.setItem('ecommerce_current_user', JSON.stringify(userData));
    setShowLogin(false);
    setTimeout(() => setNotification(''), 4000);
  };

  const handleRegister = (userData) => {
    // Check if user already exists
    if (userDatabase[userData.email]) {
      setNotification('Account with this email already exists! Please login instead. 📧');
      setTimeout(() => setNotification(''), 3000);
      return;
    }

    // Create new user account
    const newUser = {
      ...userData,
      joinDate: new Date().toLocaleDateString(),
      cart: []
    };
    
    setUserDatabase(prevDB => ({
      ...prevDB,
      [userData.email]: newUser
    }));
    
    setUser(newUser);
    setCartItems([]);
    localStorage.setItem('ecommerce_current_user', JSON.stringify(newUser));
    setShowRegister(false);
    setNotification(`Account created successfully! Welcome to our family, ${userData.name}! 🎊`);
    setTimeout(() => setNotification(''), 4000);
  };

  const handleLogout = () => {
    // Save current cart before logout
    if (user) {
      saveUserCart(user.email, cartItems);
    }
    
    setUser(null);
    setCartItems([]);
    setShowCart(false);
    localStorage.removeItem('ecommerce_current_user');
    setNotification('Logged out successfully! Your cart has been saved. See you soon! 👋');
    setTimeout(() => setNotification(''), 3000);
  };

  const showLoginForm = useCallback(() => {
    setShowLogin(true);
    setShowRegister(false);
  }, []);

  const closeAuthForms = useCallback(() => {
    setShowLogin(false);
    setShowRegister(false);
  }, []);

  // Navigation functions
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentView('search');
    
    // Save to search history
    const updatedHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 10);
    setSearchHistory(updatedHistory);
    localStorage.setItem('ecommerce_search_history', JSON.stringify(updatedHistory));
  };

  const goHome = () => {
    setCurrentView('home');
    setSearchQuery('');
    setSelectedProduct(null);
    setPurchaseDetails(null);
    setOrderDetails(null);
  };

  const viewProductDetail = async (product) => {
    // Only update if it's a different product to prevent unnecessary re-renders
    if (!selectedProduct || selectedProduct.id !== product.id) {
      setSelectedProduct(product);
      setCurrentView('product-detail');
      
      // Save to recently viewed products
      const updatedRecentlyViewed = [
        product, 
        ...recentlyViewedProducts.filter(item => item.id !== product.id)
      ].slice(0, 8);
      setRecentlyViewedProducts(updatedRecentlyViewed);
      localStorage.setItem('ecommerce_recently_viewed', JSON.stringify(updatedRecentlyViewed));

      // Load reviews and questions from backend
      try {
        const [reviewsRes, questionsRes] = await Promise.all([
          fetch(`${API_URL}/interactions/reviews/${product.id}`),
          fetch(`${API_URL}/interactions/questions/${product.id}`)
        ]);

        if (reviewsRes.ok) {
          const reviews = await reviewsRes.json();
          console.log('Fetched reviews from backend:', reviews);
          const formattedReviews = reviews.map(r => ({
            id: r._id,
            userId: r.userEmail,
            userName: r.userName,
            rating: r.rating,
            title: r.title,
            comment: r.comment,
            date: r.createdAt,
            helpful: r.helpfulVotes?.length || 0,
            helpfulVotes: r.helpfulVotes || []
          }));
          console.log('Formatted reviews:', formattedReviews);
          setProductReviews(prev => ({
            ...prev,
            [product.id]: formattedReviews
          }));
        }

        if (questionsRes.ok) {
          const questions = await questionsRes.json();
          console.log('Fetched questions from backend:', questions);
          const formattedQuestions = questions.map(q => ({
            id: q._id,
            userId: q.userEmail,
            userName: q.userName,
            question: q.question,
            date: q.createdAt,
            answers: q.answers.map(a => ({
              id: a._id,
              userId: a.userEmail,
              userName: a.userName,
              answer: a.answer,
              date: a.createdAt,
              helpful: a.helpfulVotes?.length || 0,
              helpfulVotes: a.helpfulVotes || []
            }))
          }));
          console.log('Formatted questions:', formattedQuestions);
          setProductQA(prev => ({
            ...prev,
            [product.id]: formattedQuestions
          }));
        }
      } catch (error) {
        console.error('Error loading reviews/questions:', error);
      }
    } else {
      // Just scroll to top if same product
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBuyNow = (product, quantity = 1) => {
    if (!user) {
      setNotification('Please login to make a purchase! 🔐');
      setTimeout(() => setNotification(''), 3000);
      setShowLogin(true);
      return;
    }
    
    setPurchaseDetails({ product, quantity });
    setCurrentView('payment');
  };

  const handlePaymentComplete = (orderDetails) => {
    setOrderDetails(orderDetails);
    setPurchaseDetails(null);
    setCurrentView('receipt');
    setNotification('🎉 Order placed successfully! Thank you for your purchase!');
    setTimeout(() => setNotification(''), 5000);
  };

  const goBackFromProductDetail = () => {
    if (searchQuery) {
      setCurrentView('search');
    } else {
      setCurrentView('home');
    }
    setSelectedProduct(null);
  };

  const goBackFromPayment = () => {
    setCurrentView('product-detail');
    setPurchaseDetails(null);
  };

  // Reviews functions
  const addReview = useCallback(async (productId, reviewData) => {
    if (!user) {
      setNotification('Please login to write a review! 🔐');
      setTimeout(() => setNotification(''), 3000);
      setShowLogin(true);
      return;
    }

    try {
      // Save to backend
      const response = await fetch(`${API_URL}/interactions/reviews/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: user.name,
          userEmail: user.email,
          rating: reviewData.rating,
          title: reviewData.title,
          comment: reviewData.comment
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save review');
      }

      const savedReview = await response.json();

      // Also update local state for immediate UI update
      const newReview = {
        id: savedReview._id || Date.now().toString(),
        userId: user.email,
        userName: user.name,
        ...reviewData,
        date: savedReview.createdAt || new Date().toISOString(),
        helpful: 0,
        helpfulVotes: []
      };

      console.log('Adding review for product:', productId);
      console.log('New review:', newReview);
      console.log('Current reviews state:', productReviews);

      setProductReviews(prev => {
        const updated = {
          ...prev,
          [productId]: [...(prev[productId] || []), newReview]
        };
        console.log('Updated reviews state:', updated);
        return updated;
      });

      setNotification('✨ Review posted successfully! Thank you for your feedback!');
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error saving review:', error);
      setNotification('❌ Failed to save review. Please try again.');
      setTimeout(() => setNotification(''), 3000);
    }
  }, [user, API_URL]);

  const markReviewHelpful = useCallback((productId, reviewId) => {
    if (!user) {
      setNotification('Please login to vote! 🔐');
      setTimeout(() => setNotification(''), 3000);
      setShowLogin(true);
      return;
    }

    setProductReviews(prev => ({
      ...prev,
      [productId]: (prev[productId] || []).map(review => {
        if (review.id === reviewId) {
          const hasVoted = review.helpfulVotes?.includes(user.email);
          if (hasVoted) {
            return {
              ...review,
              helpful: review.helpful - 1,
              helpfulVotes: review.helpfulVotes.filter(email => email !== user.email)
            };
          } else {
            return {
              ...review,
              helpful: review.helpful + 1,
              helpfulVotes: [...(review.helpfulVotes || []), user.email]
            };
          }
        }
        return review;
      })
    }));
  }, [user]);

  // Q&A functions
  const addQuestion = useCallback(async (productId, questionText) => {
    if (!user) {
      setNotification('Please login to ask a question! 🔐');
      setTimeout(() => setNotification(''), 3000);
      setShowLogin(true);
      return;
    }

    try {
      // Save to backend
      const response = await fetch(`${API_URL}/interactions/questions/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: user.name,
          userEmail: user.email,
          question: questionText
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save question');
      }

      const savedQuestion = await response.json();

      // Also update local state for immediate UI update
      const newQuestion = {
        id: savedQuestion._id || Date.now().toString(),
        userId: user.email,
        userName: user.name,
        question: questionText,
        date: savedQuestion.createdAt || new Date().toISOString(),
        answers: []
      };

      console.log('Adding question for product:', productId);
      console.log('New question:', newQuestion);
      console.log('Current QA state:', productQA);

      setProductQA(prev => {
        const updated = {
          ...prev,
          [productId]: [...(prev[productId] || []), newQuestion]
        };
        console.log('Updated QA state:', updated);
        return updated;
      });

      setNotification('❓ Question posted successfully!');
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error saving question:', error);
      setNotification('❌ Failed to save question. Please try again.');
      setTimeout(() => setNotification(''), 3000);
    }
  }, [user, API_URL]);

  const addAnswer = useCallback(async (productId, questionId, answerText) => {
    if (!user) {
      setNotification('Please login to answer! 🔐');
      setTimeout(() => setNotification(''), 3000);
      setShowLogin(true);
      return;
    }

    try {
      // Save to backend
      const response = await fetch(`${API_URL}/interactions/questions/${questionId}/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: user.name,
          userEmail: user.email,
          answer: answerText
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save answer');
      }

      const updatedQuestion = await response.json();

      // Also update local state for immediate UI update
      const newAnswer = {
        id: Date.now().toString(),
        userId: user.email,
        userName: user.name,
        answer: answerText,
        date: new Date().toISOString(),
        helpful: 0,
        helpfulVotes: []
      };

      setProductQA(prev => ({
        ...prev,
        [productId]: (prev[productId] || []).map(question => {
          if (question.id === questionId) {
            return {
              ...question,
              answers: [...question.answers, newAnswer]
            };
          }
          return question;
        })
      }));

      setNotification('💬 Answer posted successfully!');
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error saving answer:', error);
      setNotification('❌ Failed to save answer. Please try again.');
      setTimeout(() => setNotification(''), 3000);
    }
  }, [user, API_URL]);

  const markAnswerHelpful = useCallback((productId, questionId, answerId) => {
    if (!user) {
      setNotification('Please login to vote! 🔐');
      setTimeout(() => setNotification(''), 3000);
      setShowLogin(true);
      return;
    }

    setProductQA(prev => ({
      ...prev,
      [productId]: (prev[productId] || []).map(question => {
        if (question.id === questionId) {
          return {
            ...question,
            answers: question.answers.map(answer => {
              if (answer.id === answerId) {
                const hasVoted = answer.helpfulVotes?.includes(user.email);
                if (hasVoted) {
                  return {
                    ...answer,
                    helpful: answer.helpful - 1,
                    helpfulVotes: answer.helpfulVotes.filter(email => email !== user.email)
                  };
                } else {
                  return {
                    ...answer,
                    helpful: answer.helpful + 1,
                    helpfulVotes: [...(answer.helpfulVotes || []), user.email]
                  };
                }
              }
              return answer;
            })
          };
        }
        return question;
      })
    }));
  }, [user]);

  // Use ref to track cart count and prevent unnecessary re-renders
  const cartCountRef = useRef(0);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  
  // Only update cart count when it actually changes - use useEffect to batch updates
  useEffect(() => {
    let newCount = 0;
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      newCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    }
    
    // Only update state if count actually changed
    if (cartCountRef.current !== newCount) {
      cartCountRef.current = newCount;
      // Use setTimeout to batch the state update and prevent rapid re-renders
      setTimeout(() => {
        setCartItemsCount(newCount);
      }, 0);
    }
  }, [cartItems]);

  // Memoize toggleCart to prevent Header re-renders
  const toggleCart = useCallback(() => {
    setShowCart(prev => !prev);
  }, []);

  const goToProducts = useCallback(() => {
    setCurrentView('search');
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <Header 
        cartItemsCount={cartItemsCount}
        toggleCart={toggleCart}
        user={user}
        onShowLogin={showLoginForm}
        onLogout={handleLogout}
        onSearch={handleSearch}
        onGoHome={goHome}
        onGoToProducts={goToProducts}
      />
      
      {/* Main Content */}
            <div style={{ display: 'flex' }}>
        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {currentView === 'home' && (
            <ProductList 
              addToCart={addToCart} 
              user={user} 
              onGoToProducts={() => setCurrentView('search')}
              onProductClick={viewProductDetail}
              searchHistory={searchHistory}
              recentlyViewedProducts={recentlyViewedProducts}
              onSearch={handleSearch}
            />
          )}
          
          {currentView === 'search' && (
            <AllProducts 
              addToCart={addToCart} 
              user={user} 
              searchQuery={searchQuery} 
              onGoHome={goHome}
              onProductClick={viewProductDetail}
            />
          )}
          
          {currentView === 'product-detail' && (
            <ProductDetail 
              product={selectedProduct}
              addToCart={addToCart}
              user={user}
              onBuyNow={handleBuyNow}
              onGoBack={goBackFromProductDetail}
              onProductClick={viewProductDetail}
              reviews={productReviews[selectedProduct?.id] || []}
              questions={productQA[selectedProduct?.id] || []}
              onAddReview={(reviewData) => addReview(selectedProduct.id, reviewData)}
              onMarkReviewHelpful={(reviewId) => markReviewHelpful(selectedProduct.id, reviewId)}
              onAddQuestion={(questionText) => addQuestion(selectedProduct.id, questionText)}
              onAddAnswer={(questionId, answerText) => addAnswer(selectedProduct.id, questionId, answerText)}
              onMarkAnswerHelpful={(questionId, answerId) => markAnswerHelpful(selectedProduct.id, questionId, answerId)}
              onShowLogin={showLoginForm}
            />
          )}
          
          {currentView === 'payment' && purchaseDetails && (
            <PaymentPage 
              product={purchaseDetails.product}
              quantity={purchaseDetails.quantity}
              cartItems={purchaseDetails.cartItems}
              isCartCheckout={purchaseDetails.isCartCheckout}
              user={user}
              onPaymentComplete={handlePaymentComplete}
              onGoBack={goBackFromPayment}
            />
          )}
          
          {currentView === 'receipt' && orderDetails && (
            <Receipt 
              orderDetails={orderDetails}
              onContinueShopping={goHome}
            />
          )}
        </div>

      {/* Success/Info Notifications */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '100px',
          right: '20px',
          background: notification.includes('Welcome') || notification.includes('Account created') 
            ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
            : notification.includes('Logged out')
            ? 'linear-gradient(135deg, #6c757d 0%, #495057 100%)'
            : notification.includes('Please login')
            ? 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '15px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
          zIndex: 1500,
          animation: 'slideIn 0.3s ease',
          maxWidth: '350px',
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '1.4'
        }}>
          {notification}
        </div>
      )}
      
      
        
        {/* Sidebar Cart */}
        {showCart && (
          <div style={{
            position: 'fixed',
            right: 0,
            top: 0,
            height: '100vh',
            width: '400px',
            background: '#f8f9fa',
            boxShadow: '-5px 0 25px rgba(0,0,0,0.1)',
            zIndex: 1200,
            overflowY: 'auto',
            transform: 'translateX(0)',
            transition: 'transform 0.3s ease',
            willChange: 'transform'
          }}>
            <div style={{
              padding: '20px',
              borderBottom: '1px solid rgba(0,0,0,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>
                  🛒 {user ? `${user.name}'s Cart` : 'Shopping Cart'}
                </h3>
                {user && (
                  <small style={{ opacity: 0.9 }}>
                    Member since {user.joinDate}
                  </small>
                )}
              </div>
              <button 
                onClick={() => setShowCart(false)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                ×
              </button>
            </div>
            
            {!user ? (
              <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                color: '#666',
                background: 'rgba(255,255,255,0.7)',
                borderRadius: '15px',
                margin: '20px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔐</div>
                <h3>Please Login</h3>
                <p>You need to login to view your cart and make purchases.</p>
                <button
                  onClick={showLoginForm}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(102,126,234,0.3)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    ':hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(102,126,234,0.4)'
                    }
                  }}
                >
                  Login Now
                </button>
              </div>
            ) : (
              <Cart 
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                onCheckout={() => {
                  setCurrentView('payment');
                  setPurchaseDetails({ 
                    cartItems: cartItems,
                    isCartCheckout: true 
                  });
                  setShowCart(false);
                }}
              />
            )}
          </div>
        )}
        
        {/* Overlay when cart is open */}
        {showCart && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 1100
            }}
            onClick={() => setShowCart(false)}
          />
        )}
      </div>
      
      {/* Login Modal */}
      {showLogin && (
        <Login 
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}
      
      {/* Register Modal */}
      {showRegister && (
        <Register 
          onRegister={handleRegister}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
      
      {/* Click outside to close auth modals */}
      {(showLogin || showRegister) && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            zIndex: 1900
          }}
          onClick={closeAuthForms}
        />
      )}
      
      <style>
        {`
          @keyframes slideIn {
            from { 
              transform: translateX(100%); 
              opacity: 0; 
            }
            to { 
              transform: translateX(0); 
              opacity: 1; 
            }
          }
          
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          }
        `}
      </style>
    </div>
  );
}


export default App;