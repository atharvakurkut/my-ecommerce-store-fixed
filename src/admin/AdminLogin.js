import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Temporary credentials for testing
        if (email === "admin@mystore.com" && password === "admin123") {
            navigate('/admin/dashboard'); 
        } else {
            alert("Invalid Credentials. Use admin@mystore.com / admin123");
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <h2>Admin Portal</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <button className="back-btn" onClick={() => navigate('/')}>Back to Store</button>
            </div>
        </div>
    );
}