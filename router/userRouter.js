const userController = require("../controller/userController");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware");

// router endpoints for crud methods
router.post("/signup", userController.signUpUser);
router.post("/login", userController.loginUser);
router.get("/getuser", middleware, userController.getUser);
router.put("/updatepassword",userController.updatePassword)
router.delete("/delete/:id" , userController.deleteUser)

module.exports = router;
