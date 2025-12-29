// COMPREHENSIVE FLIPKART-LIKE PRODUCT CATALOG WITH REAL AMAZON IMAGES

export const allProducts = [
  // ===============================
  // TEST PRODUCTS
  // ===============================
  
  // Test Product for Payment
  {
    id: 9999,
    name: "Test Product - Payment Testing",
    description: "₹2 test product for payment gateway testing",
    fullDescription: "This is a test product priced at ₹2 for testing payment gateway functionality. Use this to verify if payment processing is working correctly.",
    price: 2,
    originalPrice: 2,
    category: "test",
    brand: "Test",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500&h=600&fit=crop"
    ],
    specs: {
      "Type": "Test Product",
      "Purpose": "Payment Testing",
      "Price": "₹2",
      "Status": "Active"
    },
    rating: 5.0,
    reviews: 1,
    inStock: true
  },

  // ===============================
  // MOBILE PHONES - ALL INDIAN POPULAR MODELS
  // ===============================
  
  // iPhone Models
  {
    id: 1001,
    name: "Apple iPhone 15 Pro Max",
    description: "Latest iPhone with titanium design, A17 Pro chip, and advanced camera system",
    fullDescription: "The iPhone 15 Pro Max features a titanium design, A17 Pro chip with 6-core GPU, Pro camera system with 48MP main camera, 5x telephoto zoom, and USB-C connectivity. Available in Natural Titanium, Blue Titanium, White Titanium, and Black Titanium.",
    price: 159900,
    originalPrice: 179900,
    category: "smartphone",
    brand: "Apple",
    image: "https://m.media-amazon.com/images/I/81SigpJN1KL._SX679_.jpg",
    
    specs: {
      "Display": "6.7-inch Super Retina XDR",
      "Processor": "A17 Pro chip",
      "Storage": "256GB",
      "Camera": "48MP Pro camera system",
      "Battery": "Up to 29 hours video",
      "Operating System": "iOS 17"
    },
    inStock: true,
    rating: 4.8,
    reviews: 12450
  },
  {
    id: 1002,
    name: "Apple iPhone 15 Pro",
    description: "Pro iPhone with titanium build and advanced photography features",
    fullDescription: "iPhone 15 Pro features titanium design, A17 Pro chip with 6-core GPU, Pro camera system with 48MP main camera, 3x telephoto zoom, Action Button, and USB-C connectivity.",
    price: 134900,
    originalPrice: 149900,
    category: "smartphone",
    brand: "Apple",
    image: "https://m.media-amazon.com/images/I/81dT7CUY6GL._SX679_.jpg",
   
    specs: {
      "Display": "6.1-inch Super Retina XDR",
      "Processor": "A17 Pro chip",
      "Storage": "128GB",
      "Camera": "48MP Pro camera system",
      "Battery": "Up to 23 hours video",
      "Operating System": "iOS 17"
    },
    rating: 4.7,
    reviews: 8900,
    inStock: true
  },
  {
    id: 1003,
    name: "Apple iPhone 15",
    description: "Standard iPhone 15 with Dynamic Island and USB-C",
    fullDescription: "iPhone 15 features Dynamic Island, 6.1-inch Super Retina XDR display, A16 Bionic chip, 48MP main camera with 2x telephoto zoom, and USB-C connectivity.",
    price: 79900,
    originalPrice: 89900,
    category: "smartphone",
    brand: "Apple",
    image: "https://m.media-amazon.com/images/I/71xb2xkN5qL._SX679_.jpg",
    
    specs: {
      "Display": "6.1-inch Super Retina XDR",
      "Processor": "A16 Bionic chip",
      "Storage": "128GB",
      "Camera": "48MP + 12MP dual system",
      "Battery": "Up to 20 hours video",
      "Operating System": "iOS 17"
    },
    rating: 4.6,
    reviews: 15600,
    inStock: true
  },
  {
    id: 1004,
    name: "Apple iPhone 14",
    description: "Previous generation iPhone with excellent performance",
    fullDescription: "iPhone 14 features a 6.1-inch Super Retina XDR display, A15 Bionic chip, dual-camera system, and all-day battery life.",
    price: 69900,
    originalPrice: 79900,
    category: "smartphone",
    brand: "Apple",
    image: "https://m.media-amazon.com/images/I/618Bb+QzCmL._SX679_.jpg",
    
    specs: {
      "Display": "6.1-inch Super Retina XDR",
      "Processor": "A15 Bionic chip",
      "Storage": "128GB",
      "Camera": "12MP dual system",
      "Battery": "Up to 20 hours video",
      "Operating System": "iOS 17"
    },
    rating: 4.5,
    reviews: 23400,
    inStock: true
  },
  {
    id: 1005,
    name: "Apple iPhone 13",
    description: "Popular iPhone with A15 Bionic and dual camera system",
    fullDescription: "iPhone 13 features 6.1-inch Super Retina XDR display, A15 Bionic chip, dual-camera system with Cinematic mode, and improved battery life.",
    price: 59900,
    originalPrice: 69900,
    category: "smartphone",
    brand: "Apple",
    image: "https://m.media-amazon.com/images/I/41dfXleWh9L.jpg",
    
    specs: {
      "Display": "6.1-inch Super Retina XDR",
      "Processor": "A15 Bionic chip",
      "Storage": "128GB",
      "Camera": "12MP dual system",
      "Battery": "Up to 19 hours video",
      "Operating System": "iOS 17"
    },
    rating: 4.6,
    reviews: 28900,
    inStock: true
  },
  {
    id: 1006,
    name: "Apple iPhone 12",
    description: "5G iPhone with ceramic shield and MagSafe",
    fullDescription: "iPhone 12 features the first 5G iPhone experience, 6.1-inch Super Retina XDR display, A14 Bionic chip, and MagSafe wireless charging.",
    price: 49900,
    originalPrice: 59900,
    category: "smartphone",
    brand: "Apple",
    image: "https://m.media-amazon.com/images/I/711wsjBtWeL._SX679_.jpg",
   
    specs: {
      "Display": "6.1-inch Super Retina XDR",
      "Processor": "A14 Bionic chip",
      "Storage": "64GB",
      "Camera": "12MP dual system",
      "Battery": "Up to 17 hours video",
      "5G": "Yes"
    },
    rating: 4.4,
    reviews: 34500,
    inStock: true
  },
  {
    id: 1007,
    name: "Apple iPhone SE (3rd generation)",
    description: "Most affordable iPhone with A15 Bionic chip and Touch ID",
    fullDescription: "iPhone SE features the powerful A15 Bionic chip, 4.7-inch Retina HD display, Touch ID, and wireless charging in a compact design.",
    price: 43900,
    originalPrice: 48900,
    category: "smartphone",
    brand: "Apple",
    image: "https://m.media-amazon.com/images/I/51gmHWdWo8L._SX522_.jpg",
    
    specs: {
      "Display": "4.7-inch Retina HD",
      "Processor": "A15 Bionic chip",
      "Storage": "64GB",
      "Camera": "12MP single camera",
      "Battery": "Up to 15 hours video",
      "Authentication": "Touch ID"
    },
    rating: 4.3,
    reviews: 18700,
    inStock: true
  },

  // Samsung Galaxy Models
  {
    id: 1010,
    name: "Samsung Galaxy S24 Ultra",
    description: "Premium Android flagship with S Pen and 200MP camera",
    fullDescription: "Samsung Galaxy S24 Ultra features a 6.8-inch Dynamic AMOLED display, Snapdragon 8 Gen 3 processor, 200MP camera with 5x optical zoom, built-in S Pen, and AI-powered features.",
    price: 124999,
    originalPrice: 134999,
    category: "smartphone",
    brand: "Samsung",
    image: "https://m.media-amazon.com/images/I/717Q2swzhBL._SX679_.jpg",
    
    specs: {
      "Display": "6.8-inch Dynamic AMOLED 2X",
      "Processor": "Snapdragon 8 Gen 3",
      "RAM": "12GB",
      "Storage": "256GB",
      "Camera": "200MP + 50MP + 12MP + 10MP",
      "Battery": "5000mAh"
    },
    inStock: true,
    rating: 4.6,
    reviews: 8900
  },
  {
    id: 1011,
    name: "Samsung Galaxy S24+",
    description: "Large flagship Galaxy with premium features",
    price: 89999,
    originalPrice: 99999,
    category: "smartphone",
    brand: "Samsung",
    image: "https://m.media-amazon.com/images/I/71uqj6BKnRL._SX679_.jpg",
    
    specs: {
      "Display": "6.7-inch Dynamic AMOLED 2X",
      "Processor": "Snapdragon 8 Gen 3",
      "RAM": "12GB",
      "Storage": "256GB",
      "Camera": "50MP + 12MP + 10MP",
      "Battery": "4900mAh"
    },
    rating: 4.5,
    reviews: 6700,
    inStock: true
  },
  {
    id: 1012,
    name: "Samsung Galaxy S24",
    description: "Compact flagship with AI features",
    price: 79999,
    originalPrice: 89999,
    category: "smartphone",
    brand: "Samsung",
    image: "https://m.media-amazon.com/images/I/81vxWpPpgNL._SX679_.jpg",
    
    specs: {
      "Display": "6.2-inch Dynamic AMOLED 2X",
      "Processor": "Snapdragon 8 Gen 3",
      "RAM": "8GB",
      "Storage": "128GB",
      "Camera": "50MP + 12MP + 10MP",
      "Battery": "4000mAh"
    },
    rating: 4.4,
    reviews: 9800,
    inStock: true
  },
  {
    id: 1013,
    name: "Samsung Galaxy A54 5G",
    description: "Popular mid-range 5G smartphone with great cameras",
    fullDescription: "Galaxy A54 5G features a 6.4-inch Super AMOLED display, Exynos 1380 processor, 50MP triple camera system, and 5000mAh battery.",
    price: 38999,
    originalPrice: 42999,
    category: "smartphone",
    brand: "Samsung",
    image: "https://m.media-amazon.com/images/I/31imefykVML._SX300_SY300_QL70_FMwebp_.jpg",
    
    specs: {
      "Display": "6.4-inch Super AMOLED",
      "Processor": "Exynos 1380",
      "RAM": "8GB",
      "Storage": "128GB",
      "Camera": "50MP + 12MP + 5MP",
      "Battery": "5000mAh"
    },
    rating: 4.3,
    reviews: 12800,
    inStock: true
  },
  {
    id: 1014,
    name: "Samsung Galaxy A34 5G",
    description: "Affordable 5G phone with premium features",
    price: 30999,
    originalPrice: 34999,
    category: "smartphone",
    brand: "Samsung",
    image: "https://m.media-amazon.com/images/I/51OdYKQvBTL._SX679_.jpg",
    
    specs: {
      "Display": "6.6-inch Super AMOLED",
      "Processor": "Dimensity 1080",
      "RAM": "8GB",
      "Storage": "128GB",
      "Camera": "48MP triple system",
      "Battery": "5000mAh"
    },
    rating: 4.2,
    reviews: 9400,
    inStock: true
  },
  {
    id: 1015,
    name: "Samsung Galaxy M34 5G",
    description: "Monster battery phone with 6000mAh and 120Hz display",
    price: 18999,
    originalPrice: 21999,
    category: "smartphone",
    brand: "Samsung",
    image: "https://m.media-amazon.com/images/I/81nt-RGKpyL._SX679_.jpg",
    
    specs: {
      "Display": "6.5-inch Super AMOLED 120Hz",
      "Processor": "Exynos 1280",
      "RAM": "6GB",
      "Storage": "128GB",
      "Camera": "50MP triple system",
      "Battery": "6000mAh"
    },
    rating: 4.1,
    reviews: 15600,
    inStock: true
  },
  {
    id: 1016,
    name: "Samsung Galaxy S23 FE",
    description: "Fan Edition flagship with premium features at great price",
    price: 59999,
    originalPrice: 69999,
    category: "smartphone",
    brand: "Samsung",
    image: "https://m.media-amazon.com/images/I/41efG41nZpL._SY300_SX300_QL70_FMwebp_.jpg",
    
    specs: {
      "Display": "6.4-inch Dynamic AMOLED 2X",
      "Processor": "Exynos 2200",
      "RAM": "8GB",
      "Storage": "128GB",
      "Camera": "50MP + 12MP + 8MP",
      "Battery": "4500mAh"
    },
    rating: 4.4,
    reviews: 7800,
    inStock: true
  },

  // OnePlus Models
  {
    id: 1020,
    name: "OnePlus 12",
    description: "Flagship killer with Snapdragon 8 Gen 3 and Hasselblad cameras",
    fullDescription: "OnePlus 12 features Snapdragon 8 Gen 3 processor, 6.82-inch LTPO AMOLED display with 120Hz, Hasselblad-tuned triple camera system, and 100W SuperVOOC charging.",
    price: 64999,
    originalPrice: 74999,
    category: "smartphone",
    brand: "OnePlus",
    image: "https://m.media-amazon.com/images/I/71YzJwmRFCL._SX522_.jpg",
    
    specs: {
      "Display": "6.82-inch LTPO AMOLED 120Hz",
      "Processor": "Snapdragon 8 Gen 3",
      "RAM": "12GB",
      "Storage": "256GB",
      "Camera": "50MP + 48MP + 64MP Hasselblad",
      "Battery": "5400mAh with 100W charging"
    },
    rating: 4.4,
    reviews: 5600,
    inStock: true
  },
  {
    id: 1021,
    name: "OnePlus 11",
    description: "Previous flagship with excellent performance",
    fullDescription: "OnePlus 11 features Snapdragon 8 Gen 2 processor, 6.7-inch LTPO AMOLED display, Hasselblad-tuned camera system, and 100W SuperVOOC charging.",
    price: 56999,
    originalPrice: 64999,
    category: "smartphone",
    brand: "OnePlus",
    image: "https://m.media-amazon.com/images/I/414+xRBltFL._SY300_SX300_QL70_FMwebp_.jpg",
    
    specs: {
      "Display": "6.7-inch LTPO AMOLED 120Hz",
      "Processor": "Snapdragon 8 Gen 2",
      "RAM": "8GB",
      "Storage": "128GB",
      "Camera": "50MP + 32MP + 48MP Hasselblad",
      "Battery": "5000mAh with 100W charging"
    },
    rating: 4.3,
    reviews: 7800,
    inStock: true
  },
  {
    id: 1022,
    name: "OnePlus Nord 3 5G",
    description: "Premium mid-range phone with flagship-grade cameras",
    fullDescription: "OnePlus Nord 3 5G features Dimensity 9000 processor, 6.74-inch 120Hz AMOLED display, 50MP triple camera system, and 80W SuperVOOC charging.",
    price: 33999,
    originalPrice: 37999,
    category: "smartphone",
    brand: "OnePlus",
    image: "https://m.media-amazon.com/images/I/41k+DrrxKfL._SY300_SX300_QL70_FMwebp_.jpg",
    
    specs: {
      "Display": "6.74-inch AMOLED 120Hz",
      "Processor": "Dimensity 9000",
      "RAM": "8GB",
      "Storage": "128GB",
      "Camera": "50MP + 8MP + 2MP",
      "Battery": "5000mAh with 80W fast charging"
    },
    rating: 4.3,
    reviews: 8900,
    inStock: true
  },
  {
    id: 1023,
    name: "OnePlus Nord CE 3 5G",
    description: "Affordable 5G phone with premium design",
    price: 26999,
    originalPrice: 29999,
    category: "smartphone",
    brand: "OnePlus",
    image: "https://m.media-amazon.com/images/I/417odtnpERL._SY300_SX300_QL70_FMwebp_.jpg",
    
    specs: {
      "Display": "6.7-inch AMOLED 120Hz",
      "Processor": "Snapdragon 782G",
      "RAM": "8GB",
      "Storage": "128GB",
      "Camera": "50MP triple system",
      "Battery": "5000mAh"
    },
    rating: 4.2,
    reviews: 12400,
    inStock: true
  },
  {
    id: 1024,
    name: "OnePlus 10T 5G",
    description: "Flagship performance with 150W SuperVOOC charging",
    price: 49999,
    originalPrice: 54999,
    category: "smartphone",
    brand: "OnePlus",
    image: "https://m.media-amazon.com/images/I/71XKAnxCsLL._SX679_.jpg",
    
    specs: {
      "Display": "6.7-inch AMOLED 120Hz",
      "Processor": "Snapdragon 8+ Gen 1",
      "RAM": "8GB",
      "Storage": "128GB",
      "Camera": "50MP triple system",
      "Battery": "4800mAh with 150W charging"
    },
    rating: 4.4,
    reviews: 6700,
    inStock: true
  },

  // Google Pixel Models
  {
    id: 1030,
    name: "Google Pixel 8 Pro",
    description: "AI-powered Android flagship with best-in-class camera",
    price: 106999,
    originalPrice: 116999,
    category: "smartphone",
    brand: "Google",
    image: "https://m.media-amazon.com/images/I/71r0349s3cL._SX679_.jpg",
    
    specs: {
      "Display": "6.7-inch LTPO OLED 120Hz",
      "Processor": "Google Tensor G3",
      "RAM": "12GB",
      "Storage": "128GB",
      "Camera": "50MP + 48MP + 48MP",
      "Battery": "5050mAh"
    },
    rating: 4.5,
    reviews: 4500,
    inStock: true
  },
  {
    id: 1031,
    name: "Google Pixel 8",
    description: "Pure Android experience with incredible cameras",
    price: 75999,
    originalPrice: 85999,
    category: "smartphone",
    brand: "Google",
    image: "https://m.media-amazon.com/images/I/41suocIFDCL.jpg",
   
    specs: {
      "Display": "6.2-inch OLED 120Hz",
      "Processor": "Google Tensor G3",
      "RAM": "8GB",
      "Storage": "128GB",
      "Camera": "50MP + 12MP",
      "Battery": "4575mAh"
    },
    rating: 4.4,
    reviews: 3400,
    inStock: true
  },

  // Xiaomi Models
  {
    id: 1040,
    name: "Xiaomi 14",
    description: "Photography flagship with Leica cameras",
    price: 69999,
    originalPrice: 79999,
    category: "smartphone",
    brand: "Xiaomi",
    image: "https://m.media-amazon.com/images/I/81LBrER2mkL._SX679_.jpg",
    
    specs: {
      "Display": "6.36-inch AMOLED 120Hz",
      "Processor": "Snapdragon 8 Gen 3",
      "RAM": "8GB",
      "Storage": "256GB",
      "Camera": "50MP Leica triple camera",
      "Battery": "4610mAh"
    },
    rating: 4.3,
    reviews: 2800,
    inStock: true
  },
  {
    id: 1041,
    name: "Redmi Note 13 Pro",
    description: "Mid-range champion with great cameras and performance",
    price: 24999,
    originalPrice: 29999,
    category: "smartphone",
    brand: "Xiaomi",
    image: "https://m.media-amazon.com/images/I/71aiqeP-APL._SX679_.jpg",
    
    specs: {
      "Display": "6.67-inch AMOLED 120Hz",
      "Processor": "Snapdragon 7s Gen 2",
      "RAM": "8GB",
      "Storage": "128GB",
      "Camera": "200MP + 8MP + 2MP",
      "Battery": "5000mAh"
    },
    rating: 4.2,
    reviews: 15600,
    inStock: true
  },
  {
    id: 1042,
    name: "Redmi Note 12 Pro+ 5G",
    description: "200MP camera flagship killer with 120W HyperCharge",
    fullDescription: "Redmi Note 12 Pro+ 5G features a stunning 200MP main camera, Dimensity 1080 processor, 6.67-inch AMOLED display, and blazing fast 120W HyperCharge technology.",
    price: 30999,
    originalPrice: 34999,
    category: "smartphone",
    brand: "Xiaomi",
    image: "https://m.media-amazon.com/images/I/41sSup+zodL._SY300_SX300_QL70_FMwebp_.jpg",
    
    specs: {
      "Display": "6.67-inch AMOLED 120Hz",
      "Processor": "Dimensity 1080",
      "RAM": "8GB",
      "Storage": "256GB",
      "Camera": "200MP + 8MP + 2MP",
      "Battery": "5000mAh with 120W charging"
    },
    rating: 4.4,
    reviews: 18900,
    inStock: true
  },
  {
    id: 1043,
    name: "Redmi 12 5G",
    description: "Affordable 5G smartphone with Snapdragon 4 Gen 2",
    price: 13999,
    originalPrice: 15999,
    category: "smartphone",
    brand: "Xiaomi",
    image: "https://m.media-amazon.com/images/I/41GsqdiCvOL._SY300_SX300_QL70_FMwebp_.jpg",
    
    specs: {
      "Display": "6.79-inch IPS LCD 90Hz",
      "Processor": "Snapdragon 4 Gen 2",
      "RAM": "6GB",
      "Storage": "128GB",
      "Camera": "50MP + 2MP",
      "Battery": "5000mAh"
    },
    rating: 4.1,
    reviews: 22400,
    inStock: true
  },
  {
    id: 1044,
    name: "POCO X5 Pro 5G",
    description: "Gaming beast with Snapdragon 778G and 120Hz display",
    price: 22999,
    originalPrice: 26999,
    category: "smartphone",
    brand: "Xiaomi",
    image: "https://m.media-amazon.com/images/I/51QtB4LJzlL._SY679_.jpg",
    
    specs: {
      "Display": "6.67-inch AMOLED 120Hz",
      "Processor": "Snapdragon 778G",
      "RAM": "8GB",
      "Storage": "256GB",
      "Camera": "108MP triple system",
      "Battery": "5000mAh"
    },
    rating: 4.3,
    reviews: 14700,
    inStock: true
  },
  {
    id: 1045,
    name: "POCO F5 5G",
    description: "Flagship killer with Snapdragon 7+ Gen 2",
    price: 29999,
    originalPrice: 33999,
    category: "smartphone",
    brand: "Xiaomi",
    image: "https://m.media-amazon.com/images/I/311m21aq8gL.jpg",
    
    specs: {
      "Display": "6.67-inch AMOLED 120Hz",
      "Processor": "Snapdragon 7+ Gen 2",
      "RAM": "12GB",
      "Storage": "256GB",
      "Camera": "64MP triple system",
      "Battery": "5000mAh"
    },
    rating: 4.4,
    reviews: 9800,
    inStock: true
  },

  // Vivo Models
  {
    id: 1050,
    name: "Vivo V30 Pro",
    description: "Camera-centric smartphone with excellent selfie performance",
    price: 41999,
    originalPrice: 46999,
    category: "smartphone",
    brand: "Vivo",
    image: "https://m.media-amazon.com/images/I/51SnUmyhayL._SX679_.jpg",
    
    specs: {
      "Display": "6.78-inch AMOLED 120Hz",
      "Processor": "Dimensity 8200",
      "RAM": "12GB",
      "Storage": "256GB",
      "Camera": "50MP + 50MP + 50MP",
      "Battery": "5000mAh"
    },
    rating: 4.1,
    reviews: 6700,
    inStock: true
  },
  {
    id: 1051,
    name: "Vivo V27 5G",
    description: "Color-changing design with 50MP selfie camera",
    price: 32999,
    originalPrice: 36999,
    category: "smartphone",
    brand: "Vivo",
    image: "https://m.media-amazon.com/images/I/51CRQ13uD1L._SX522_.jpg",
    
    specs: {
      "Display": "6.78-inch AMOLED 120Hz",
      "Processor": "Dimensity 7200",
      "RAM": "8GB",
      "Storage": "256GB",
      "Camera": "50MP + 8MP + 2MP",
      "Battery": "4600mAh"
    },
    rating: 4.2,
    reviews: 8900,
    inStock: true
  },
  {
    id: 1052,
    name: "Vivo T2 Pro 5G",
    description: "Performance-focused phone with Dimensity 7200",
    price: 24999,
    originalPrice: 28999,
    category: "smartphone",
    brand: "Vivo",
    image: "https://m.media-amazon.com/images/I/41aWzmKzlFL._SY300_SX300_QL70_FMwebp_.jpg",
    
    specs: {
      "Display": "6.78-inch AMOLED 120Hz",
      "Processor": "Dimensity 7200",
      "RAM": "8GB",
      "Storage": "128GB",
      "Camera": "64MP triple system",
      "Battery": "4600mAh"
    },
    rating: 4.1,
    reviews: 12400,
    inStock: true
  },

  // Oppo Models
  {
    id: 1060,
    name: "Oppo Find X7 Pro",
    description: "Premium flagship with Hasselblad cameras",
    price: 79999,
    originalPrice: 89999,
    category: "smartphone",
    brand: "Oppo",
    image: "https://m.media-amazon.com/images/I/71P4+eMshmL._SX679_.jpg",
    
    specs: {
      "Display": "6.82-inch LTPO AMOLED 120Hz",
      "Processor": "Snapdragon 8 Gen 3",
      "RAM": "16GB",
      "Storage": "512GB",
      "Camera": "50MP Hasselblad triple system",
      "Battery": "5000mAh"
    },
    rating: 4.2,
    reviews: 3400,
    inStock: true
  },
  {
    id: 1061,
    name: "Oppo Reno 10 Pro+ 5G",
    description: "Premium camera phone with periscope telephoto lens",
    price: 54999,
    originalPrice: 59999,
    category: "smartphone",
    brand: "Oppo",
    image: "https://m.media-amazon.com/images/I/41smz+ajm2L._SY300_SX300_QL70_FMwebp_.jpg",
    
    specs: {
      "Display": "6.74-inch AMOLED 120Hz",
      "Processor": "Snapdragon 8+ Gen 1",
      "RAM": "12GB",
      "Storage": "256GB",
      "Camera": "50MP + 64MP + 8MP",
      "Battery": "4700mAh"
    },
    rating: 4.3,
    reviews: 5600,
    inStock: true
  },
  {
    id: 1062,
    name: "Oppo A78 5G",
    description: "Affordable 5G phone with premium design",
    price: 18999,
    originalPrice: 21999,
    category: "smartphone",
    brand: "Oppo",
    image: "https://m.media-amazon.com/images/I/717pYZKHgLL._SX679_.jpg",
    
    specs: {
      "Display": "6.56-inch IPS LCD 90Hz",
      "Processor": "Dimensity 700",
      "RAM": "8GB",
      "Storage": "128GB",
      "Camera": "50MP dual system",
      "Battery": "5000mAh"
    },
    rating: 4.0,
    reviews: 8900,
    inStock: true
  },

  // Realme Models
  {
    id: 1070,
    name: "Realme GT 6",
    description: "Gaming flagship with Snapdragon 8s Gen 3",
    price: 42999,
    originalPrice: 49999,
    category: "smartphone",
    brand: "Realme",
    image: "https://m.media-amazon.com/images/I/21QQ9Q1IEaL._QL70_FMwebp_.jpg",
    
    specs: {
      "Display": "6.7-inch AMOLED 144Hz",
      "Processor": "Snapdragon 8s Gen 3",
      "RAM": "12GB",
      "Storage": "256GB",
      "Camera": "50MP triple system",
      "Battery": "5000mAh"
    },
    rating: 4.3,
    reviews: 5600,
    inStock: true
  },
  {
    id: 1071,
    name: "Realme 11 Pro+ 5G",
    description: "200MP OIS camera with curved AMOLED display",
    price: 27999,
    originalPrice: 31999,
    category: "smartphone",
    brand: "Realme",
    image: "https://m.media-amazon.com/images/I/21IkyOs1nvL.jpg",
    
    specs: {
      "Display": "6.7-inch AMOLED 120Hz curved",
      "Processor": "Dimensity 7050",
      "RAM": "8GB",
      "Storage": "256GB",
      "Camera": "200MP + 8MP + 2MP",
      "Battery": "5000mAh"
    },
    rating: 4.3,
    reviews: 11200,
    inStock: true
  },
  {
    id: 1072,
    name: "Realme Narzo 60 Pro 5G",
    description: "Gaming-focused phone with 100MP OIS camera",
    price: 23999,
    originalPrice: 27999,
    category: "smartphone",
    brand: "Realme",
    image: "https://m.media-amazon.com/images/I/71O+42MuShL._SX679_.jpg",
    
    specs: {
      "Display": "6.7-inch AMOLED 120Hz",
      "Processor": "Dimensity 7050",
      "RAM": "8GB",
      "Storage": "128GB",
      "Camera": "100MP + 2MP + 2MP",
      "Battery": "5000mAh"
    },
    rating: 4.2,
    reviews: 8700,
    inStock: true
  },

  // Nothing Models
  {
    id: 1090,
    name: "Nothing Phone (2a)",
    description: "Unique transparent design with Glyph Interface",
    price: 25999,
    originalPrice: 29999,
    category: "smartphone",
    brand: "Nothing",
    image: "https://m.media-amazon.com/images/I/41ZnUHOOEVL._SY300_SX300_QL70_FMwebp_.jpg",
   
    specs: {
      "Display": "6.7-inch AMOLED 120Hz",
      "Processor": "Dimensity 7200 Pro",
      "RAM": "8GB",
      "Storage": "256GB",
      "Camera": "50MP + 50MP",
      "Battery": "5000mAh"
    },
    rating: 4.4,
    reviews: 4500,
    inStock: true
  },
  {
    id: 1091,
    name: "Nothing Phone (2)",
    description: "Premium transparent phone with advanced Glyph Interface",
    price: 44999,
    originalPrice: 49999,
    category: "smartphone",
    brand: "Nothing",
    image: "https://m.media-amazon.com/images/I/418U41uEqhL._SY300_SX300_QL70_FMwebp_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61uGxKdNzmL._SX679_.jpg"
    ],
    specs: {
      "Display": "6.7-inch LTPO AMOLED 120Hz",
      "Processor": "Snapdragon 8+ Gen 1",
      "RAM": "12GB",
      "Storage": "256GB",
      "Camera": "50MP + 50MP",
      "Battery": "4700mAh"
    },
    rating: 4.5,
    reviews: 3400,
    inStock: true
  },

  // ===============================
  // LAPTOPS - ALL MAJOR BRANDS
  // ===============================
  
  // Apple MacBooks
  {
    id: 2001,
    name: "Apple MacBook Pro 16-inch M3 Max",
    description: "Most powerful MacBook Pro with M3 Max chip",
    fullDescription: "MacBook Pro with M3 Max chip delivers exceptional performance for professionals. Features 16-inch Liquid Retina XDR display, up to 128GB unified memory, and incredible battery life.",
    price: 399900,
    originalPrice: 419900,
    category: "laptop",
    brand: "Apple",
    image: "https://m.media-amazon.com/images/I/61CHYC93K4L._SX679_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61CHYC93K4L._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg"
    ],
    specs: {
      "Processor": "Apple M3 Max chip",
      "Display": "16-inch Liquid Retina XDR",
      "RAM": "36GB Unified Memory",
      "Storage": "1TB SSD",
      "Graphics": "40-core GPU",
      "Battery": "Up to 22 hours"
    },
    rating: 4.9,
    reviews: 2300,
    inStock: true
  },
  {
    id: 2002,
    name: "Apple MacBook Air 15-inch M3",
    description: "Large screen MacBook Air with M3 chip",
    price: 134900,
    originalPrice: 149900,
    category: "laptop",
    brand: "Apple",
    image: "https://m.media-amazon.com/images/I/71ItMeEkN0L._SX679_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71ItMeEkN0L._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71f5Eu5lJSL._SX679_.jpg"
    ],
    specs: {
      "Processor": "Apple M3 8-core CPU",
      "Display": "15.3-inch Liquid Retina",
      "RAM": "8GB Unified Memory",
      "Storage": "256GB SSD",
      "Graphics": "10-core GPU",
      "Battery": "Up to 18 hours"
    },
    rating: 4.8,
    reviews: 4500,
    inStock: true
  },
  {
    id: 2003,
    name: "Apple MacBook Air 13-inch M2",
    description: "Ultra-thin and light with M2 chip",
    price: 99900,
    originalPrice: 109900,
    category: "laptop",
    brand: "Apple",
    image: "https://m.media-amazon.com/images/I/71f5Eu5lJSL._SX679_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71f5Eu5lJSL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/719C6bJv8jL._SX679_.jpg"
    ],
    specs: {
      "Processor": "Apple M2",
      "Display": "13.6-inch Liquid Retina",
      "RAM": "8GB Unified Memory",
      "Storage": "256GB SSD",
      "Graphics": "10-core GPU",
      "Battery": "Up to 18 hours"
    },
    rating: 4.8,
    reviews: 9200,
    inStock: true
  },
  {
    id: 2004,
    name: "Apple MacBook Pro 14-inch M3 Pro",
    description: "Pro performance in a compact 14-inch design",
    price: 199900,
    originalPrice: 209900,
    category: "laptop",
    brand: "Apple",
    image: "https://m.media-amazon.com/images/I/61RJn0ofUsL._SX679_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61RJn0ofUsL._SX679_.jpg"
    ],
    specs: {
      "Processor": "Apple M3 Pro",
      "Display": "14.2-inch Liquid Retina XDR",
      "RAM": "18GB Unified Memory",
      "Storage": "512GB SSD",
      "Graphics": "14-core GPU",
      "Battery": "Up to 18 hours"
    },
    rating: 4.9,
    reviews: 1800,
    inStock: true
  },
  {
    id: 2005,
    name: "Apple MacBook Air 13-inch M1",
    description: "Most affordable MacBook with revolutionary M1 chip",
    price: 84900,
    originalPrice: 99900,
    category: "laptop",
    brand: "Apple",
    image: "https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg"
    ],
    specs: {
      "Processor": "Apple M1 8-core CPU",
      "Display": "13.3-inch Retina",
      "RAM": "8GB Unified Memory",
      "Storage": "256GB SSD",
      "Graphics": "7-core GPU",
      "Battery": "Up to 18 hours"
    },
    rating: 4.8,
    reviews: 15600,
    inStock: true
  },

  // Dell Laptops
  {
    id: 2010,
    name: "Dell XPS 15 (2024)",
    description: "Premium ultrabook for professionals with Intel Core Ultra",
    price: 159999,
    originalPrice: 179999,
    category: "laptop",
    brand: "Dell",
    image: "https://m.media-amazon.com/images/I/418CdEMIMOL._SY300_SX300_QL70_FMwebp_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61-11YdGI1L._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71Ox-K6GNlL._SX679_.jpg"
    ],
    specs: {
      "Processor": "Intel Core Ultra 7",
      "Display": "15.6-inch 3.5K OLED",
      "RAM": "16GB",
      "Storage": "512GB SSD",
      "Graphics": "NVIDIA RTX 4050"
    },
    rating: 4.6,
    reviews: 3400,
    inStock: true
  },
  {
    id: 2011,
    name: "Dell Inspiron 15",
    description: "Everyday laptop with modern performance",
    price: 54999,
    originalPrice: 64999,
    category: "laptop",
    brand: "Dell",
    image: "https://m.media-amazon.com/images/I/410Rx3PCiDL._SY300_SX300_QL70_FMwebp_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61Y0CLTMHJL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71aoRSwi+nL._SX679_.jpg"
    ],
    specs: {
      "Processor": "Intel Core i5",
      "Display": "15.6-inch FHD",
      "RAM": "8GB",
      "Storage": "512GB SSD",
      "Graphics": "Intel Iris Xe"
    },
    rating: 4.3,
    reviews: 8900,
    inStock: true
  },
  {
    id: 2012,
    name: "Dell G15 Gaming Laptop",
    description: "Gaming laptop with RTX 4060",
    price: 94999,
    originalPrice: 109999,
    category: "laptop",
    brand: "Dell",
    image: "https://m.media-amazon.com/images/I/418CdEMIMOL._SY300_SX300_QL70_FMwebp_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61KeOY7g4TL._SX679_.jpg"
    ],
    specs: {
      "Processor": "Intel Core i7-12700H",
      "Display": "15.6-inch FHD 165Hz",
      "RAM": "16GB DDR5",
      "Storage": "1TB SSD",
      "Graphics": "NVIDIA RTX 4060 8GB"
    },
    rating: 4.4,
    reviews: 2890,
    inStock: true
  },

  // HP Laptops
  {
    id: 2020,
    name: "HP Pavilion 14",
    description: "Slim everyday laptop with modern performance",
    price: 62999,
    originalPrice: 69999,
    category: "laptop",
    brand: "HP",
    image: "https://m.media-amazon.com/images/I/41Y2Lk5MECL._SY300_SX300_QL70_FMwebp_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71SLlNhCfaL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71NBQ3kYxuL._SX679_.jpg"
    ],
    specs: {
      "Processor": "Intel Core i5 1335U",
      "Display": "14-inch FHD",
      "RAM": "16GB",
      "Storage": "512GB SSD",
      "Graphics": "Intel Iris Xe"
    },
    rating: 4.2,
    reviews: 5600,
    inStock: true
  },
  {
    id: 2021,
    name: "HP OMEN 16 (2024)",
    description: "Gaming laptop with RTX 4060",
    price: 129999,
    originalPrice: 139999,
    category: "laptop",
    brand: "HP",
    image: "https://m.media-amazon.com/images/I/71UmfFG5RAL._SX679_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71Bq7Q4Y8uL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71vPKQNKI6L._SX679_.jpg"
    ],
    specs: {
      "Processor": "Intel Core i7 13700HX",
      "Display": "16.1-inch QHD 165Hz",
      "RAM": "16GB",
      "Storage": "1TB SSD",
      "Graphics": "NVIDIA GeForce RTX 4060 8GB"
    },
    rating: 4.5,
    reviews: 2400,
    inStock: true
  },
  {
    id: 2022,
    name: "HP Laptop 15s",
    description: "Everyday laptop with Intel Core i3",
    price: 42999,
    originalPrice: 47999,
    category: "laptop",
    brand: "HP",
    image: "https://m.media-amazon.com/images/I/41OwKBka2LL._SY300_SX300_QL70_FMwebp_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71czGb00k5L._SX679_.jpg"
    ],
    specs: {
      "Processor": "Intel Core i3-1215U",
      "Display": "15.6-inch FHD",
      "RAM": "8GB DDR4",
      "Storage": "512GB SSD",
      "Graphics": "Intel UHD"
    },
    rating: 4.1,
    reviews: 7800,
    inStock: true
  },

  // Lenovo Laptops
  {
    id: 2030,
    name: "Lenovo IdeaPad Slim 3",
    description: "Affordable everyday laptop",
    price: 42999,
    originalPrice: 49999,
    category: "laptop",
    brand: "Lenovo",
    image: "https://m.media-amazon.com/images/I/41qiA0WHZfL._SY300_SX300_QL70_FMwebp_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61aaJMjiKTL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71DGOVfh9QL._SX679_.jpg"
    ],
    specs: {
      "Processor": "Intel Core i5",
      "Display": "15.6-inch FHD",
      "RAM": "8GB",
      "Storage": "512GB SSD",
      "Graphics": "Intel Iris Xe"
    },
    rating: 4.1,
    reviews: 7800,
    inStock: true
  },
  {
    id: 2031,
    name: "Lenovo Legion 5 Pro (2024)",
    description: "High-end gaming laptop with RTX 4070",
    price: 169999,
    originalPrice: 189999,
    category: "laptop",
    brand: "Lenovo",
    image: "https://m.media-amazon.com/images/I/41p2UJQWaOL._SX300_SY300_QL70_FMwebp_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61nBH1LGzBL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71kLEDdUOqL._SX679_.jpg"
    ],
    specs: {
      "Processor": "AMD Ryzen 7 7840HS",
      "Display": "16-inch 2560x1600 165Hz",
      "RAM": "16GB DDR5",
      "Storage": "1TB SSD",
      "Graphics": "NVIDIA GeForce RTX 4070 8GB"
    },
    rating: 4.6,
    reviews: 2100,
    inStock: true
  },
  {
    id: 2032,
    name: "Lenovo ThinkPad E14",
    description: "Business laptop with robust build",
    price: 65999,
    originalPrice: 74999,
    category: "laptop",
    brand: "Lenovo",
    image: "https://m.media-amazon.com/images/I/41vnzmujOdL._SY300_SX300_QL70_FMwebp_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61sNIc73kjL._SX679_.jpg"
    ],
    specs: {
      "Processor": "Intel Core i5 13th Gen",
      "Display": "14-inch FHD",
      "RAM": "16GB",
      "Storage": "512GB SSD",
      "Graphics": "Intel Iris Xe"
    },
    rating: 4.3,
    reviews: 4200,
    inStock: true
  },

  // ASUS Laptops
  {
      id: 2040,
    name: "ASUS Vivobook 15",
    description: "Everyday laptop with good performance",
    price: 49999,
    originalPrice: 59999,
    category: "laptop",
    brand: "Asus",
    image: "https://m.media-amazon.com/images/I/41rbUjmLVQL._SY300_SX300_QL70_FMwebp_.jpg",
    images: [
      "https://dlcdnwebimgs.asus.com/gain/0e0433ac-5507-477b-ba42-c81f5972b473/w800",
      "https://dlcdnwebimgs.asus.com/gain/d89f91f9-f6fe-4cf9-ba96-e8a4c2e4e58f/w800"
    ],
    specs: {
      "Processor": "Intel Core i5",
      "Display": "15.6-inch FHD",
      "RAM": "8GB",
      "Storage": "512GB SSD",
      "Graphics": "Intel Iris Xe"
    },
    rating: 4.2,
    reviews: 6700,
    inStock: true
  },
  {
    id: 2041,
    name: "ASUS ROG Strix G16",
    description: "High-performance gaming laptop with RTX 4070",
    price: 149999,
    originalPrice: 169999,
    category: "laptop",
    brand: "Asus",
    image: "https://m.media-amazon.com/images/I/71JXPovK6aL._SX679_.jpg",
    images: [
      
    ],
    specs: {
      "Processor": "Intel Core i9-13980HX",
      "Display": "16-inch QHD 240Hz",
      "RAM": "16GB DDR5",
      "Storage": "1TB SSD",
      "Graphics": "NVIDIA GeForce RTX 4070 8GB"
    },
    rating: 4.4,
    reviews: 5600,
    inStock: true
  },
  {
    id: 2042,
    name: "ASUS TUF Gaming A15",
    description: "Durable gaming laptop with RTX 4060",
    price: 109999,
    originalPrice: 119999,
    category: "laptop",
    brand: "Asus",
    image: "https://m.media-amazon.com/images/I/41Qo2ArvgwL._SY300_SX300_QL70_FMwebp_.jpg",
    images: [
      "https://dlcdnwebimgs.asus.com/gain/97074a09-cf79-449a-ba24-de8e951dbfc0/w800",
      "https://dlcdnwebimgs.asus.com/gain/ba907f8e-eb42-4d9f-9a1c-7091e16bbbaa/w800"
    ],
    specs: {
      "Processor": "AMD Ryzen 7 7840HS",
      "Display": "15.6-inch FHD 144Hz",
      "RAM": "16GB DDR5",
      "Storage": "1TB SSD",
      "Graphics": "NVIDIA GeForce RTX 4060 8GB"
    },
    rating: 4.4,
    reviews: 3700,
    inStock: true
  },

  // Acer Laptops
  {
    id: 2050,
  name: "Acer Aspire 5",
  description: "Budget-friendly laptop for everyday use",
  price: 44999,
  originalPrice: 52999,
  category: "laptop",
  brand: "Acer",
  image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop",
  images: [
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop"
  ],
  specs: {
    "Processor": "Intel Core i5",
    "Display": "15.6-inch FHD",
    "RAM": "8GB",
    "Storage": "512GB SSD",
    "Graphics": "Intel Iris Xe"
  },
  rating: 4.0,
  reviews: 9800,
  inStock: true
},
{
  id: 2051,
  name: "Acer Nitro 5",
  description: "Value gaming laptop with RTX 4050",
  price: 89999,
  originalPrice: 99999,
  category: "laptop",
  brand: "Acer",
  image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop",
  images: [
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=600&fit=crop"
  ],
  specs: {
    "Processor": "AMD Ryzen 7 7735HS",
    "Display": "15.6-inch FHD 144Hz",
    "RAM": "16GB",
    "Storage": "512GB SSD",
    "Graphics": "NVIDIA GeForce RTX 4050 6GB"
  },
  rating: 4.3,
  reviews: 3600,
  inStock: true
  },

  // ===============================
  // TABLETS
  // ===============================
  
