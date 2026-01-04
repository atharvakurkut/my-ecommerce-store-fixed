import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AdminLogin from './admin/AdminLogin'; // New Import
import AdminDashboard from './admin/AdminDashboard'; // New Import

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ADMIN ROUTES */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* USER WEBSITE (Main Store) */}
        {/* The "/*" means it will catch all other routes and show your App.js */}
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;