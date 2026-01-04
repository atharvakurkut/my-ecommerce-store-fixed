import { useState } from 'react';

function Register({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      // ✅ Send request to backend
      const response = await fetch('https://my-ecommerce-store-fixed-1.onrender.com/api/auth/signup', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }

      setSuccess('🎉 Account created successfully! You can now log in.');
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });

    } catch (err) {
      console.error(err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'linear-gradient(135deg, rgba(102,126,234,0.85) 0%, rgba(118,75,162,0.85) 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
    }}>
      <div style={{
        background: 'white', padding: '40px', borderRadius: '20px', width: '400px',
        maxWidth: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxHeight: '90vh', overflowY: 'auto'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333', fontSize: '28px' }}>
          ✨ Create Account
        </h2>

        {error && (
          <div style={{
            background: '#ff6b6b', color: 'white', padding: '10px 15px',
            borderRadius: '8px', marginBottom: '20px', textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            background: '#51cf66', color: 'white', padding: '10px 15px',
            borderRadius: '8px', marginBottom: '20px', textAlign: 'center'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <input type="text" name="name" value={formData.name} onChange={handleChange}
            placeholder="Enter your full name" style={inputStyle} />
          <input type="email" name="email" value={formData.email} onChange={handleChange}
            placeholder="Enter your email" style={inputStyle} />
          <input type="password" name="password" value={formData.password} onChange={handleChange}
            placeholder="Create a password" style={inputStyle} />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
            placeholder="Confirm your password" style={inputStyle} />

          <button type="submit" style={buttonStyle}>
            Create Account 🎉
          </button>
        </form>

        <div style={{ textAlign: 'center', color: '#666' }}>
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            style={{
              background: 'none', border: 'none', color: '#667eea',
              cursor: 'pointer', textDecoration: 'underline', fontSize: '16px'
            }}
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '15px', border: '2px solid #eee',
  borderRadius: '10px', fontSize: '16px', marginBottom: '15px',
  outline: 'none', transition: 'border-color 0.3s ease'
};

const buttonStyle = {
  width: '100%', background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
  color: 'white', border: 'none', padding: '15px', borderRadius: '10px',
  fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px',
  transition: 'transform 0.2s ease'
};

export default Register;