{
  id: 3001,
  name: "Apple iPad Pro 12.9-inch (M2)",
  description: "Professional tablet with M2 chip and Liquid Retina XDR display",
  price: 112900,
  originalPrice: 122900,
  category: "tablet",
  brand: "Apple",
  image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
  images: [
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop"
  ],
  specs: {
    "Processor": "Apple M2",
    "Display": "12.9-inch Liquid Retina XDR",
    "Storage": "128GB",
    "Camera": "12MP + 10MP",
    "Battery": "Up to 10 hours"
  },
  rating: 4.8,
  reviews: 3400,
  inStock: true
},
{
  id: 3002,
  name: "Samsung Galaxy Tab S9 Ultra",
  description: "Large Android tablet with S Pen included",
  price: 104999,
  originalPrice: 114999,
  category: "tablet",
  brand: "Samsung",
  image: "https://images.unsplash.com/photo-1585789575762-9873d55fbb1b?w=600&h=600&fit=crop",
  images: [
    "https://images.unsplash.com/photo-1585789575762-9873d55fbb1b?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=600&h=600&fit=crop"
  ],
  specs: {
    "Processor": "Snapdragon 8 Gen 2",
    "Display": "14.6-inch Dynamic AMOLED 2X",
    "RAM": "12GB",
    "Storage": "256GB",
    "S Pen": "Included"
  },
  rating: 4.6,
  reviews: 2100,
  inStock: true
},
  {
    id: 3003,
    name: "Apple iPad Air (5th Gen)",
    description: "Powerful and versatile iPad with M1 chip",
    price: 59900,
    originalPrice: 64900,
    category: "tablet",
    brand: "Apple",
    image: "https://m.media-amazon.com/images/I/61NGnpjoRDL._SX679_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61NGnpjoRDL._SX679_.jpg"
    ],
    specs: {
      "Processor": "Apple M1",
      "Display": "10.9-inch Liquid Retina",
      "Storage": "64GB",
      "Camera": "12MP"
    },
    rating: 4.7,
    reviews: 5600,
    inStock: true
  },

  // ===============================
  // FASHION - MEN'S CLOTHING
  // ===============================
  
  
  {
      id: 4001,
    name: "Levi's 511 Slim Fit Jeans",
    description: "Classic slim fit jeans in dark wash",
    price: 3999,
    originalPrice: 4999,
    category: "mens-clothing",
    brand: "Levi's",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop"
    ],
    rating: 4.3,
    reviews: 12400,
    inStock: true
  },
  {
    id: 4003,
    name: "Allen Solly Casual Shirt",
    description: "Cotton casual shirt perfect for office and casual wear",
    price: 1899,
    originalPrice: 2499,
    category: "mens-clothing",
    brand: "Allen Solly",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop"
    ],
    rating: 4.2,
    reviews: 5600,
    inStock: true
  },

  // ===============================
  // FASHION - WOMEN'S CLOTHING
  // ===============================
  
  {
     id: 4101,
    name: "Zara Floral Print Dress",
    description: "Elegant floral print midi dress for special occasions",
    price: 2999,
    originalPrice: 3999,
    category: "womens-clothing",
    brand: "Zara",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop"
    ],
    rating: 4.5,
    reviews: 3400,
    inStock: true
  },
  {
     id: 4102,
    name: "Adidas Ultraboost 22 Women",
    description: "Premium running shoes with Boost technology",
    price: 16999,
    originalPrice: 18999,
    category: "womens-shoes",
    brand: "Adidas",
    image: "https://images.unsplash.com/photo-1584735175097-719d848f8449?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1584735175097-719d848f8449?w=500&h=600&fit=crop"
    ],
    rating: 4.6,
    reviews: 6700,
    inStock: true
  },

  // ===============================
  // HOME & KITCHEN
  // ===============================
  
  {
     id: 5001,
    name: "LG 8 Kg Front Load Washing Machine",
    description: "Energy efficient washing machine with AI Direct Drive",
    price: 42999,
    originalPrice: 49999,
    category: "home-appliances",
    brand: "LG",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&h=600&fit=crop"
    ],
    rating: 4.3,
    reviews: 4500,
    inStock: true
  },
  {
     id: 5002,
    name: "Samsung 653L Side by Side Refrigerator",
    description: "Large capacity refrigerator with digital inverter technology",
    price: 89999,
    originalPrice: 99999,
    category: "home-appliances",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500&h=600&fit=crop"
    ],
    rating: 4.4,
    reviews: 2800,
    inStock: true
  },

  // ===============================
  // BOOKS & MEDIA
  // ===============================
  
  {
     id: 6001,
    name: "Atomic Habits by James Clear",
    description: "Bestselling book on building good habits and breaking bad ones",
    price: 399,
    originalPrice: 599,
    category: "books",
    brand: "Penguin Random House",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=600&fit=crop"
    ],
    rating: 4.8,
    reviews: 45000,
    inStock: true
  },

  // ===============================
  // BEAUTY & PERSONAL CARE
  // ===============================
  
  {
    id: 7001,
    name: "Lakme Absolute Matte Lipstick",
    description: "Long-lasting matte lipstick in rich shades",
    price: 649,
    originalPrice: 799,
    category: "beauty",
    brand: "Lakme",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=600&fit=crop"
    ],
    rating: 4.2,
    reviews: 12400,
    inStock: true
  },

  // ===============================
  // SPORTS & FITNESS
  // ===============================
  
  {
    id: 8001,
    name: "Decathlon Domyos Treadmill",
    description: "Home treadmill for cardio workouts",
    price: 39999,
    originalPrice: 44999,
    category: "sports",
    brand: "Decathlon",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500&h=600&fit=crop"
    ],
    rating: 4.1,
    reviews: 2100,
    inStock: true
  },

  // ===============================
  // AUTOMOTIVE
  // ===============================
  
  {
     id: 9001,
    name: "Michelin Car Tyre Set (4 pieces)",
    description: "Premium car tyres for enhanced performance and safety",
    price: 24999,
    originalPrice: 28999,
    category: "automotive",
    brand: "Michelin",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=500&h=600&fit=crop"
    ],
    rating: 4.5,
    reviews: 1800,
    inStock: true
  }
];