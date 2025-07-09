const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB is connected Successfully");
  } catch (error) {
    console.error("Error occured while connecting to the mongoDB", err);
  }
};

module.exports = connectDb;
