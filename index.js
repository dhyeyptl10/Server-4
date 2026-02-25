const express = require('express');
const cors = require('cors');

const app = express();
// Use process.env.PORT for Render deployment, fallback to 3000 locally
const PORT = process.env.PORT || 3000;

// Middleware (Order is strictly maintained)
app.use(cors());
app.use(express.json());

// In-Memory JSON Array
let products = [
  { id: 1, name: "Wireless Mouse", category: "Electronics", price: 799, stock: 25, rating: 4.3 },
  { id: 2, name: "Running Shoes", category: "Footwear", price: 2499, stock: 40, rating: 4.5 },
  { id: 3, name: "Laptop Stand", category: "Accessories", price: 999, stock: 30, rating: 4.2 },
  { id: 4, name: "Smart Watch", category: "Electronics", price: 4999, stock: 12, rating: 4.4 },
  { id: 5, name: "Backpack", category: "Fashion", price: 1599, stock: 50, rating: 4.1 }
];

// ==========================================
// GET Routes (3 Required)
// ==========================================

// 1. GET all products
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

// 2. GET product by ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json(product);
});

// 3. GET products by category
app.get('/products/category/:categoryName', (req, res) => {
  const category = req.params.categoryName.toLowerCase();
  const filteredProducts = products.filter(p => p.category.toLowerCase() === category);
  
  // Returns empty array if none found, as requested
  res.status(200).json(filteredProducts); 
});

// ==========================================
// POST Route (1 Required)
// ==========================================

// 4. POST a new product
app.post('/products', (req, res) => {
  const { name, category, price, stock, rating } = req.body;
  
  // Auto-generate ID based on the highest existing ID
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  
  const newProduct = { id: newId, name, category, price, stock, rating };
  products.push(newProduct);
  
  res.status(201).json(newProduct);
});

// ==========================================
// PUT Routes (3 Required)
// ==========================================

// 5. PUT replace entire product
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, category, price, stock, rating } = req.body;
  // Replace all fields except the ID
  products[index] = { id, name, category, price, stock, rating };
  
  res.status(200).json(products[index]);
});

// 6. PUT update only stock
app.put('/products/:id/stock', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (req.body.stock !== undefined) {
    products[index].stock = req.body.stock;
  }
  
  res.status(200).json(products[index]);
});

// 7. PUT update only price
app.put('/products/:id/price', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (req.body.price !== undefined) {
    products[index].price = req.body.price;
  }
  
  res.status(200).json(products[index]);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});