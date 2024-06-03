const express = require("express")
const router = express.Router()
const productController = require("../controller/productController");
const mime = require('mime');
const path = require('path');
const fs = require('fs');

router.post("/uploadproduct" , productController.uploadProduct)
router.get("/getproducts",productController.getProducts)
router.delete("/deleteproduct/:id",productController.deleteProduct)
router.get("/findproduct/:id",productController.findProduct)
router.get("/login",productController.login)

// router defining to get images 
 

router.get("/uploads/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    const filePath = path.join(__dirname, "..", "uploads", imageName);
    const mimeType = mime.getType(filePath);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("File not found");
    }

    res.header("Content-Type", mimeType);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error occurred while sending the file");
        }
    });
});



module.exports = router