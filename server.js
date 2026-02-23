const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// In-memory product data
let products = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: {
      rate: 3.9,
      count: 120
    }
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
    rating: {
      rate: 4.1,
      count: 259
    }
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
    rating: {
      rate: 4.7,
      count: 500
    }
  }
];


// =============================
// ROUTES
// =============================

// 1) GET /all → Fetch all products
app.get("/all", (req, res) => {
  res.status(200).json(products);
});


// 2) GET /product/:id → Fetch single product by id
app.get("/product/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});


// 3) POST /product/:id → Add new product
app.post("/product/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const newProduct = {
    id: id,
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    rating: req.body.rating
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product added successfully",
    product: newProduct
  });
});


// 4) GET /category/:type → Fetch products by category
app.get("/category/:type", (req, res) => {
  const type = req.params.type.toLowerCase();

  const filteredProducts = products.filter(
    p => p.category.toLowerCase() === type
  );

  res.status(200).json(filteredProducts);
});


// Server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});