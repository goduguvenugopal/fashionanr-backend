const mongoose = require("mongoose");

const orderShema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderShema);

module.exports = Order;
