const Product = require("../model/Product");
const path = require("path");
const multer = require("multer");
const dotEnv = require("dotenv");
const fs = require("fs");



dotEnv.config();

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });


// post method for uploading product logic code
const uploadProduct = async (req, res) => {
  try {
    const { category, title, price, rating, description, date } = req.body;

    const image = req.file.path;

    const products = new Product({
      category,
      title,
      price,
      rating,
      description,
      image,
      date,
    });

    await products.save();
    res
      .status(200)
      .json({ message: "products uploaded successfully", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

// get products logic function

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res.status(404).json({ message: "products not found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: " internal server error" });
  }
};

// find single product by id logic code
const findProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const singleProduct = await Product.findById(id);
    res.status(200).json({ message: "product find successfully", data : singleProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

 // Delete product by ID logic
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the image file from the server
    if (product.image) {
      const filePath = path.join(__dirname, "..", "uploads", product.image);
      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// login function

const login = async (req, res) => {
  try {
    const password = process.env.LOGIN;
    res.status(200).json(password);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  uploadProduct: [upload.single("image"), uploadProduct],
  getProducts,
  deleteProduct,
  findProduct,
  login
};
