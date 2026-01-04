import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { allProducts } from './ProductData';

function AllProducts({ addToCart, user, searchQuery, onGoHome, onProductClick }) {
  const [products, setProducts] = useState([]);
  const [backendProducts, setBackendProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);

  // Load backend products
  useEffect(() => {
    const fetchBackendProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (response.ok) {
          const products = await response.json();
          // Format backend products to match frontend structure
          const formattedProducts = products.map((product, index) => ({
            id: `backend_${product._id}`,
            name: product.name,
            description: product.description || `Product from ${product.category}`,
            price: product.price,
            originalPrice: product.price * 1.2, // Add some margin
            category: product.category,
            brand: product.brand || 'Unknown',
            image: product.image,
            rating: 4.0 + Math.random(), // Random rating for demo
            reviews: Math.floor(Math.random() * 100) + 1,
            inStock: true
          }));
          setBackendProducts(formattedProducts);
        }
      } catch (error) {
        console.error('Error fetching backend products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBackendProducts();
  }, []);

  // Combine manual and backend products
  useEffect(() => {
    const allCombinedProducts = [...allProducts, ...backendProducts];
    setProducts(allCombinedProducts);
  }, [backendProducts]);

  // Grouped categories (virtual) that map to multiple concrete categories
  const CATEGORY_GROUPS = {
    clothing: new Set(['mens-clothing', 'womens-clothing', 'mens-shoes', 'womens-shoes']),
    smartphone: new Set(['smartphone']),
    laptop: new Set(['laptop']),
    electronics: new Set(['electronics', 'headphones', 'smartwatch']),
    furniture: new Set(['furniture']),
    books: new Set(['books']),
    beauty: new Set(['beauty', 'skincare', 'makeup']),
    sports: new Set(['sports', 'fitness']),
    toys: new Set(['toys', 'games'])
  };

  const formatCategoryLabel = (val) => {
    if (val === 'all') return 'All Categories';
    if (val === 'clothing') return 'Clothing';
    const text = val.replace(/-/g, ' ');
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  useEffect(() => {
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  }, []);

  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== '') {
      setSelectedCategory('all');
      setSelectedBrand('all');
      setPriceRange('all');
      setSortBy('default');
    }
  }, [searchQuery]);

  useEffect(() => {
    // Always start with a fresh copy and ensure consistent ordering
    let result = [...products].sort((a, b) => {
      // Sort by ID for manual products, then by creation date for backend products
      if (typeof a.id === 'number' && typeof b.id === 'number') {
        return a.id - b.id;
      } else if (typeof a.id === 'number') {
        return -1; // Manual products first
      } else if (typeof b.id === 'number') {
        return 1; // Manual products first
      } else {
        return 0; // Keep backend products in their order
      }
    });

    // Apply category filtering FIRST before any other filters
    if (selectedCategory !== 'all') {
      const group = CATEGORY_GROUPS[selectedCategory];
      if (group) {
        // Use strict category filtering with the predefined groups
        result = result.filter(p => group.has(p.category));
      } else {
        // For categories not in groups, use exact match only
        result = result.filter(p => p.category === selectedCategory);
      }
    }

    // Apply search query AFTER category filtering to maintain category integrity
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
      );
    }

    if (selectedBrand !== 'all') {
      result = result.filter(product => product.brand === selectedBrand);
    }

    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'under50000':
          result = result.filter(p => p.price < 50000);
          break;
        case '50000to100000':
          result = result.filter(p => p.price >= 50000 && p.price < 100000);
          break;
        case '100000to150000':
          result = result.filter(p => p.price >= 100000 && p.price < 150000);
          break;
        case 'over150000':
          result = result.filter(p => p.price >= 150000);
          break;
        default:
          break;
      }
    }

    switch (sortBy) {
      case 'priceLowHigh':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'nameAZ':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameZA':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'default':
      default:
        // Sort by id to maintain consistent order
        result.sort((a, b) => a.id - b.id);
        break;
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, selectedBrand, priceRange, sortBy]);

  const baseCategories = Array.from(new Set([...allProducts.map(p => p.category), ...backendProducts.map(p => p.category)]));
  const hasClothing = ['mens-clothing', 'womens-clothing', 'mens-shoes', 'womens-shoes'].some(c => baseCategories.includes(c));
  const categories = ['all', ...(hasClothing ? ['clothing'] : []), ...baseCategories];
  const brands = ['all', ...new Set([...allProducts.map(p => p.brand), ...backendProducts.map(p => p.brand)])];

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange('all');
    setSortBy('default');
  };

  return (
    <div style={{ padding: window.innerWidth <= 768 ? '20px 10px' : '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }} className="mobile-main-content">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '30px' }}>
          {searchQuery && (
            <button
              onClick={onGoHome}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '14px',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              ← Back to Home
            </button>
          )}
          <h2 style={{ color: '#333', fontSize: '28px', marginBottom: '10px' }}>
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
          </h2>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Showing {filteredProducts.length} of {products.length} products
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '30px' }}>
          
          <div style={{           
            width: '280px',
            background: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            height: 'fit-content',
            position: 'sticky',
            top: '20px',
            display: window.innerWidth <= 768 ? 'none' : 'block'
          }} className="mobile-filter-sidebar">
            <div style={{             display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px'
            }}>
              <h3 style={{ margin: 0, fontSize: '20px', color: '#333' }}>Filters</h3>
              <button
                onClick={clearFilters}
                style={{                background: 'none',
                  border: 'none',
                  color: '#667eea',
                  cursor: 'pointer',
                  fontSize: '14px',
                  textDecoration: 'underline'
                }}
              >
                Clear All
              </button>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ marginBottom: '12px', color: '#333', fontSize: '16px' }}>Category</h4>
              {categories.map(cat => (
                <label key={cat} style={{                 display: 'block',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ marginRight: '8px' }}
                  />
                  {formatCategoryLabel(cat)}
                </label>
              ))}
            </div>

            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ marginBottom: '12px', color: '#333', fontSize: '16px' }}>Brand</h4>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                style={{                width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Brands</option>
                {brands.filter(b => b !== 'all').map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ marginBottom: '12px', color: '#333', fontSize: '16px' }}>Price Range</h4>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                style={{                width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Prices</option>
                <option value="under50000">Under ₹50,000</option>
                <option value="50000to100000">₹50,000 - ₹1,00,000</option>
                <option value="100000to150000">₹1,00,000 - ₹1,50,000</option>
                <option value="over150000">Over ₹1,50,000</option>
              </select>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            
            <div style={{             background: 'white',
              padding: '15px 20px',
              borderRadius: '10px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <span style={{ color: '#666', fontSize: '14px' }}>
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{                padding: '8px 15px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  cursor: 'pointer',
                  minWidth: '180px'
                }}
              >
                <option value="default">Featured</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="nameAZ">Name: A to Z</option>
                <option value="nameZA">Name: Z to A</option>
              </select>
            </div>

            {loading ? (
              <div style={{
                background: 'white',
                padding: '60px 40px',
                borderRadius: '15px',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔄</div>
                <h3 style={{ color: '#333', marginBottom: '10px' }}>Loading Products...</h3>
                <p style={{ color: '#666' }}>
                  Fetching products from database
                </p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth <= 768 ? 'repeat(auto-fill, minmax(200px, 1fr))' : 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: window.innerWidth <= 768 ? '20px' : '25px'
              }} className="mobile-search-results">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    isLoggedIn={!!user}
                    onProductClick={onProductClick}
                  />
                ))}
              </div>
            ) : (
              <div style={{               background: 'white',
                padding: '60px 40px',
                borderRadius: '15px',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>😕</div>
                <h3 style={{ color: '#333', marginBottom: '10px' }}>No Products Found</h3>
                <p style={{ color: '#666', marginBottom: '20px' }}>
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={clearFilters}
                  style={{                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;