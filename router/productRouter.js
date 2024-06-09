const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
 

router.post("/uploadproduct", productController.uploadProduct);
router.get("/getproducts", productController.getProducts);
router.delete("/deleteproduct/:id", productController.deleteProduct);
router.get("/findproduct/:id", productController.findProduct);
router.post("/login", productController.login);

 


module.exports = router;
 