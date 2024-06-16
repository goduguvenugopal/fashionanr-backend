const express = require("express")
const router = express.Router()
const orderController = require("../controller/orderController")

router.post("add-order", orderController.saveOrder)
router.get("get-all-orders/:userId",orderController.getAllOrders)
router.get("get-single-order/:id" , orderController.getSingleOrder)
router.delete("delete-order/:id",orderController.deleteOrder)


module.exports = router