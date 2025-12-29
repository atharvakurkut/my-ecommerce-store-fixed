const express = require('express');
const router = express.Router();

// Example GET route
router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 150 }
  ]);
});

// You can add POST, PUT, DELETE routes here later

module.exports = router;
