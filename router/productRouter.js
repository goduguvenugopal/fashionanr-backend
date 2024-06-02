const express = require("express")
const router = express.Router()
const productController = require("../controller/productController");


router.post("/uploadproduct" , productController.uploadProduct)
router.get("/getproducts",productController.getProducts)
router.delete("/deleteproduct/:id",productController.deleteProduct)
router.get("/findproduct/:id",productController.findProduct)
router.get("/login",productController.login)

// router defining to get images 
router.get("/uploads/:imageName",(req, res)=>{
    const imageName = req.params.imageName;
    res.header("Content-Type","image/jpeg");
    res.sendFile(path.join(__dirname, "..", "uploads", imageName))
})


module.exports = router