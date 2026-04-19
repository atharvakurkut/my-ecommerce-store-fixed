# My E-Commerce Store

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring responsive design, user authentication, product management, and payment integration.

## Features

- **User Authentication**: JWT-based login/registration system
- **Product Management**: Dynamic catalog with search and filtering
- **Shopping Cart**: Persistent cart with local storage fallback
- **Responsive Design**: Mobile-first approach with 4 breakpoints
- **Admin Panel**: Complete product and order management
- **Payment Integration**: Multiple payment methods (Credit Card, UPI, COD)
- **Interactive Features**: Reviews, Q&A, recently viewed products
- **Real-time Updates**: Live inventory and order status

## Technology Stack

### Frontend
- **React 18** with modern hooks
- **Responsive CSS** with media queries
- **Local Storage** for data persistence
- **GitHub Pages** for deployment

### Backend
- **Node.js/Express.js** RESTful API
- **MongoDB** with Mongoose ODM
- **JWT Authentication** for security
- **CORS** configured for cross-origin requests
- **Render.com** for server deployment

### Database
- **MongoDB Atlas** cloud database
- **Mongoose** for data modeling
- **Indexes** for query optimization

## Quick Start

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/atharvakurkut/my-ecommerce-store-fixed.git
   cd my-ecommerce-store-fixed
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # In backend folder, create .env file
   MONGO_URI=mongodb://localhost:27017/ecommerceDB
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend**
   ```bash
   # In root directory
   npm start
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin Panel: http://localhost:3000/admin

## Project Structure

```
my-ecommerce-store-fixed/
  src/
    components/          # React components
    admin/               # Admin panel
    utils/               # Utility functions
    App.js              # Main application
    config.js           # API configuration
  backend/
    models/             # Database models
    routes/             # API routes
    server.js           # Express server
    .env                # Environment variables
  public/               # Static assets
  build/                # Production build
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Add new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status

## Responsive Breakpoints

- **Mobile**: `<= 480px` - Compact layout
- **Tablet**: `<= 768px` - Medium layout  
- **Desktop**: `>= 1025px` - Full layout

## Deployment

### Frontend (GitHub Pages)
```bash
npm run build
# Deploy build folder to GitHub Pages
```

### Backend (Render.com)
```bash
# Connect GitHub repository to Render.com
# Set environment variables
# Auto-deploy on push to main branch
```

## Admin Access

- **URL**: `/admin`
- **Login**: Use admin credentials
- **Features**: Product management, order tracking, revenue analytics

## Environment Variables

```env
# Backend (.env)
MONGO_URI=mongodb://localhost:27017/ecommerceDB
PORT=5000
JWT_SECRET=your_jwt_secret_key_here

# Frontend (src/config.js)
API_BASE_URL=http://localhost:5000/api
```

## Performance Features

- **Code Splitting**: Reduced bundle size
- **Image Optimization**: WebP format with fallbacks
- **Memoization**: Prevents unnecessary re-renders
- **Lazy Loading**: Improved initial load time
- **Service Workers**: Offline capability

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Live Demo

- **Frontend**: https://atharvakurkut.github.io/my-ecommerce-store-fixed/
- **Backend API**: https://my-ecommerce-store-fixed-1.onrender.com/api

## Support

For support, please open an issue in the GitHub repository or contact the developer.

---

**Built with React, Node.js, Express, and MongoDB**(https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
