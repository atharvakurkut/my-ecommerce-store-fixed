# Deployment Instructions

## GitHub Pages Deployment

### 1. Create GitHub Repository
1. Go to https://github.com/atharvakurkut
2. Click "New repository"
3. Name: `my-ecommerce-store-fixed`
4. Description: `Full-stack e-commerce application with MERN stack`
5. Make it Public
6. Click "Create repository"

### 2. Push Code to GitHub
```bash
git push origin main
```

### 3. Enable GitHub Pages
1. Go to repository settings
2. Scroll to "Pages" section
3. Source: Deploy from a branch
4. Branch: main
5. Folder: /root
6. Click "Save"

### 4. Deploy Build Files
```bash
# Copy build files to root
cp -r build/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### 5. Access Your Site
- Frontend: https://atharvakurkut.github.io/my-ecommerce-store-fixed/
- Repository: https://github.com/atharvakurkut/my-ecommerce-store-fixed

## Backend Deployment (Render.com)

### 1. Connect to Render
1. Go to https://render.com
2. Connect your GitHub account
3. Click "New Web Service"
4. Connect your repository

### 2. Configure Service
- Build Command: `cd backend && npm install`
- Start Command: `cd backend && npm start`
- Environment Variables:
  - MONGO_URI: your MongoDB connection string
  - PORT: 5000
  - JWT_SECRET: your secret key

### 3. Deploy
Click "Create Web Service" - it will auto-deploy!

## Complete Deployment URLs

- **Frontend**: https://atharvakurkut.github.io/my-ecommerce-store-fixed/
- **Backend API**: https://your-app-name.onrender.com/api
- **Admin Panel**: https://atharvakurkut.github.io/my-ecommerce-store-fixed/admin

## Troubleshooting

### If GitHub Pages shows 404
1. Make sure you pushed the build files
2. Check GitHub Pages settings
3. Wait 5-10 minutes for propagation

### If Backend CORS errors
1. Update CORS origin in backend/server.js
2. Add your GitHub Pages URL to allowed origins
3. Redeploy backend

### If Admin panel not working
1. Check if backend is running
2. Verify API endpoints are accessible
3. Check browser console for errors
