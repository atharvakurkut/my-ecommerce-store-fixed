import React, { useState, memo } from "react";

const Header = memo(function Header({ cartItemsCount, toggleCart, user, onShowLogin, onLogout, onSearch, onGoHome, onGoToProducts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const searchRef = React.useRef(null);
  const prevCartCountRef = React.useRef(cartItemsCount);
  
  // Only update ref if count actually changed
  if (prevCartCountRef.current !== cartItemsCount) {
    prevCartCountRef.current = cartItemsCount;
  }
  
  // Safely get user initial and name
  const userInitial = user?.name?.charAt(0).toUpperCase() || "👤";
  const userName = user?.name || "User";

  // Import all products
  const { allProducts } = require('./ProductData');

  // Generate search suggestions
  const generateSuggestions = (term) => {
    if (!term.trim()) {
      setSearchSuggestions([]);
      return;
    }

    const termLower = term.toLowerCase();
    const suggestions = allProducts
      .filter(product => {
        const nameLower = product.name.toLowerCase();
        const brandLower = product.brand.toLowerCase();
        const categoryLower = product.category.toLowerCase();
        
        return nameLower.includes(termLower) || 
               brandLower.includes(termLower) ||
               categoryLower.includes(termLower);
      })
      .slice(0, 8) // Limit to 8 suggestions
      .map(product => ({
        id: product.id,
        name: product.name,
        brand: product.brand,
        image: product.image,
        price: product.price,
        category: product.category
      }));

    setSearchSuggestions(suggestions);
  };

  // Handle search input changes
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    generateSuggestions(value);
    setShowSuggestions(true);
  };

  // Handle search submit
  const handleSearch = (e, suggestion = null) => {
    e.preventDefault();
    if (suggestion || searchTerm.trim()) {
      onSearch && onSearch(suggestion || searchTerm.trim());
      setSearchTerm('');
      setShowSuggestions(false);
    }
  };

  // Close suggestions when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <h1 className="logo" style={{ cursor: 'pointer' }} onClick={onGoHome}>
          🛍️ MyStore
        </h1>

        {/* Search Bar */}
        <div className="search-container" ref={searchRef}>
          <form onSubmit={(e) => handleSearch(e)} className="search-form">
            <input
              type="text"
              placeholder="Search for products like 'laptop', 'Apple iPhone'..."
              value={searchTerm}
              onChange={handleSearchInput}
              onFocus={() => setShowSuggestions(true)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </form>

          {/* Search Suggestions */}
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className="search-suggestions">
              {searchSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="suggestion-item"
                  onClick={(e) => handleSearch(e, suggestion.name)}
                >
                  <div className="suggestion-image">
                    <img src={suggestion.image} alt={suggestion.name} />
                  </div>
                  <div className="suggestion-info">
                    <div className="suggestion-name">{suggestion.name}</div>
                    <div className="suggestion-details">
                      <span className="suggestion-brand">{suggestion.brand}</span>
                      <span className="suggestion-category">{suggestion.category}</span>
                      <span className="suggestion-price">₹{suggestion.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="nav">
          <button 
            onClick={onGoHome}
            className="nav-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            🏠 Home
          </button>
          <button 
            onClick={onGoToProducts}
            className="nav-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            📦 Products
          </button>
          <button
            onClick={toggleCart}
            className="nav-link cart-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            🛒 Cart
            {prevCartCountRef.current > 0 && (
              <span className="cart-badge">{prevCartCountRef.current}</span>
            )}
          </button>
        </nav>

        {/* User Section */}
        {user ? (
          <div className="user-box">
            <div className="user-avatar">{userInitial}</div>
            <span className="username">Hi, {userName}!</span>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <button onClick={onShowLogin} className="login-btn">
            👤 Login
          </button>
        )}
      </div>

      {/* Embedded CSS */}
      <style>{`
        /* Header */
        .header {
          background: linear-gradient(90deg, #667eea, #764ba2);
          padding: 18px 0;
          color: white;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          gap: 20px;
        }

        /* Logo in white */
        .logo {
          margin: 0;
          font-size: 30px;
          font-weight: bold;
          color: white;
          flex-shrink: 0;
        }

        /* Search Container */
        .search-container {
          flex: 1;
          max-width: 500px;
          position: relative;
        }

        /* Search Form */
        .search-form {
          display: flex;
          align-items: center;
          width: 100%;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 25px;
          padding: 5px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }

        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 10px 15px;
          color: white;
          font-size: 14px;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .search-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 20px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .search-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }

        /* Search Suggestions */
        .search-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border-radius: 15px;
          margin-top: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          max-height: 400px;
          overflow-y: auto;
          padding: 10px;
        }

        .suggestion-item {
          display: flex;
          align-items: center;
          padding: 10px;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .suggestion-item:hover {
          background: #f8f9fa;
        }

        .suggestion-image {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          overflow: hidden;
          margin-right: 15px;
          border: 1px solid #eee;
        }

        .suggestion-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .suggestion-info {
          flex: 1;
        }

        .suggestion-name {
          font-size: 14px;
          font-weight: 500;
          color: #333;
          margin-bottom: 4px;
        }

        .suggestion-details {
          display: flex;
          gap: 10px;
          font-size: 12px;
          color: #666;
        }

        .suggestion-brand {
          color: #667eea;
          font-weight: 500;
        }

        .suggestion-category {
          background: #f1f3f9;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
        }

        .suggestion-price {
          color: #28a745;
          font-weight: 500;
        }

        /* Navigation */
        .nav {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
        }

        .cart-link {
          position: relative;
        }

        .cart-badge {
          background: #ff4757 !important;
          color: white !important;
          border-radius: 50% !important;
          padding: 2px 7px !important;
          font-size: 12px !important;
          position: absolute !important;
          top: -6px !important;
          right: -8px !important;
          min-width: 20px !important;
          text-align: center !important;
          font-weight: bold !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
          display: inline-block !important;
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
          transition: none !important;
          animation: none !important;
          will-change: auto !important;
        }

        /* User Box */
        .user-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.15);
          padding: 8px 16px;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
        }

        /* Purple Gradient Avatar */
        .user-avatar {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 16px;
        }

        .username {
          font-size: 14px;
        }

        .logout-btn,
        .login-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 8px 16px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .logout-btn:hover,
        .login-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }
      `}</style>
    </header>
  );
}, (prevProps, nextProps) => {
  // Custom comparison to prevent re-renders when only cartItemsCount changes but value is same
  return (
    prevProps.cartItemsCount === nextProps.cartItemsCount &&
    prevProps.user?.email === nextProps.user?.email &&
    prevProps.toggleCart === nextProps.toggleCart &&
    prevProps.onShowLogin === nextProps.onShowLogin &&
    prevProps.onLogout === nextProps.onLogout &&
    prevProps.onSearch === nextProps.onSearch &&
    prevProps.onGoHome === nextProps.onGoHome &&
    prevProps.onGoToProducts === nextProps.onGoToProducts
  );
});

export default Header;
