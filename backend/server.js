// server.js
console.log('🔥 server.js ACTUALLY RUNNING');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const productInteractionRoutes = require('./routes/productInteractionRoutes');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://atharvakurkut.github.io'
  ],
  credentials: true
}));


// Routes
app.use('/api/auth', authRoutes);
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/interactions', productInteractionRoutes);

// DB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerceDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
})
.catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));