const Product = require("../model/Product");
const Path = require("path");
const multer = require("multer");

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + Path.extname(file.originalname));
  },
});

// Set up multer upload middleware
const upload = multer({ storage: storage });

// post method for uploading product logic code
const uploadProduct = async (req, res) => {
  try {
    const { category, title, price, rating, description, date } = req.body;

    const image = req.file ? req.file.filename : undefined;

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

module.exports = { uploadProduct: [upload.single("image"), uploadProduct] , getProducts };
