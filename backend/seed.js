const mongoose = require('mongoose');
const Product = require('./models/Product');
const Order = require('./models/Order');

// Match this to your server.js connection string
const MONGO_URI = 'mongodb://localhost:27017/ecommerceDB';

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to DB for seeding...");

        // 1. Create a Test Product
        const product = await Product.create({
            name: "iPhone 15 Pro",
            price: 134900,
            category: "Mobiles",
            brand: "Apple"
        });

        // 2. Create a Test Order
        await Order.create({
            totalPrice: 134900,
            status: "Delivered",
            orderItems: [{
                name: product.name,
                qty: 1,
                image: "https://via.placeholder.com/150",
                price: product.price,
                product: product._id
            }]
        });

        console.log("✅ Seed Successful! One product and one order added.");
        process.exit();
    } catch (err) {
        console.error("❌ Seed Failed:", err);
        process.exit(1);
    }
};

seedData();