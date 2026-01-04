const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Ensure this model exists

// GET all orders for Admin
router.get('/', async (req, res) => {
    try {
        // Find all orders and sort by newest first
        const orders = await Order.find().sort({ createdAt: -1 });
        
        // Always send an array, even if empty
        res.status(200).json(orders || []);
    } catch (err) {
        console.error("Order Fetch Error:", err);
        // If there's an error, send an empty array so the frontend doesn't crash
        res.status(500).json([]); 
    }
});
// Add this to backend/routes/orderRoutes.js

// UPDATE an order status
router.put('/:id/status', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = req.body.status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// GET a single order by ID with full details
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;