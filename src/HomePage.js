import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { allProducts } from './ProductData';

const HomePage = ({ addToCart, user, onProductClick }) => {
  // Get products with discounts (where originalPrice > price)
  const dealsOfTheDay = allProducts
    .filter(product => product.originalPrice > product.price)
    .sort((a, b) => {
      const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
      const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
      return discountB - discountA;
    })
    .slice(0, 6);

  // Get highly rated products
  const topRatedProducts = allProducts
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  // Get top categories
  const categories = [...new Set(allProducts.map(product => product.category))];
  const categoryCounts = categories.map(category => ({
    name: category,
    count: allProducts.filter(p => p.category === category).length,
    image: allProducts.find(p => p.category === category)?.image
  }));

  // Offers data
  const offers = [
    {
      title: "Bank Offers",
      description: "10% Instant Discount on HDFC Bank Cards",
      icon: "🏦"
    },
    {
      title: "No Cost EMI",
      description: "Avail No Cost EMI on select cards",
      icon: "💳"
    },
    {
      title: "Partner Offers",
      description: "Get GST Invoice and save up to 28%",
      icon: "🤝"
    },
    {
      title: "Special Price",
      description: "Extra ₹2000 off on Exchange",
      icon: "🏷️"
    }
  ];

  // Flash sale data
  const flashSale = {
    title: "Flash Sale!",
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    discount: "Up to 70% OFF",
    products: dealsOfTheDay.slice(0, 3)
  };

  return (
    <div className="homepage">
      {/* Hero Banner with Flash Sale */}
      <div className="hero-banner">
        <div className="flash-sale">
          <div className="flash-sale-header">
            <h1>{flashSale.title}</h1>
            <div className="flash-sale-timer">
              Ends in: {Math.floor((flashSale.endTime - new Date()) / (1000 * 60 * 60))}h {Math.floor(((flashSale.endTime - new Date()) % (1000 * 60 * 60)) / (1000 * 60))}m
            </div>
          </div>
          <div className="flash-sale-discount">{flashSale.discount}</div>
          <div className="flash-sale-products">
            {flashSale.products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                addToCart={addToCart}
                isLoggedIn={!!user}
                onProductClick={onProductClick}
              />
            ))}
          </div>
        </div>
      </div>

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

      {/* Deals of the Day */}
      <section className="deals-section">
        <h2>Deals of the Day</h2>
        <div className="products-grid">
          {dealsOfTheDay.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              addToCart={addToCart}
              isLoggedIn={!!user}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
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
                <img src={category.image} alt={category.name} />
              </div>
              <h3>{category.name.replace('-', ' ').split(' ').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}</h3>
              <span>{category.count} Products</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Rated Products */}
      <section className="top-rated-section">
        <h2>Top Rated Products</h2>
        <div className="products-grid">
          {topRatedProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              addToCart={addToCart}
              isLoggedIn={!!user}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      </section>

      {/* Embedded CSS */}
      <style jsx="true">{`
        .homepage {
          padding: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Hero Banner & Flash Sale */
        .hero-banner {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 30px;
          color: white;
        }

        .flash-sale-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .flash-sale-timer {
          background: rgba(255, 255, 255, 0.2);
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: bold;
        }

        .flash-sale-discount {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .flash-sale-products {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        /* Offers Section */
        .offers-section {
          margin-bottom: 40px;
        }

        .offers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .offer-card {
          background: white;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.3s ease;
        }

        .offer-card:hover {
          transform: translateY(-5px);
        }

        .offer-icon {
          font-size: 32px;
          margin-bottom: 10px;
        }

        .offer-card h3 {
          color: #333;
          margin-bottom: 8px;
        }

        .offer-card p {
          color: #666;
          font-size: 14px;
        }

        /* Products Grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        /* Categories Section */
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .category-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          text-decoration: none;
          color: inherit;
          transition: transform 0.3s ease;
        }

        .category-card:hover {
          transform: translateY(-5px);
        }

        .category-image {
          height: 150px;
          overflow: hidden;
        }

        .category-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .category-card h3 {
          padding: 15px;
          margin: 0;
          color: #333;
          font-size: 16px;
        }

        .category-card span {
          display: block;
          padding: 0 15px 15px;
          color: #666;
          font-size: 14px;
        }

        /* Section Headers */
        section h2 {
          font-size: 24px;
          color: #333;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        section h2::after {
          content: "";
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, #e0e0e0, transparent);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .homepage {
            padding: 10px;
          }

          .hero-banner {
            padding: 20px;
          }

          .flash-sale-header {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }

          .flash-sale-products {
            grid-template-columns: 1fr;
          }

          .offers-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
