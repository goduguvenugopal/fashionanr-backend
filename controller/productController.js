const Product = require("../model/Product");
const dotEnv = require("dotenv");

dotEnv.config();

// post method for uploading product logic code
const uploadProduct = async (req, res) => {
  try {
    const { category, title, price, rating, description, date, image } =
      req.body;

    const products = new Product({
      category,
      title,
      price,
      rating,
      description,
      date,
      image,
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
    res
      .status(200)
      .json({ message: "product find successfully", data: singleProduct });
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

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// login function

const login = async (req, res) => {
  try {
    const { password } = req.body;
    const pass = process.env.LOGIN;

    if (password === pass) {
      res.status(200).json({ message: "login successfully" });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  uploadProduct,
  getProducts,
  deleteProduct,
  findProduct,
  login,
};
