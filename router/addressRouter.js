const express = require("express");
const router = express.Router();
const addressController = require("../controller/addressController");
 

router.post("/add-address",  addressController.saveAddress);
router.get("/get-address/:userId", addressController.getAddress)

module.exports = router;
