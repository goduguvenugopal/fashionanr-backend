const express = require("express")
const router = express.Router()
const productController = require("../controller/productController");


router.post("/uploadproduct" , productController.uploadProduct)
router.get("/getproducts",productController.getProducts)

// router defining to get images 
router.get("/uploads/:imageName",(req, res)=>{
    const imageName = req.params.imageName;
    res.headersSent("Content-Type","image/jpeg");
    res.sendFile(path.join(__dirname, "..", "uploads", imageName))
})


module.exports = router