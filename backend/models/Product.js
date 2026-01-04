const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String },
  image: { type: String, default: 'https://via.placeholder.com/150' }
}, { 
  timestamps: true,
  // ADD THIS LINE BELOW to force it to use the 'ecommerce' collection
  collection: 'ecommerce' 
});

module.exports = mongoose.model('Product', productSchema);