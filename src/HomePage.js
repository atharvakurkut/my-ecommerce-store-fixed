import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { allProducts as manualProducts } from './ProductData';

const HomePage = ({ addToCart, user, onProductClick }) => {
  const [cloudProducts, setCloudProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch products from MongoDB
  useEffect(() => {
    const fetchAdminProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        
        // Safety: Filter out malformed items but keep new products
        const validData = Array.isArray(data) 
          ? data.filter(p => p.name || p.productName) 
          : [];
          
        setCloudProducts(validData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin products:", error);
        setLoading(false);
      }
    };
    fetchAdminProducts();
  }, []);

  // 2. Combined list - Ensures new Admin products appear first
  const allCombinedProducts = [...cloudProducts, ...manualProducts];

  // 3. UPDATED Section Logic: Includes safety for missing original prices
  const dealsOfTheDay = allCombinedProducts
    .filter(product => {
       // If no original price exists, new products are still "deals" if they are in the Cloud
       if (product._id) return true; 
       return (product.originalPrice || product.price) > product.price;
    })
    .slice(0, 6);

  const topRatedProducts = allCombinedProducts
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);

  // 4. Category logic with formatting fix
  const categories = [...new Set(allCombinedProducts.map(product => product.category || 'General'))];
  const categoryCounts = categories.map(category => ({
    name: category,
    count: allCombinedProducts.filter(p => p.category === category).length,
    image: allCombinedProducts.find(p => p.category === category)?.image
  }));

  // Offers data
  const offers = [
    { title: "Bank Offers", description: "10% Instant Discount on HDFC Bank Cards", icon: "🏦" },
    { title: "No Cost EMI", description: "Avail No Cost EMI on select cards", icon: "💳" },
    { title: "Partner Offers", description: "Get GST Invoice and save up to 28%", icon: "🤝" },
    { title: "Special Price", description: "Extra ₹2000 off on Exchange", icon: "🏷️" }
  ];

  if (loading) return <div style={{textAlign: 'center', padding: '50px'}}>Refreshing Store...</div>;

  return (
    <div className="homepage">
      {/* Hero Banner Section */}
      <div className="hero-banner">
        <h1>Welcome back, {user?.name || 'Shopper'}! 🛍️</h1>
        <p>Explore the latest arrivals from our cloud warehouse.</p>
      </div>

      {/* NEW SECTION: Only shows Cloud Products (Admin added) */}
      {cloudProducts.length > 0 && (
        <section className="deals-section">
          <h2>🔥 Recently Added by Admin</h2>
          <div className="products-grid">
            {cloudProducts.map(product => (
              <ProductCard 
                key={product._id} 
                product={product}
                addToCart={addToCart}
                isLoggedIn={!!user}
                onProductClick={onProductClick}
              />
            ))}
          </div>
        </section>
      )}

      {/* Offers Section */}
      <section className="offers-section">
        <div className="offers-grid">
          {offers.map((offer, index) => (
            <div key={index} className="offer-card">
              <div className="offer-icon">{offer.icon}</div>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deals Section */}
      <section className="deals-section">
        <h2>Deals of the Day</h2>
        <div className="products-grid">
          {dealsOfTheDay.map(product => (
            <ProductCard 
              key={product._id || product.id} 
              product={product}
              addToCart={addToCart}
              isLoggedIn={!!user}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      </section>

      {/* Shop by Category */}
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {categoryCounts.map(category => (
            <Link 
              key={category.name} 
              to={`/search?category=${category.name}`}
              className="category-card"
            >
              <div className="category-image">
                <img src={category.image || 'https://via.placeholder.com/150'} alt={category.name} />
              </div>
              <h3>{category.name.replace('-', ' ')}</h3>
              <span>{category.count} Products</span>
            </Link>
          ))}
        </div>
      </section>

      <style jsx="true">{`
        .homepage { padding: 20px; max-width: 1400px; margin: 0 auto; }
        .hero-banner { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; padding: 40px; margin-bottom: 30px; color: white; text-align: center; }
        .offers-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .offer-card { background: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); text-align: center; }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .categories-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
        .category-card { background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); text-decoration: none; color: inherit; transition: 0.3s; }
        .category-card:hover { transform: translateY(-5px); }
        .category-image { height: 150px; }
        .category-image img { width: 100%; height: 100%; object-fit: cover; }
        section h2 { font-size: 24px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        section h2::after { content: ""; flex: 1; height: 2px; background: linear-gradient(90deg, #e0e0e0, transparent); }
      `}</style>
    </div>
  );
};

export default HomePage;