import { useState } from 'react';

function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Invalid email or password');
        return;
      }

      onLogin(data.user || { email }); // can expand this later
      setError('');
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error. Try again later.');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'linear-gradient(135deg, rgba(102,126,234,0.85), rgba(118,75,162,0.85))',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
    }}>
      <div style={{
        background: 'white', padding: '40px', borderRadius: '20px',
        width: '400px', maxWidth: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333', fontSize: '28px' }}>
          🔐 Login
        </h2>

        {error && (
          <div style={{
            background: '#ff6b6b', color: 'white', padding: '10px 15px',
            borderRadius: '8px', marginBottom: '20px', textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: '100%', padding: '15px', border: '2px solid #eee',
                borderRadius: '10px', fontSize: '16px', outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: '100%', padding: '15px', border: '2px solid #eee',
                borderRadius: '10px', fontSize: '16px', outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%', background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white', border: 'none', padding: '15px',
              borderRadius: '10px', fontSize: '18px', fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Login 🚀
          </button>
        </form>

        <div style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            style={{
              background: 'none', border: 'none', color: '#667eea',
              cursor: 'pointer', textDecoration: 'underline', fontSize: '16px'
            }}
          >
            Sign up here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
