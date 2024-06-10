const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  code: {
    type: Number,
  },
  address: {
    type: String,
  },
  user:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  
});

const Address = mongoose.model("Address" , addressSchema)

module.exports = Address