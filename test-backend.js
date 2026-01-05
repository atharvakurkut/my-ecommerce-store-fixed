// Test script to check backend CORS
const fetch = require('node-fetch');

async function testBackend() {
  try {
    console.log('🔍 Testing backend CORS...');
    
    const response = await fetch('https://my-ecommerce-store-fixed-1.onrender.com/api/products', {
      method: 'GET',
      headers: {
        'Origin': 'https://atharvakurkut.github.io',
        'Accept': 'application/json'
      }
    });
    
    console.log('✅ Response status:', response.status);
    console.log('✅ CORS headers:');
    console.log('  - Access-Control-Allow-Origin:', response.headers.get('access-control-allow-origin'));
    console.log('  - Access-Control-Allow-Credentials:', response.headers.get('access-control-allow-credentials'));
    
    const data = await response.json();
    console.log('✅ Products loaded:', data.length);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testBackend();
