const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    totalPrice: { type: Number, required: true, default: 0.0 },
    status: { type: String, default: 'Pending' },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);