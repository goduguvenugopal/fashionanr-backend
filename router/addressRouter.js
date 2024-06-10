const express = require("express");
const router = express.Router();
const addressController = require("../controller/addressController");
const verifyToken = require("../middleware");

router.post("/address", verifyToken, addressController.saveAddress);

module.exports = router