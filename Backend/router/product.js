const express = require("express");
const app = express();
const product = require("../controller/product");

// Add Product
app.post("/add", product.addProduct);

// Get All Products
app.get("/get/:userId", product.getAllProducts);

//without suerid 
//http://localhost:4000/api/product/get
app.get("/get", product.getAllProduct);


// Delete Selected Product Item
app.get("/delete/:id", product.deleteSelectedProduct);

// Update Selected Product
app.post("/update", product.updateSelectedProduct);

// Search Product
app.get("/search", product.searchProduct);

// Get Products for Men
app.get('/men', product.getMenProducts);

// Get Products for Women
app.get('/women', product.getWomenProducts);

// Get Products for Kids
app.get('/kids', product.getKidsProducts);

app.post('/byName', product.getProductsByName);

app.get('/chartData/:userId', product.getChartData);







// http://localhost:4000/api/product/search?searchTerm=fa

module.exports = app;