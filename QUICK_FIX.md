# QUICK CORS FIX FOR BACKEND

## Option 1: Update your backend server.js CORS settings:

```javascript
app.use(cors({
  origin: ['https://atharvakurkut.github.io', 'https://atharvakurkut.github.io/my-ecommerce-store-fixed'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Option 2: Temporary fix - Allow all origins (for testing only):

```javascript
app.use(cors({
  origin: '*',
  credentials: true
}));
```

## Option 3: Deploy the updated backend:

1. Push the updated server.js to your GitHub repository
2. Render.com will automatically redeploy
3. Wait 2-3 minutes for deployment to complete

## Test the fix:
1. Visit: https://my-ecommerce-store-fixed-1.onrender.com/api/products
2. Should show products without CORS errors
3. Then test your frontend: https://atharvakurkut.github.io/my-ecommerce-store-fixed/
