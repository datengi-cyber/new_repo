

const Product = require("../models/product");
const Purchase = require("../models/purchase");
const Sales = require("../models/sales");

// Add Post
const addProduct = (req, res) => {
  console.log("req: ", req.body.userId);
  const addProduct = new Product({
    userID: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    stock: 0,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category, 
    size: req.body.size, 
    image: req.body.image,
  });

  addProduct
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};



const getChartData = async (req, res) => {
  try {
    const products = await Product.find({ userID: req.params.userId });

    // Initialize an object to store stock quantity for each category
    const categoryStock = {
      Tshirt: 0,
      coat: 0,
      jacket: 0,
      Hoodies: 0,
      pants: 0
    };

    // Calculate total stock quantity for each category
    products.forEach((product) => {
      switch (product.category) {
        case "Tshirt":
          categoryStock.Tshirt += product.stock;
          break;
        case "coat":
          categoryStock.coat += product.stock;
          break;
        case "jacket":
          categoryStock.jacket += product.stock;
          break;
        case "Hoodies":
          categoryStock.Hoodies += product.stock;
          break;
        case "pants":
          categoryStock.pants += product.stock;
          break;
        default:
          break;
      }
    });

    // Send the calculated data as response
    res.status(200).json(categoryStock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};


// Get All Products (without filtering by userID)
const getAllProduct = async (req, res) => {
  try {
    const allProducts = await Product.find().sort({ _id: -1 });
    res.json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};




// Get All Products
const getAllProducts = async (req, res) => {
  const findAllProducts = await Product.find({
    userID: req.params.userId,
  }).sort({ _id: -1 }); 
  res.json(findAllProducts);
};

// Get Products for Men
const getMenProducts = async (req, res) => {
  try {
    const products = await Product.find({ category: 'men' });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get Products for Women
const getWomenProducts = async (req, res) => {
  try {
    const products = await Product.find({ category: 'women' });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get Products by Name
const getProductsByName = async (req, res) => {
  const { names } = req.body; // Extract names array from request body
  
  try {
    const products = await Product.find({ name: { $in: names } });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get Products for Kids
const getKidsProducts = async (req, res) => {
  try {
    const products = await Product.find({ category: 'kids' });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete Selected Product
const deleteSelectedProduct = async (req, res) => {
  const deleteProduct = await Product.deleteOne(
    { _id: req.params.id }
  );
  const deletePurchaseProduct = await Purchase.deleteOne(
    { ProductID: req.params.id }
  );

  const deleteSaleProduct = await Sales.deleteOne(
    { ProductID: req.params.id }
  );
  res.json({ deleteProduct, deletePurchaseProduct, deleteSaleProduct });
};

// Update Selected Product
const updateSelectedProduct = async (req, res) => {
  try {
    const updatedResult = await Product.findByIdAndUpdate(
      { _id: req.body.productID },
      {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        stock: req.body.stock,
        category: req.body.category, 
        size: req.body.size, 
        price:req.body.price,
      },
      { new: true }
    );
    console.log(updatedResult);
    res.json(updatedResult);
  } catch (error) {
    console.log(error);
    res.status(402).send("Error");
  }
};

// Search Products
const searchProduct = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const products = await Product.find({
    name: { $regex: searchTerm, $options: "i" },
  });
  res.json(products);
};

module.exports = {
  addProduct,
  getAllProducts,
  deleteSelectedProduct,
  updateSelectedProduct,
  searchProduct,
  getMenProducts,
  getWomenProducts,
  getKidsProducts,
  getProductsByName,
  getChartData,
  getAllProduct
};
