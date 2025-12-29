import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import ProductList from './ProductList';
import Cart from './Cart';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';

function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Search results page */}
        <Route path="/search/:query" element={<ProductList />} />
        
        {/* Future: Add more pages like ProductDetail, etc. */}
      </Routes>
    </Router>
  );
}

export default AppRouter;