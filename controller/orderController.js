const Order = require("../model/Order");

// save order
const saveOrder = async (req, res) => {
  try {
    const { category, title, price, rating, description, userId, image } =
      req.body;

    const orders = new Order({
      category,
      title,
      price,
      rating,
      description,
      userId,
      image,
    });

    await orders.save();
    res.status(200).json({ message: "order has been saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

// get All orders

const getAllOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const allOrders = await Order.find({ userId });
    res.status(200).json(allOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server  error" });
  }
};

// delete order by id

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;

    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: "Order Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

// find single order by id

const getSingleOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const singleOrder = await Order.findById(id);
    res.status(200).json(singleOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};


// exporting all modules 

module.exports = { saveOrder, getAllOrders, deleteOrder, getSingleOrder };
