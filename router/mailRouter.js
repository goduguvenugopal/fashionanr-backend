const express = require("express");
const router = express.Router();
const sendMail = require("../controller/mailController");

// router defined post method endpoint
router.post("/sendmail", sendMail);

module.exports = router;
