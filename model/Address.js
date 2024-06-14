const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  email: {
    type: String,
  },
  code: {
    type: Number,
  },
  address: {
    type: String,
  },
  userId:  {
      type: String
      
    }
  
});

const Address = mongoose.model("Address" , addressSchema)

module.exports = Address